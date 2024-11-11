from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from functools import wraps
import jwt
from dataclasses import asdict
from database.db_manager import DatabaseManager, serialize_document
from database.db_user import UserRepository
from database.db_restaurant import RestaurantRepository
from database.cloudinary_image import CloudinaryManager
from models.mongo_restaurant import create_restaurant_data_from_json, create_category_data_from_json, create_food_data_from_json, create_filtered_restaurant_from_json
from models.mongo_user import create_diner_data_from_json, create_owner_data_from_json, create_user_auth_from_json
from misc.signup_data import create_signup_data_from_json
from misc.const import ResponseKey, UserType
from misc.token import generate_token, decode_token

# MongoDB connection
MY_URI = "mongodb+srv://dolongduy:vegan1234@test.ussqay0.mongodb.net/?retryWrites=true&w=majority&appName=Test"
DB_NAME = "vegan"
DB_MANAGER = DatabaseManager(MY_URI, DB_NAME)

# Cloudinary manager
CLOUDINARY_NAME = 'dzxlzh6hh'
CLOUDINARY_KEY = '451518431196965'
CLOUDINARY_SECRET = 'PDYOYg1BaYJrPY616mK6zlh9lA4'
CLOUDINARY_USER_FOLDER = 'Users'
CLOUDINARY_MANAGER = CloudinaryManager(CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET)

# app instance
app = Flask(__name__)
CORS(app)

# improtant constance
TEST_KEY = 'vegan-review-test-key'
USER_REPO = UserRepository(DB_MANAGER)
RESTAURANT_REPO = RestaurantRepository(DB_MANAGER)

# OpenAPI UI configuration
OPENAPI_DOC = '/openapi_doc'  # URL for accessing the Swagger UI
API_FILES = {
    "users": '/doc_api/user_api.yaml',
    "restaurant": '/doc_api/restaurant_api.yaml',
}

# Default to one API file (you can change this as needed)
swagger_ui_blueprint = get_swaggerui_blueprint(
    OPENAPI_DOC,
    API_FILES["users"],  # Default to users API
    config={
        'app_name': 'Vegan App OpenAPI docs'
    }
)

app.register_blueprint(swagger_ui_blueprint, url_prefix=OPENAPI_DOC)

"""
Helper function that need jsonify or wrapper functions
"""
def api_response_message(key: str, message: str, status: int = 201) -> tuple[object, int]:
    return jsonify({key: message}), status

def api_response_data(message_key: str, message_result: str, sent_key: str, sent_data: str, status: int = 200) -> tuple[object, int]:
    return jsonify({message_key: message_result, sent_key: sent_data}), status

