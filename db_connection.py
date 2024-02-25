from pymongo import MongoClient

url = 'mongodb://localhost:27017'
client = MongoClient("mongodb://localhost:27017/")
db = client.GameOnline