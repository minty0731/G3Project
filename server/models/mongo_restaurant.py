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
    company: str
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
    name: str
    category_description: List[str] = field(default_factory=list)
    
    profile_image_link: str = ''
    promo_image_collection: List[str] = field(default_factory=list)
    
    food_country_type: str = ''
    food_country_image_link: str = ''
    
    address_collection: List[MongoAddress] = field(default_factory=list)
    phone_number: str = ''
    open_hours: dict = ''
    open_days: list[str] = ''
    
    pure_vegan: bool = False
    take_away: bool = False
    dine_in: bool = False
    buffet: bool = False
    
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
    image_link: str


@dataclass
class MongoFilteredRestaurant:
    """
    Use for inserting into MongoDB
    """
    pure_vegan: bool
    take_away: bool
    dine_in: bool
    buffet: bool
    
    food_country_types: list[str] = field(default_factory=list)
    delivery_types: list[str] = field(default_factory=list)
    price_over: int = 0
    price_under: int = 0
    
def create_restaurant_data_from_json(owner_id: str, json_data: object) -> MongoRestaurant:
    address_list = [MongoAddress(**address) for address in json_data.get('addressCollection', [])]
    delivery_list = [MongoDeliveryLink(**delivery_link) for delivery_link in json_data.get('deliveryCollection', [])]
    restaurant_data = MongoRestaurant(
        owner_id=owner_id,
        name=json_data.get('name'),
        category_description=json_data.get('categoryDescription'),
        
        profile_image_link=json_data.get('profileImageLink'),
        promo_image_collection=json_data.get('promoImageCollection'),
        
        food_country_type=json_data.get('foodCountryType'),
        food_country_image_link=json_data.get('foodCountryImageLink'),
        
        address_collection=address_list,
        phone_number=json_data.get('phoneNumber'),
        open_hours=json_data.get('openHours'),
        open_days=json_data.get('openDays'),
        
        pure_vegan=json_data.get('pureVegan'),
        take_away=json_data.get('takeAway'),
        dine_in=json_data.get('dineIn'),
        buffet=json_data.get('buffet'),
        
        lowest_price=json_data.get('lowestPrice'),
        highest_price=json_data.get('highestPrice'),
        delivery_collection=delivery_list,
        payment_method=json_data.get('paymentMethod')
        
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
        picture_link=json_data.get('imageLink')
    )
    return restaurant_data

def create_filtered_restaurant_from_json(json_data: object) -> MongoFilteredRestaurant:
    filter = MongoFilteredRestaurant(
        pure_vegan=json_data.get('pureVegan'),
        take_away=json_data.get('takeAway'),
        dine_in=json_data.get('dineIn'),
        buffet=json_data.get('buffet'),
        
        food_country_types=json_data.get('foodCountryTypes'),
        delivery_types=json_data.get('deliveryTypes'),
        price_over=json_data.get('priceOver'),
        price_under=json_data.get('priceUnder')
    )
    return filter

