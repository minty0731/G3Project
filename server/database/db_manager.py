"""
Use to handle all of the process that is linekd to the database as well as some helper function
"""
from pymongo import MongoClient
from bson.objectid import ObjectId


class DatabaseManager:
    _instance = None
    
    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(DatabaseManager, cls).__new__(cls)
        return cls._instance
    
    def __init__(self, host: str, db_name: str):
        self.client = MongoClient(host)
        self.db = self.client[db_name]

    def get_collection(self, collection_name: str):
        return self.db[collection_name]

    def get_all_docs_from_collection(self, collection_name: str):
        return list(self.get_collection(collection_name).find({}, {'_id': 0}))

    def close(self):
        self.client.close()

# Helper function to convert MongoDB documents to JSON serializable format

def serialize_document(doc):
    if isinstance(doc, list):
        for item in doc:
            item['_id'] = str(item['_id'])
    elif isinstance(doc, dict):
        doc['_id'] = str(doc['_id'])
    return doc
