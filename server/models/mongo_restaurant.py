"""
Use for inserting with mongo restaurant 
"""
from dataclasses import dataclass, field
from typing import List
from misc.utils import to_camel_case

@dataclass
class MongoDeliveryLink:
    """
    Use for delivery
    """
    company: str = ''
    link: str = ''



@dataclass
class MongoAddress:
    """
    Use for delivery
    """
    address_text: str = ''
    map_location: str = ''
    branch_name: str = ''
    

@dataclass
class MongoRestaurant:
    """
    Use for inserting into MongoDB
    """
    owner_id: str
    name: str
    category_description: List[str] = field(default_factory=list)
    
    profile_image_link: str = ''
    promo_image_collection: List[str] = field(default_factory=list)
    
    food_country_type: str = ''
    food_country_image_link: str = ''
    
    address_collection: List[MongoAddress] = field(default_factory=list)
    phone_number: str = ''
    open_hours: dict = ''
    open_days: str = ''
    
    pure_vegan: bool = None
    take_away: bool = None
    dine_in: bool = None
    buffet: bool = None
    
    lowest_price: int = 0
    highest_price: int = 0
    delivery_collection: List[MongoDeliveryLink] = field(default_factory=list)
    payment_method: List[str] = field(default_factory=list)
    
    review_manager_id: str = ''


@dataclass
class MongoCategory:
    """
    Use for inserting into MongoDB
    """
    shop_id: str = ''
    name: str = ''
    total_food_amount: int = 0

@dataclass
class MongoFood:
    """
    Use for inserting into MongoDB
    """
    shop_id: str = ''
    category_id: str = ''
    name: str = ''
    description: str = ''
    price: float = 0
    image_link: str = ''


@dataclass
class MongoFilteredRestaurant:
    """
    Use for inserting into MongoDB
    """
    pure_vegan: bool
    take_away: bool
    dine_in: bool
    buffet: bool
    
    food_country_types: str
    delivery_types: list[str] = field(default_factory=list)
    price_over: int = 0
    price_under: int = 0
    
def create_address_data_from_json(json_data: object) -> MongoAddress:
    return MongoAddress(
            address_text=json_data.get('addressText', ''),
            map_location=json_data.get('mapLocation', ''),
            branch_name=json_data.get('branchName', '')
        )

def create_delivery_data_from_json(json_data: object) -> MongoAddress:
    return MongoDeliveryLink(
            company=json_data.get('company', ''),
            link=json_data.get('link', '')
        )
    
def create_restaurant_data_from_json(owner_id: str, json_data: object) -> MongoRestaurant:
    address_list = [create_address_data_from_json(delivery_json) for delivery_json in json_data.get('addressCollection', [])]
    delivery_list = [create_delivery_data_from_json(delivery_json) for delivery_json in json_data.get('deliveryCollection', [])]
    
    restaurant_data = MongoRestaurant(
        owner_id=owner_id,
        name=json_data.get('name', ''),
        category_description=json_data.get('categoryDescription', ''),
                
        food_country_type=json_data.get('foodCountryType', ''),
        food_country_image_link=json_data.get('foodCountryImageLink', ''),
        
        address_collection=address_list,
        phone_number=json_data.get('phoneNumber', ''),
        open_hours=json_data.get('openHours', ''),
        open_days=json_data.get('openDays', ''),
        
        pure_vegan=json_data.get('pureVegan'),
        take_away=json_data.get('takeAway'),
        dine_in=json_data.get('dineIn'),
        buffet=json_data.get('buffet'),
        
        lowest_price=json_data.get('lowestPrice', 0),
        highest_price=json_data.get('highestPrice', 0),
        delivery_collection=delivery_list,
        payment_method=json_data.get('paymentMethod', [])
        
    )
    return restaurant_data

def create_category_data_from_json(shop_id: str, json_data: object) -> MongoCategory:
    restaurant_data = MongoCategory(
        shop_id=shop_id,
        name=json_data.get('name', ''),
        total_food_amount=json_data.get('totalFoodAmount', 0)
    )
    return restaurant_data

def create_food_data_from_json(shop_id: str, json_data: object) -> MongoFood:
    food_data = MongoFood(
        shop_id=shop_id,
        category_id=json_data.get('categoryId', ''),
        name=json_data.get('name', ''),
        description=json_data.get('description', ''),
        price=json_data.get('price', 0)
    )
    return food_data

def create_filtered_restaurant_from_json(json_data: object) -> MongoFilteredRestaurant:
    filter = MongoFilteredRestaurant(
        pure_vegan=json_data.get('pureVegan', False),
        take_away=json_data.get('takeAway', False),
        dine_in=json_data.get('dineIn', False),
        buffet=json_data.get('buffet', False),
        
        food_country_types=json_data.get('foodCountryTypes', ''),
        delivery_types=json_data.get('deliveryTypes', []),
        price_over=json_data.get('priceOver', 0),
        price_under=json_data.get('priceUnder', 0)
    )
    return filter