def require_jwt_token(func):
    """
    Decorator to require a valid JWT token for the decorated route.
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization', None)
        if not token:
            return api_response_message(ResponseKey.Error, 'No token provided', 401)

        try:
            data = decode_token(TEST_KEY, token)
            # The user ID is stored in the 'sub' claim of the JWT token
            user_id = data['sub']
        except jwt.ExpiredSignatureError:
            return api_response_message(ResponseKey.Error, 'Token has expired', 401)
        except jwt.InvalidTokenError:
            return api_response_message(ResponseKey.Error, 'Invalid token', 401)

        # Pass the user ID to the decorated function
        return func(user_id, *args, **kwargs)
    return wrapper

def require_user_is_owner(func):
    """
    Decorator to check if the user exists in the owner document.
    """
    @wraps(func)
    def wrapper(user_id, *args, **kwargs):
        # Check if the user exists as an owner
        if not USER_REPO.check_if_user_exist_from_id(user_id, UserType.Owner):
            return api_response_message(ResponseKey.Error, 'User cannot create restaurant', 401)

        # If the check passes, call the decorated function
        return func(user_id, *args, **kwargs)
    return wrapper

@app.route('/doc_api/<path:filename>', methods=['GET'])
def serve_api_files(filename):
    return send_from_directory('doc_api', filename)
"""
API functions for users
"""
# Signup for user
@app.route('/api/user/signup', methods=['POST'])
def signup():
    json_data = request.get_json()
    signup_data = create_signup_data_from_json(json_data)
    user_type = json_data.get('userType')  # Get user type from the request
    
    user_id = USER_REPO.create_user(signup_data)
    
    if user_id:
        
        if user_type == UserType.Owner:
            restaurant_id = RESTAURANT_REPO.create_restaurant_template(user_id)
            USER_REPO.update_owner_restaurant_id(user_id, restaurant_id)
        
        return api_response_message(ResponseKey.UserID, user_id, 201)
    else:
        return api_response_message(ResponseKey.Error, 'Invalid input', 400)

# Get user id to create a token
@app.route('/api/user/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user_type = data.get('userType')

    # Authenticate the user using MongoDB
    user_id = USER_REPO.get_user_id_from_login(username, password, user_type)
    if user_id:
        token = generate_token(TEST_KEY, user_id)
        return api_response_message(ResponseKey.Token, token, 201)
    else:
        return api_response_message(ResponseKey.Error, 'Invalid username or password', 401)

@app.route('/api/user/get_user', methods=['GET'])
@require_jwt_token
def get_user(user_id):
    """
    A protected API endpoint that requires a valid JWT token.
    """
    # Fetch the user's data from MongoDB using the user_id
    user = USER_REPO.get_user_data_from_id(user_id)
    if user:
        return api_response_data(ResponseKey.Message, 'Login successful', 
                                 ResponseKey.KeyUser, asdict(user), 200)
    else:
        return api_response_message(ResponseKey.Error, 'Invalid credentials', 401)
    
# Return user info after fetching their id
@app.route('/api/user/get_auth', methods=['GET'])
@require_jwt_token
def get_authentication(user_id):
    """
    Get authentication, should only be use when changing it
    """
    # Fetch the user's data from MongoDB using the user_id
    auth = USER_REPO.get_user_auth_from_id(user_id)
    if auth:
        return api_response_data(ResponseKey.Message, 'Get authentication sucessfully', 
                                 ResponseKey.KeyAuth, asdict(auth), 200)
    else:
        return api_response_message(ResponseKey.Error, 'Invalid credentials', 401)
    
# Update user info after fetching their id    
@app.route('/api/user/update_user', methods=['PATCH'])
@require_jwt_token  # Ensure the user is authenticated
def update_user_data(user_id):
    """
    Update user data (e.g., name, email).
    """
    data = request.get_json()
    user_type = data.get('userType')  # Get user type from the request

    if user_type not in [UserType.Diner, UserType.Owner]:
        return api_response_message(ResponseKey.Error, 'Invalid user types', 401)

    # Create data objects based on your model (adjust as necessary)
    if user_type == UserType.Diner:
        diner_data = create_diner_data_from_json(data)
        success = USER_REPO.update_diner_data(user_id, diner_data)  # Update diner data
    else:  # owner
        owner_data = create_owner_data_from_json(data)  # Assuming OwnerData is a valid model
        success = USER_REPO.update_owner_data(user_id, owner_data)  # Update owner data

    if success:
        return api_response_message(ResponseKey.Message, 'User data updated successfully', 200)
    else:
        return api_response_message(ResponseKey.Error, 'Update Failed', 401)

# Update user authentication after fetching their id    
@app.route('/api/user/update_auth', methods=['PATCH'])
@require_jwt_token  # Ensure the user is authenticated
def update_user_auth(user_id):
    """
    Update user authentications (e.g., username, password).
    """
    data = request.get_json()
    user_type = data.get('userType')  # Get user type from the request

    if user_type not in [UserType.Diner, UserType.Owner]:
        return api_response_message(ResponseKey.Error, 'Invalid user types', 401)

    auth_data = create_user_auth_from_json(data, user_id)
    
    # Create data objects based on your model (adjust as necessary)
    if user_type == UserType.Diner:
        success = USER_REPO.update_diner_auth(user_id, auth_data)  # Update diner data
    else:  # owner
        success = USER_REPO.update_owner_auth(user_id, auth_data)  # Update owner data

    if success:
        return api_response_message(ResponseKey.Message, 'User data updated successfully', 200)
    else:
        return api_response_message(ResponseKey.Error, 'Update Failed', 401)
    
# Get all users
@app.route('/api/user/get_users', methods=['GET'])
def get_users():
    users = USER_REPO.get_all_users()
    return jsonify(users), 200

    
"""
API functions for restaurant
"""   
@app.route('/api/restaurant', methods=['POST'])
@require_jwt_token
@require_user_is_owner
def create_restaurant(user_id):
    """
    A protected API endpoint that allow user to create restaurant
    """
    json_data = request.get_json()
    restaurant_data = create_restaurant_data_from_json(user_id, json_data)
    restaurant_id = RESTAURANT_REPO.create_restaurant_db(restaurant_data)
    USER_REPO.update_owner_restaurant_id(user_id, restaurant_id)
    return api_response_message(ResponseKey.RestaurantID, restaurant_id, 201)

@app.route('/api/restaurant/<string:restaurant_id>', methods=['PATCH'])
@require_jwt_token
@require_user_is_owner
def update_restaurant_info(user_id, restaurant_id):
    """
    A protected API endpoint that allow user to update restaurant info
    """
    json_data = request.get_json()
    
    profile_image_json = json_data.get('profileImageLink'),
    promo_images_json = json_data.get('promoImageCollection')
    restaurant_data = create_restaurant_data_from_json(user_id, json_data)
    test_str = profile_image_json.split()[:10]
    print(test_str)
    # if profile_image_json is not None:
    #     restaurant_data.profile_image_link = CLOUDINARY_MANAGER.upload_and_get_db_link(profile_image_json, CLOUDINARY_USER_FOLDER, f"{restaurant_id}_profile")
 
    
    restaurant_update = RESTAURANT_REPO.update_restaurant_db(restaurant_id, restaurant_data)
    if restaurant_update:
        return api_response_message(ResponseKey.Message, 'Update restaurant sucessfully', 201)
    else:
        return api_response_message(ResponseKey.Error, 'Update Failed', 401)

@app.route('/api/restaurant/<string:restaurant_id>/info', methods=['GET'])
def get_restaurant_info(restaurant_id):
    """
    Get restaurant info, except for food
    """
    try:
        restaurant_info = RESTAURANT_REPO.get_restaurant_info(restaurant_id)
        return api_response_data(ResponseKey.Message, 'Get restaurant info successfully', 
                                 ResponseKey.RestaurantInfo, asdict(restaurant_info))
    except ValueError:
        return api_response_message(ResponseKey.Error, 'Restaurant not found', 404)

@app.route('/api/restaurant/<string:restaurant_id>/category', methods=['POST'])
@require_jwt_token
@require_user_is_owner
def create_restaurant_category(user_id, restaurant_id):
    """
    Allow user to create category
    """
    json_data = request.get_json()
    category_data = create_category_data_from_json(restaurant_id, json_data)
    category_id = RESTAURANT_REPO.create_category_db(category_data)
    if category_id:
        return api_response_message(ResponseKey.Message, 'Create restaurant category sucessfully', 201)
    else:
        return api_response_message(ResponseKey.Error, 'Update Failed', 401)

@app.route('/api/restaurant/<string:restaurant_id>/category/<string:category_id>', methods=['PATCH'])
@require_jwt_token
@require_user_is_owner
def update_restaurant_category(user_id, restaurant_id, category_id):
    """
    Allow user to update category
    """
    json_data = request.get_json()
    category_data = create_category_data_from_json(restaurant_id, json_data)
    category_update = RESTAURANT_REPO.update_category_db(category_id, category_data)
    if category_update:
        return api_response_message(ResponseKey.Message, 'Update restaurant category sucessfully', 201)
    else:
        return api_response_message(ResponseKey.Error, 'Update Failed', 401)
    
@app.route('/api/restaurant/<string:restaurant_id>/foods', methods=['POST'])
@require_jwt_token
@require_user_is_owner
def create_restaurant_food(user_id, restaurant_id):
    """
    Allow user to create food info
    """
    json_data = request.get_json()
    food_data = create_food_data_from_json(restaurant_id, json_data)
    food_id = RESTAURANT_REPO.create_food_db(food_data)
    if food_id:
        return api_response_message(ResponseKey.Message, 'Create restaurant food sucessfully', 201)
    else:
        return api_response_message(ResponseKey.Error, 'Update Failed', 401)
 
@app.route('/api/restaurant/<string:restaurant_id>/foods/<string:food_id>', methods=['PATCH'])
@require_jwt_token
@require_user_is_owner
def update_restaurant_food(user_id, restaurant_id, food_id):
    """
    Allow user to update food
    """
    json_data = request.get_json()
    food_data = create_category_data_from_json(restaurant_id, json_data)
    food_update = RESTAURANT_REPO.update_food_db(food_id, food_data)
    if food_update:
        return api_response_message(ResponseKey.Message, 'Update restaurant food sucessfully', 201)
    else:
        return api_response_message(ResponseKey.Error, 'Update Failed', 401)
       
@app.route('/api/restaurant/<string:restaurant_id>/foods', methods=['GET'])
def get_restaurant_foods(restaurant_id):
    """
    Only get restaurant food, return category that is list with foods
    """
    try:
        restaurant_food_list = RESTAURANT_REPO.get_restaurant_foods_grouped_by_category(restaurant_id)
        return api_response_data(ResponseKey.Message, 'Get restaurant foods successfully', 
                                 ResponseKey.RestaurantFoods, restaurant_food_list)
    except ValueError:
        return api_response_message(ResponseKey.Error, 'Restaurant not found', 404)

@app.route('/api/restaurant/amount/info', methods=['GET'])
def get_all_restaurant_info_count():
    """
    Get the total count of restaurant, use for pagination
    """
    try:
        count = RESTAURANT_REPO.get_home_restaurant_amount()
        return api_response_data(ResponseKey.Message, 'Get restaurant total amount successfully', 
                                 ResponseKey.RestaurantCountInfo, count)
    except ValueError:
        return api_response_message(ResponseKey.Error, 'Error', 400)    

@app.route('/api/restaurant/amount/foods', methods=['GET'])
def get_all_restaurants_food_count():
    """
    Get the total count of foods
    """
    try:
        count = RESTAURANT_REPO.get_home_food_amount()
        return api_response_data(ResponseKey.Message, 'Get restaurant total amount successfully', 
                                 ResponseKey.RestaurantCountFoods, count)
    except ValueError:
        return api_response_message(ResponseKey.Error, 'Error', 400)    

@app.route('/api/restaurant/home/info', methods=['GET'])
def get_all_restaurant_info_list():
    """
    Get the list of total restaurant info, divided by pagination
    """
    try:
        json_data = request.get_json()
        page_number = json_data.get('pageNumber')
        item_per_page = json_data.get('itemPerPage')
        list_info = RESTAURANT_REPO.get_home_restaurant_list(page_number, item_per_page)
        return api_response_data(ResponseKey.Message, 'Get restaurant info list successfully', 
                                 ResponseKey.RestaurantListInfo, dict(list_info))
    except ValueError:
        return api_response_message(ResponseKey.Error, 'Error', 400)    

@app.route('/api/restaurant/home/foods', methods=['GET'])
def get_all_restaurants_food_list():
    """
    Get the list of total restaurant foods, divided by pagination, return by food list
    """
    try:
        json_data = request.get_json()
        page_number = json_data.get('pageNumber')
        item_per_page = json_data.get('itemPerPage')
        list_foods= RESTAURANT_REPO.get_home_food_list(page_number, item_per_page)
        return api_response_data(ResponseKey.Message, 'Get restaurant foods list successfully', 
                                 ResponseKey.RestaurantListFoods, dict(list_foods))
    except ValueError:
        return api_response_message(ResponseKey.Error, 'Error', 400)    


@app.route('/api/restaurant/filter/info', methods=['GET'])
def get_filtered_restaurant_info_info():
    """
    Get the list of filtered restaurant info
    """
    try:
        json_data = request.get_json()
        filter_data = create_filtered_restaurant_from_json(json_data)
        list_info = RESTAURANT_REPO.get_filtered_restaurant_list(filter_data)
        return api_response_data(ResponseKey.Message, 'Get all filtered restaurant info list successfully', 
                                 ResponseKey.RestaurantFilteredFoods, dict(list_info))
    except ValueError:
        return api_response_message(ResponseKey.Error, 'Error', 400)    

if __name__ == '__main__':
    app.run(debug=True, port=8080)