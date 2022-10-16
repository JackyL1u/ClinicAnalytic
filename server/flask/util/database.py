import pymongo
from decouple import config

try:
    client = pymongo.MongoClient(config('MONGODB'))
    database = client['HackTheValley']
except Exception as err:
    print(err)
    client = None
