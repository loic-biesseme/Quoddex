import pymongo

#. Connexion à la base de données
db_client = pymongo.MongoClient(host="localhost", port=27017)
db = db_client.QuoddexApp

#. Récupération des collections
cards_collection = db['cards']
users_collection = db['users']
levels_collection = db['levels']
subjects_collection = db['subjects']
complexity_collection = db['complexity']
downloaders_collection = db['downloaders']
pinners_collection = db['pinners']
friends_collection = db['friends']

#. Création des index
cards_collection.create_index("users_id")
cards_collection.create_index("level_id")
cards_collection.create_index("subject_id")

downloaders_collection.create_index("cards_id")
downloaders_collection.create_index("users_id")

pinners_collection.create_index("cards_id")
pinners_collection.create_index("users_id")

friends_collection.create_index("users_id")
friends_collection.create_index("friend")