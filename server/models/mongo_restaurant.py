"""
Use for inserting with mongo restaurant 
"""
from dataclasses import dataclass, field
from typing import List


@dataclass
class MongoDeliveryLink:
    """
    Use for delivery
    """
    link: str


@dataclass
class MongoAddress:
    """
    Use for delivery
    """
    address_text: str
    map_location: str
    branch_name: str


@dataclass
class MongoRestaurant:
    """
    Use for inserting into MongoDB
    """
    owner_id: str
    type: str
    name: str
    description: List[str] = field(default_factory=list)
    profile_link: str = ''
    picture_collection: List[str] = field(default_factory=list)
    address_branch: List[MongoAddress] = field(default_factory=list)
    phone_number: str = ''
    main_cuisine_type: str = ''
    open_hours: str = ''
    pure_vegan: bool = False
    take_away: bool = False
    dine_in: bool = False
    delivery_link: List[MongoDeliveryLink] = field(default_factory=list)
    review_manager_id: str = ''


@dataclass
class MongoCategory:
    """
    Use for inserting into MongoDB
    """
    shop_id: str
    name: str
    total_food_amount: int = 0


@dataclass
class MongoFood:
    """
    Use for inserting into MongoDB
    """
    shop_id: str
    category_id: str
    name: str
    description: str
    price: float
    picture_link: str
    

def create_restaurant_data_from_json(owner_id: str, json_data: object) -> MongoRestaurant:
    restaurant_data = MongoRestaurant(
        owner_id=owner_id,
        type=json_data.get('type'),
        name=json_data.get('name'),
        profile_link=json_data.get('profileLink'),
        address_branch=json_data.get('address'),
        phone_number=json_data.get('phoneNumber'),
        main_cuisine_type=json_data.get('cuisineType'),
        open_hours=json_data.get('openHours'),
        pure_vegan=json_data.get('pureVegan'),
        take_away=json_data.get('takeAway'),
        dine_in=json_data.get('dineIn')
    )
    return restaurant_data

def create_category_data_from_json(shop_id: str, json_data: object) -> MongoCategory:
    restaurant_data = MongoCategory(
        shop_id=shop_id,
        name=json_data.get('name'),
        total_food_amount=json_data.get('totalFoodAmount')
    )
    return restaurant_data

def create_food_data_from_json(shop_id: str, json_data: object) -> MongoFood:
    restaurant_data = MongoRestaurant(
        shop_id=shop_id,
        category_id=json_data.get('categoryId'),
        name=json_data.get('name'),
        description=json_data.get('description'),
        price=json_data.get('price'),
        picture_link=json_data.get('pictureLink')
    )
    return restaurant_data