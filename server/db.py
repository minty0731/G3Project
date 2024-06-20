"""
Use to handle all of the process that is linekd to the database
"""
from pymongo import MongoClient
from bson.objectid import ObjectId
from models.account import User, Diner, ShopOwner

MY_URI = "mongodb+srv://dolongduy:22092003Sp@test.ussqay0.mongodb.net/?retryWrites=true&w=majority&appName=Test"


class DatabaseManager:
    def __init__(self, db_name):
        self.client = MongoClient(MY_URI)
        self.db = self.client[db_name]

    def get_users_collection(self):
        return self.db['users']

    def get_other_collection(self, collection_name: str):
        return self.db[collection_name]


DB_MANAGER = DatabaseManager('my_db')


class UserRepository:
    def __init__(self):
        self.users_collection = DB_MANAGER.get_users_collection()

    def create_user(self, user: User) -> str:
        user_data = user.__dict__
        result = self.users_collection.insert_one(user_data)
        return str(result.inserted_id)

    def get_user_by_username(self, username: str) -> User:
        user_data = self.users_collection.find_one({'username': username})
        if user_data:
            user_type = user_data.pop('user_type')
            if user_type == 'diner':
                return Diner(**user_data)
            else:
                return ShopOwner(**user_data)
        return None

    def close_connection(self):
        self.client.close()
