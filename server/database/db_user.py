from database.db_manager import DatabaseManager
from models.user_data import DinerData, RestaurantOwnerData
from models.user_auth import UserAuthentication
from misc.const import CollectionName, UserType
from misc.signup_data import SignUpData, create_user_data_and_auth_from_signup_data
from bson.objectid import ObjectId


def convert_doc_to_diner_data(doc):
    return DinerData(
        email=doc['email'],
        phone_number=doc['phone_number'],
        full_name=doc['full_name'],
        profile_image_link=doc['profile_image_link'],
        address=doc['address'],
        favorite_restaurants=doc['favorite_restaurants']
    )


def convert_doc_to_owner_data(doc):
    return RestaurantOwnerData(
        email=doc['email'],
        phone_number=doc['phone_number'],
        full_name=doc['full_name'],
        profile_image_link=doc['profile_image_link'],
        restaurant_id=doc['restaurant_id']
    )


class UserRepository:
    def __init__(self, db_manager: DatabaseManager):
        self.db_manager = db_manager

    def create_diner_db(self, diner_data: DinerData, diner_auth: UserAuthentication) -> str:
        collection_diner_data = self.db_manager.get_collection(
            CollectionName.DinerData)
        collection_diner_auth = self.db_manager.get_collection(
            CollectionName.DinerAuthentication)

        doc_diner_data = collection_diner_data.insert_one(diner_data.__dict__)

        diner_id = str(doc_diner_data.inserted_id)
        print(diner_id)
        diner_auth.user_id = diner_id

        collection_diner_auth.insert_one(diner_auth.__dict__)

        return diner_id

    def create_owner_db(self, owner_data: RestaurantOwnerData, owner_auth: UserAuthentication) -> str:
        collection_owner_data = self.db_manager.get_collection(
            CollectionName.RestaurantOwnerData)
        collection_owner_auth = self.db_manager.get_collection(
            CollectionName.RestaurantOwnerAuthentication)

        doc_owner_data = collection_owner_data.insert_one(owner_data.__dict__)
        owner_id = str(doc_owner_data.inserted_id)
        owner_auth.user_id = owner_id

        collection_owner_auth.insert_one(owner_auth.__dict__)

        return owner_id

    def create_user(self, signup_data: SignUpData) -> str:
        user_data, user_auth = create_user_data_and_auth_from_signup_data(
            signup_data)
        if signup_data.user_type == UserType.Diner:
            user_id = self.create_diner_db(user_data, user_auth)
        elif signup_data.user_type == UserType.RestaurantOwner:
            user_id = self.create_owner_db(user_data, user_auth)
        return user_id

    def get_user_id_from_login(self, username: str, password: str, user_type: str) -> str:
        """
        Get the username and password from frontend and return its user_id from user_auth
        """
        if user_type == UserType.Diner:
            collection_users = self.db_manager.get_collection(
                CollectionName.DinerAuthentication)
        elif user_type == UserType.RestaurantOwner:
            collection_users = self.db_manager.get_collection(
                CollectionName.RestaurantOwnerAuthentication)

        user = collection_users.find_one({'username': username,
                                          'password': password})

        if user:
            return user['user_id']
        else:
            return None

    def get_user_data_from_id(self, user_id: str):
        collection_diners = self.db_manager.get_collection(
            CollectionName.DinerData)

        user_doc = collection_diners.find_one({'_id': ObjectId(user_id)})
        user_data = None
        if user_doc:

            user_data = convert_doc_to_diner_data(user_doc)
        else:
            collection_owners = self.db_manager.get_collection(
                CollectionName.RestaurantOwnerData)
            user_doc = collection_owners.find_one({'_id': ObjectId(user_id)})
            if user_doc is None:
                return None
            user_data = convert_doc_to_owner_data(user_doc)

        print(user_data)
        return user_data

    def get_all_users(self):
        diner_data = self.db_manager.get_all_docs_from_collection(
            CollectionName.DinerData)
        diner_auth = self.db_manager.get_all_docs_from_collection(
            CollectionName.DinerAuthentication)
        owner_data = self.db_manager.get_all_docs_from_collection(
            CollectionName.RestaurantOwnerData)
        owner_auth = self.db_manager.get_all_docs_from_collection(
            CollectionName.RestaurantOwnerAuthentication)

        # Organize the data
        data = {
            'diner_data': diner_data,
            'diner_auth': diner_auth,
            'owner_data': owner_data,
            'owner_auth': owner_auth
        }
        return data
