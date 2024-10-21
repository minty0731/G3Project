"""
Use for mongo user
"""
from dataclasses import dataclass, field
from typing import List


@dataclass
class UserData:
    email: str
    phone_number: str
    full_name: str = ''
    profile_image_link: str = ''

@dataclass
class DinerData(UserData):
    address: str = ''
    favorite_restaurants: List[str] = field(default_factory=list)

@dataclass
class OwnerData(UserData):
    restaurant_id: str = ''
    
@dataclass
class UserAuthentication:
    username: str
    password: str
    authentication_type: str
    authentication_identifier: str
    user_id: str = None


def create_diner_data_from_json(json_data: object) -> DinerData:
    diner_data = DinerData(
        email=json_data.get('email'),
        phone_number=json_data.get('phoneNumber'),
        full_name=json_data.get('fullName'),
        profile_image_link=json_data.get('profileImageLink'),
        address=json_data.get('address'),
        favorite_restaurants=json_data.get('favoriteRestaurants')
    )
    return diner_data

def create_owner_data_from_json(json_data: object) -> OwnerData:
    owner_data = OwnerData(
        email=json_data.get('email'),
        phone_number=json_data.get('phoneNumber'),
        full_name=json_data.get('fullName'),
        profile_image_link=json_data.get('profileImageLink'),
        restaurant_id=json_data.get('restaurantId')
    )
    return owner_data

def create_user_auth_from_json(json_data: object, user_id: str) -> UserAuthentication:
    user_auth = UserAuthentication(
        username=json_data.get('username'),
        password=json_data.get('password'),
        authentication_type=json_data.get('authenticationType'),
        authentication_identifier=json_data.get('authenticationIdentifier'),
        user_id=user_id
    )
    return user_auth