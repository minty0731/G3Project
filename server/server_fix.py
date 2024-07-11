from flask import Flask, request, jsonify
from flask_cors import CORS
from functools import wraps
import jwt
from database.db_manager import DatabaseManager, serialize_document
from database.db_user import UserRepository
from misc.signup_data import SignUpData
from misc.token import generate_token, decode_token

# MongoDB connection
MY_URI = "mongodb+srv://admin123:admin123@veganreview.xb51ssf.mongodb.net/?retryWrites=true&w=majority&appName=VeganReview"
DB_NAME = "my_db"
DB_MANAGER = DatabaseManager(MY_URI, DB_NAME)

# app instance
app = Flask(__name__)
CORS(app)
user_repo = UserRepository(DB_MANAGER)

TEST_KEY = 'vegan-review-test-key'


def create_signup_data_from_json(json_data) -> SignUpData:
    signup_data = SignUpData(
        username=json_data.get('username'),
        password=json_data.get('password'),
        email=json_data.get('email'),
        phone=json_data.get('phoneNumber'),
        user_type=json_data.get('userType')
    )
    return signup_data


def require_token(func):
    """
    Decorator to require a valid JWT token for the decorated route.
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization', None)
        if not token:
            return jsonify({'error': 'No token provided'}), 401

        try:
            data = decode_token(TEST_KEY, token)
            # The user ID is stored in the 'sub' claim of the JWT token
            user_id = data['sub']
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

        # Pass the user ID to the decorated function
        return func(user_id, *args, **kwargs)
    return wrapper


@app.route('/api/signup', methods=['POST'])
def signup():
    json_data = request.get_json()
    signup_data = create_signup_data_from_json(json_data)

    print(signup_data.__dict__)
    user_id = user_repo.create_user(signup_data)
    return jsonify({'user_id': user_id}), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user_type = data.get('userType')

    # Authenticate the user using MongoDB
    user_id = user_repo.get_user_id_from_login(username, password, user_type)
    if user_id:
        token = generate_token(TEST_KEY, user_id)
        return jsonify({'token': token})
    else:
        return jsonify({'error': 'Invalid username or password'}), 401


@app.route('/api/protected', methods=['GET'])
@require_token
def protected(user_id):
    """
    A protected API endpoint that requires a valid JWT token.
    """
    # Fetch the user's data from MongoDB using the user_id
    user = user_repo.get_user_data_from_id(user_id)
    print(user)
    if user:
        return jsonify({'message': 'Login successful', 'user': user.__dict__}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

# /api/users


@app.route('/api/users', methods=['GET'])
def get_users():
    users = user_repo.get_all_users()
    return jsonify(users), 200


if __name__ == '__main__':
    app.run(debug=True, port=8080)
