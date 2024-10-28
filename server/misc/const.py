class CollectionName:
    DinerData = 'diner_data'
    DinerAuthentication = 'diner_auth'
    OwnerData = 'owner_data'
    OwnerAuthentication = 'owner_auth'
    RestaurantData = 'restaurant_data'
    RestaurantCategory = 'restaurant_category'
    RestaurantFood = 'restaurant_food'


class ResponseKey:
    """
    Use for returning jsonify key
    """
    Token = 'token'
    Message = 'message'
    Error = 'error'
    UserID = 'user_id'
    RestaurantID = 'restaurant_id'
    RestaurantInfo = 'restaurant_info'
    RestaurantFoods= 'restaurant_foods'
    RestaurantCountInfo = 'count_total_restaurant_info'
    RestaurantCountFoods= 'count_total_restaurant_foods'
    RestaurantListInfo = 'list_total_restaurant_info'
    RestaurantListFoods= 'list_total_restaurant_foods'
    RestaurantFilteredFoods= 'list_filtered_restaurant_foods'
    KeyUser = 'user'
    KeyAuth = 'authentication'


class AuthenticationType:
    Base = 'base'
    Google = 'google'


class UserType:
    Diner = 'diner'
    Owner = 'owner'
