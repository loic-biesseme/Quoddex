import time
import random
from flask import Blueprint, request, jsonify
from .database import db, friends_collection, users_collection

bp = Blueprint('friends', __name__)

random_time = random.randint(0, 3)

@bp.route("/get_friends", methods=["POST"])
def get_friends():
    print("STARRRRRRRRRRRRRRRRRRRRRRRRRRRRT")
    time.sleep(random_time)
    data = request.get_json()
    current_uid = data.get("current_uid", "@username")
    limit = data.get("limit", 6)  #. Limite par défaut à 10 documents
    page = data.get("page", 1)
    skip = (page - 1) * limit

    #. Pipeline d'agrégation pour récupérer les amis
    pipeline = [
        {
            "$match": {
                "$or": [
                    {"friend": current_uid},
                    {"users_id": current_uid}
                ]
            }
        },
        {
            "$project": {
                "friend": {
                    "$cond": {
                        "if": {"$eq": ["$friend", current_uid]},
                        "then": "$users_id",
                        "else": "$friend"
                    }
                }
            }
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "friend",
                "foreignField": "username",
                "as": "user_info"
            }
        },
        {
            "$unwind": "$user_info"
        },
        {
            "$project": {
                "_id": "$user_info._id",
                "username": "$user_info.username",
                "firstname": "$user_info.firstname",
                "lastname": "$user_info.lastname"
            }
        },
        {
            "$skip": skip
        },
        {
            "$limit": limit
        }
    ]

    #. Exécution du pipeline d'agrégation pour récupérer les amis
    friends = list(friends_collection.aggregate(pipeline))

    #. Si aucun ami n'est trouvé, récupérer un ensemble aléatoire d'utilisateurs sans critère de sélection
    if not friends:
        fallback_pipeline = [
            {
                "$sample": {"size": limit}
            },
            {
                "$lookup": {
                    "from": "users",
                    "localField": "users_id",
                    "foreignField": "username",
                    "as": "user_info"
                }
            },
            {
                "$unwind": "$user_info"
            },
            {
                "$project": {
                    "_id": "$user_info._id",
                    "username": "$user_info.username",
                    "firstname": "$user_info.firstname",
                    "lastname": "$user_info.lastname"
                }
            }
        ]
        friends = list(friends_collection.aggregate(fallback_pipeline))

    random.shuffle(friends)
    print("ENNNNNNNNNNNNNNNNNNNNNNNNNNND")
    return jsonify({"friends": friends})
