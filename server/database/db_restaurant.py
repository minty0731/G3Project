from dataclasses import asdict
from database.db_manager import DatabaseManager
from models.mongo_restaurant import MongoRestaurant, MongoCategory, MongoFood, MongoFilteredRestaurant
from misc.const import CollectionName
from bson.objectid import ObjectId
from misc.utils import dataclass_to_dict, convert_value


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
            {"$set": dataclass_to_dict(mongo_restaurant)}
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
            {"$set": dataclass_to_dict(mongo_category)}
        )
        return result.modified_count > 0

    def create_category_templates(self, restaurant_id: str):
        for category_name in CollectionName.RestaurantCategoryNames:
            self.create_category_db(MongoCategory(restaurant_id, category_name))
            
            
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
            {"$set": dataclass_to_dict(mongo_food)}
        )
        return result.modified_count > 0

    def update_food_image(self, food_id: str, image_link: str) -> bool:
        """
        Update the food image.
        """
        collection_food_data = self.db_manager.get_collection(
            CollectionName.RestaurantFood)

        result = collection_food_data.update_one(
            {"_id": ObjectId(food_id)},
            {"$set": {"image_link": image_link}}
        )
        return result.modified_count > 0
    
    def get_food_image_link(self, food_id : str) -> str:
        """
        Get the food image link
        """
        collection_food_data = self.db_manager.get_collection(
            CollectionName.RestaurantFood)

        result = collection_food_data.find_one(
            {"_id": ObjectId(food_id)},
            {"image_link": 1, "_id": 0}
        )
            
        return result['image_link'] if result['image_link'] else ''
    
    def delete_food_db(self, food_id: str) -> bool:
        """
        Delete the food data
        """
        collection_food_data = self.db_manager.get_collection(
            CollectionName.RestaurantFood)
        collection_category_data = self.db_manager.get_collection(
            CollectionName.RestaurantCategory)

        category_id = collection_food_data.find_one(
            {"_id": ObjectId(food_id)},
            {"category_id": 1, "_id": 0}
        )['category_id']
                
        # Update the corresponding category's total food amount
        collection_category_data.update_one(
            {"_id": ObjectId(category_id)},
            # Decrease the total_food_amount by 1
            {"$inc": {"total_food_amount": -1}}
        )

        result = collection_food_data.delete_one({"_id": ObjectId(food_id)})
        
        return result.deleted_count > 0
    
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
        restaurant_docs = list(collection_restaurant_data.find().skip(
            skip_count).limit(page_size))
        
        restaurants = []
        for restaurant_doc in restaurant_docs:
            id = restaurant_doc.pop('_id')
            restaurant = convert_value(restaurant_doc, True)
            restaurant['restaurantId'] = str(id)
            restaurants.append(restaurant)
            
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
        food_docs = list(collection_food_data.find().skip(
            skip_count).limit(page_size))
        
        foods = []
        for food_doc in food_docs:
            id = food_doc.pop('_id')
            food = convert_value(food_doc, True)
            food['foodId'] = str(id)
            foods.append(food)
            
        return foods     
        
    def get_restaurant_foods(self, restaurant_id: str) -> list[dict]:
        """
        Retrieve all foods for a specific restaurant, grouped by their categories.
        """
        collection_food_data = self.db_manager.get_collection(
            CollectionName.RestaurantFood)

        # Retrieve foods for the specified restaurant
        food_docs = list(collection_food_data.find({"shop_id": restaurant_id}))
        
        foods = []
        for food_doc in food_docs:
            id = food_doc.pop('_id')
            food = convert_value(food_doc, True)
            food['foodId'] = str(id)
            foods.append(food)
            
        return foods
    
    def get_restaurant_categories(self, restaurant_id: str) -> list[dict]:
        """
        Retrieve all categories for a specific restaurant
        """
        collection_category_data = self.db_manager.get_collection(
            CollectionName.RestaurantCategory)
            
        # Retrieve categories for the specified restaurant
        category_docs = list(collection_category_data.find(
            {"shop_id": restaurant_id}))
            
        categories = []
        for category_doc in category_docs:
            id = category_doc.pop('_id')
            category = convert_value(category_doc, True)
            category['categoryId'] = str(id)
            categories.append(category)
            
        return categories
    
    def create_query_for_filtered_restaurants(self, filter: MongoFilteredRestaurant) -> dict[str, object]:
        query = {}
        query["$or"] = []
        check_boolean = 0
        # Filter by boolean attributes using OR
        if filter.pure_vegan:
            check_boolean = 1
            query["$or"].append({"pure_vegan": True})
        if filter.take_away:
            check_boolean = 1
            query["$or"].append({"take_away": True})
        if filter.dine_in:
            check_boolean = 1
            query["$or"].append({"dine_in": True})
        if filter.buffet:
            check_boolean = 1
            query["$or"].append({"buffet": True})
        if check_boolean == 0:
            del query["$or"]
            
        # Filter by food country type
        if filter.food_country_types:
            if filter.food_country_types != '':
                query["food_country_type"] = {"$eq": filter.food_country_types}

        # Filter by delivery types (check the company field)
        if filter.delivery_types:
            if len(filter.delivery_types) > 1:
                query["delivery_collection.company"] = {"$in": filter.delivery_types}  # Array case
            elif len(filter.delivery_types) == 1:
                query["delivery_collection.company"] = filter.delivery_types[0]  # Single value case

        # Filter by price range (using AND logic)
        price_conditions = {}
        if filter.price_over > 0:
            price_conditions["lowest_price"] = {"$gte": filter.price_over}
        if filter.price_under > 0:
            price_conditions["highest_price"] = {"$lte": filter.price_under}

        # Combine price conditions with the main query
        if price_conditions:
            query.update(price_conditions)

        return query
    
    def get_filtered_restaurant_list(self, filter: MongoFilteredRestaurant) -> list[dict]:
        """
        Retrieve the list of restaurants that is filtered
        """
        collection_restaurant_data = self.db_manager.get_collection(
            CollectionName.RestaurantData)

        query = self.create_query_for_filtered_restaurants(filter)
        
        # Retrieve paginated results
        filtered_restaurant_docs = list(collection_restaurant_data.find(query))
        
        filtered_restaurants = []
        for filtered_restaurant_doc in filtered_restaurant_docs:
            id = filtered_restaurant_doc.pop('_id')
            filtered_restaurant = convert_value(filtered_restaurant_doc, True)
            filtered_restaurant['restaurantId'] = str(id)
            filtered_restaurants.append(filtered_restaurant)
            
        return filtered_restaurants
