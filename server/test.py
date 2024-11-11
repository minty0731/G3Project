"""
Noted that for some reason, it cant import if you run inside any other folders
"""
from bson.objectid import ObjectId
from models.mongo_restaurant import MongoRestaurant, MongoCategory, MongoFood
from database.db_restaurant import RestaurantRepository
from misc.const import CollectionName, UserType
from database.db_manager import DatabaseManager
from database.db_user import UserRepository
from database.cloudinary_image import CloudinaryManager
import random

actual_id ='67162174f9b8ff18eda6aaaf'

MY_URI = "mongodb+srv://dolongduy:vegan1234@test.ussqay0.mongodb.net/?retryWrites=true&w=majority&appName=Test"
DB_NAME = "vegan"
DB_MANAGER = DatabaseManager(MY_URI, DB_NAME)
RESTAURANT_REPO = RestaurantRepository(DB_MANAGER)
USER_REPO = UserRepository(DB_MANAGER)

# Cloudinary manager
CLOUDINARY_NAME = 'dzxlzh6hh'
CLOUDINARY_KEY = '451518431196965'
CLOUDINARY_SECRET = 'PDYOYg1BaYJrPY616mK6zlh9lA4'
CLOUDINARY_USER_FOLDER = 'Users'
CLOUDINARY_MANAGER = CloudinaryManager(CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET)

def test_create_restaurant(restaurant):
    return RESTAURANT_REPO.create_restaurant_db(restaurant)

def test_get_restaurant_info(restaurant_id):
    return RESTAURANT_REPO.get_restaurant_info(restaurant_id)

def test_get_user_data_from_id(user_id):
    return USER_REPO.get_user_data_from_id(user_id)

def test_get_user_auth_from_id(user_id):
    return USER_REPO.get_user_auth_from_id(user_id)

def create_categories_and_foods(shop_id: str):
    # Step 1: Create 5 categories
    categories = []
    for i in range(5):
        category_name = f"Category {i + 1}: {shop_id}"
        mongo_category = MongoCategory(
            shop_id=shop_id,
            name=category_name,
            total_food_amount=0  # Initial count
        )
        category_id = RESTAURANT_REPO.create_category_db(mongo_category)
        categories.append(category_id)

    # Step 2: Create 25 food items
    food_names = [
        "Pizza", "Burger", "Pasta", "Salad", "Sushi",
        "Tacos", "Sandwich", "Steak", "Ice Cream", "Pancakes",
        "Dumplings", "Curry", "Fries", "Wings", "Quiche",
        "Bagel", "Burrito", "Brownie", "Cupcake", "Nachos",
        "Kebab", "Stew", "Chowder", "Pita", "Frittata"
    ]

    for i in range(25):
        food_name = random.choice(food_names)
        category_id = random.choice(categories)  # Randomly assign a category
        mongo_food = MongoFood(
            shop_id=shop_id,
            category_id=category_id,
            name=food_name,
            description=f"Delicious {food_name}",
            price=round(random.uniform(5.0, 20.0), 2),  # Random price between 5 and 20
            image_link=f"http://example.com/{food_name.lower().replace(' ', '_')}.jpg"
        )
        RESTAURANT_REPO.create_food_db(mongo_food)


def display_grouped_foods(restaurant_id: str):
    """
    Retrieve and print all foods for a specific restaurant, grouped by their categories.

    :param repo: An instance of the repository class containing the method.
    :param restaurant_id: The ID of the restaurant (shop_id) to retrieve foods for.
    """
    try:
        # Call the method to get grouped foods
        grouped_foods = RESTAURANT_REPO.get_restaurant_foods_grouped_by_category(restaurant_id)

        # Check if any foods were found
        if not grouped_foods:
            print(f"No foods found for restaurant ID: {restaurant_id}")
            return

        # Print the results
        for category in grouped_foods:
            print(f"Category: {category['name']}")
            for food in category["food_list"]:
                print(f"  - {food['name']} (Price: ${food['price']})")

    except Exception as e:
        print(f"An error occurred: {e}")

user_id = '671614d2bc0f745bb6a56323'
owner_id = '671a4afd23928f9f3fc963e4'
res_id = '672b5f5ee12ea6f036439eee'

user_test = '671614d2bc0f745bb6a56323_profile'
test = CLOUDINARY_MANAGER.upload_image('test img.jpg', CLOUDINARY_USER_FOLDER, user_test)
get_url = test["url"]
version = test["version"]
public_id = test["public_id"]
format = test["format"]
print(f"v{version}/{public_id}.{format}")
print(get_url)
