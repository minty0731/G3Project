from dataclasses import asdict
from database.db_manager import DatabaseManager
from models.mongo_restaurant import MongoRestaurant, MongoCategory, MongoFood, MongoFilteredRestaurant
from misc.const import CollectionName
from bson.objectid import ObjectId


class RestaurantRepository:
    def __init__(self, db_manager: DatabaseManager):
        self.db_manager = db_manager

    def create_restaurant_db(self, mongo_restaurant: MongoRestaurant) -> str:
        """
        Create the restaurant data
        """
        collection_restaurant_data = self.db_manager.get_collection(
            CollectionName.RestaurantData)

        doc_restaurant_data = collection_restaurant_data.insert_one(
            asdict(mongo_restaurant))
        restaurant_id = str(doc_restaurant_data.inserted_id)

        return restaurant_id
    
    def create_restaurant_template(self, owner_id: str) -> str:
        """
        Create the restaurant template for owner
        """
        collection_restaurant_data = self.db_manager.get_collection(
            CollectionName.RestaurantData)
        temp_restaurant = MongoRestaurant(owner_id, "temp")
        doc_restaurant_data = collection_restaurant_data.insert_one(
            asdict(temp_restaurant))
        restaurant_id = str(doc_restaurant_data.inserted_id)

        return restaurant_id
    
    def get_restaurant_info(self, restaurant_id: str) -> MongoRestaurant:
        """
        Retrieve restaurant information (xecpet category and food) by restaurant ID.
        """
        collection_restaurant_data = self.db_manager.get_collection(CollectionName.RestaurantData)

        # Fetch the restaurant document by its ID
        restaurant_doc = collection_restaurant_data.find_one({"_id": ObjectId(restaurant_id)})

        if restaurant_doc:
            # Exclude '_id' if not needed
            restaurant_doc.pop('_id', None)  # Remove _id if MongoRestaurant doesn't accept it
            restaurant_info = MongoRestaurant(**restaurant_doc)
            return restaurant_info
        else:
            raise ValueError("Restaurant not found")
        
    def update_restaurant_db(self, restaurant_id: str, mongo_restaurant: MongoRestaurant) -> bool:
        """
        Update the restaurant data.
        """
        collection_restaurant_data = self.db_manager.get_collection(
            CollectionName.RestaurantData)

        result = collection_restaurant_data.update_one(
            {"_id": ObjectId(restaurant_id)},
            {"$set": asdict(mongo_restaurant)}
        )
        return result.modified_count > 0

    def create_category_db(self, mongo_category: MongoCategory) -> str:
        """
        Create the category data
        """
        collection_category_data = self.db_manager.get_collection(
            CollectionName.RestaurantCategory)

        doc_category_data = collection_category_data.insert_one(
            asdict(mongo_category))
        category_id = str(doc_category_data.inserted_id)

        return category_id

    def update_category_db(self, category_id: str, mongo_category: MongoCategory) -> bool:
        """
        Update the category data.
        """
        collection_category_data = self.db_manager.get_collection(
            CollectionName.RestaurantCategory)

        result = collection_category_data.update_one(
            {"_id": ObjectId(category_id)},
            {"$set": asdict(mongo_category)}
        )
        return result.modified_count > 0

    def create_food_db(self, mongo_food: MongoFood) -> str:
        """
        Create the food data
        """
        collection_food_data = self.db_manager.get_collection(
            CollectionName.RestaurantFood)
        collection_category_data = self.db_manager.get_collection(
            CollectionName.RestaurantCategory)

        # Update the corresponding category's total food amount
        collection_category_data.update_one(
            {"_id": ObjectId(mongo_food.category_id)},
            # Increment the total_food_amount by 1
            {"$inc": {"total_food_amount": 1}}
        )

        doc_food_data = collection_food_data.insert_one(
            asdict(mongo_food))
        food_id = str(doc_food_data.inserted_id)

        return food_id

    def update_food_db(self, food_id: str, mongo_food: MongoFood) -> bool:
        """
        Update the food data.
        """
        collection_food_data = self.db_manager.get_collection(
            CollectionName.RestaurantFood)

        result = collection_food_data.update_one(
            {"_id": ObjectId(food_id)},
            {"$set": asdict(mongo_food)}
        )
        return result.modified_count > 0

    def get_home_restaurant_amount(self) -> int:
        """
        Retrieve restaurant amount for pagination in home page
        """
        collection_restaurant_data = self.db_manager.get_collection(
            CollectionName.RestaurantData)

        # Get total count for pagination
        total_count = collection_restaurant_data.count_documents({})

        return total_count

    def get_home_food_amount(self) -> int:
        """
        Retrieve food amount for pagination in home page
        """
        collection_restaurant_data = self.db_manager.get_collection(
            CollectionName.RestaurantData)

        # Get total count for pagination
        total_count = collection_restaurant_data.count_documents({})

        return total_count

    def get_home_restaurant_list(self, page: int = 1, page_size: int = 10) -> list[dict]:
        """
        Retrieve the list of restaurants for pagination in home page
        """
        collection_restaurant_data = self.db_manager.get_collection(
            CollectionName.RestaurantData)

        # Calculate the number of documents to skip
        skip_count = (page - 1) * page_size

        # Retrieve paginated results
        restaurants = list(collection_restaurant_data.find().skip(
            skip_count).limit(page_size))

        return restaurants

    def get_home_food_list(self, page: int = 1, page_size: int = 10) -> list[dict]:
        """
        Retrieve all foods from all restaurants with pagination in home page
        """
        collection_food_data = self.db_manager.get_collection(
            CollectionName.RestaurantFood)

        # Calculate the number of documents to skip
        skip_count = (page - 1) * page_size

        # Retrieve paginated results
        foods = list(collection_food_data.find().skip(
            skip_count).limit(page_size))

        return foods     
        
    def get_restaurant_foods_grouped_by_category(self, restaurant_id: str) -> list[dict]:
        """
        Retrieve all foods for a specific restaurant, grouped by their categories.
        """
        collection_food_data = self.db_manager.get_collection(
            CollectionName.RestaurantFood)
        collection_category_data = self.db_manager.get_collection(
            CollectionName.RestaurantCategory)

        # Retrieve foods for the specified restaurant
        foods = list(collection_food_data.find({"shop_id": restaurant_id}))
        
        for food in foods:
            del food['_id']
            
        # Retrieve categories for these IDs
        categories = list(collection_category_data.find(
            {"shop_id": restaurant_id}))

        # Create a dictionary for categories for easy insert
        grouped_food = {str(category['_id'])
                             : category for category in categories}
        # add in the foods list key for inner dict
        for inner_key, category in grouped_food.items():
            if isinstance(category, dict):  # Ensure it's a dictionary
                category["food_list"] = []  # Add the new key-value pair
            
        for food in foods:
            category_id = food['category_id']
            grouped_food[category_id]["food_list"].append(food)
            
        
        result = list(grouped_food.values())
        for category in result:
            del category['_id']
            
        return result
    def create_query_for_filtered_restaurants(self, filter: MongoFilteredRestaurant) -> dict[str, object]:
        query = {}
        # Filter by boolean attributes using OR
        if filter.pure_vegan:
            query["$or"].append({"pure_vegan": True})
        if filter.take_away:
            query["$or"].append({"take_away": True})
        if filter.dine_in:
            query["$or"].append({"dine_in": True})
        if filter.buffet:
            query["$or"].append({"buffet": True})

        # Filter by food country type
        if filter.food_country_types:
            if len(filter.food_country_types) > 1:
                query["food_country_type"] = {"$in": filter.food_country_types}  # Array case
            elif len(filter.food_country_types) == 1:
                query["food_country_type"] = filter.food_country_types[0]  # Single value case

        # Filter by delivery types (check the name field)
        if filter.delivery_types:
            if len(filter.delivery_types) > 1:
                query["delivery_collection.name"] = {"$in": filter.delivery_types}  # Array case
            elif len(filter.delivery_types) == 1:
                query["delivery_collection.name"] = filter.delivery_types[0]  # Single value case

        # Filter by price range (using AND logic)
        price_conditions = {}
        if filter.price_over > 0:
            price_conditions['lowest_price'] = {'$gte': filter.price_over}
        if filter.price_under > 0:
            price_conditions['highest_price'] = {'$lte': filter.price_under}

        # Combine price conditions with the main query
        if price_conditions:
            query.update(price_conditions)

        return query
    
    def get_filtered_restaurant_list(self, filter: MongoFilteredRestaurant) -> list[dict]:
        """
        Retrieve the list of restaurants that is filtered, in pagination
        """
        collection_restaurant_data = self.db_manager.get_collection(
            CollectionName.RestaurantData)

        query = self.create_query_for_filtered_restaurants(filter)
        
        # Retrieve paginated results
        filtered_restaurants = list(collection_restaurant_data.find(query))
        
        return filtered_restaurants
