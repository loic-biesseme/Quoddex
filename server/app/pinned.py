import time
import random
import pandas as pd
from flask import Blueprint, request, jsonify
from .database import db, cards_collection, pinners_collection, users_collection, levels_collection, subjects_collection, complexity_collection

bp = Blueprint('pinned', __name__)

random_time = random.randint(0, 3)

@bp.route("/get_pinned", methods=["POST"])
def get_pinned():
    time.sleep(random_time)
    data = request.get_json()
    current_uid = data.get("current_uid", "@username")
    friends = data.get("friends", [])
    extended_friends = friends + [current_uid]
    limit = data.get("limit", 10)  #. Limite par défaut à 10 documents
    page = data.get("page", 1)
    skip = (page - 1) * limit
    
    #. Recherchede tous les `cards_id` épinglés par l'utilisateur `current_uid`
    pinned_card_ids = list(pinners_collection.find(
        {"users_id": current_uid},
        {"cards_id": 1, "_id": 0}
    ))
    # .Extraction uniquement les `cards_id` dans un tableau
    pinned_card_ids = [p["cards_id"] for p in pinned_card_ids]
    
    #. Créer le pipeline de recherche initial

    match_stage = {
        "$match": {
            "_id": {"$in": [key for key in pinned_card_ids]}  #. Insensible à la casse
        }
    }

    #. Pipeline d'agrégation pour joindre les collections `users`, `levels`, `subjects`, et `complexity`
    pipeline = [
        #. Étape 1 : Filtrage des cartes
        match_stage,

        #. Étape 2 : Jointure avec la collection `users`
        {
            "$lookup": {
                "from": "users",  #. Collection à joindre
                "localField": "users_id",  #. Champ dans `cards`
                "foreignField": "username",  #. Champ dans `users`
                "as": "user_info"  #. Nom du champ où les résultats de la jointure seront stockés
            }
        },
        #. Déstructuration du champ `user_info` pour avoir un objet au lieu d'un tableau
        {"$unwind": {"path": "$user_info", "preserveNullAndEmptyArrays": True}},

        #. Étape 3 : Jointure avec la collection `levels`
        {
            "$lookup": {
                "from": "levels",
                "localField": "level_id",
                "foreignField": "_id",
                "as": "level_info"
            }
        },
        {"$unwind": {"path": "$level_info", "preserveNullAndEmptyArrays": True}},

        #. Étape 4 : Jointure avec la collection `subjects`
        {
            "$lookup": {
                "from": "subjects",
                "localField": "subject_id",
                "foreignField": "_id",
                "as": "subject_info"
            }
        },
        {"$unwind": {"path": "$subject_info", "preserveNullAndEmptyArrays": True}},

        #. Étape 5 : Jointure avec la collection `complexity`
        {
            "$lookup": {
                "from": "complexity",
                "localField": "complexity_id",
                "foreignField": "_id",
                "as": "complexity_info"
            }
        },
        {"$unwind": {"path": "$complexity_info", "preserveNullAndEmptyArrays": True}},

        {
            "$lookup": {
                "from": "players_and_downloaders",
                "localField": "_id",
                "foreignField": "cards_id",
                "as": "players_and_downloaders"
            }
        },

        #. Étape 6 : Jointure avec la collection `players_and_downloaders`
        {
            "$lookup": {
                "from": "players_and_downloaders",
                "localField": "_id",
                "foreignField": "cards_id",
                "as": "players_and_downloaders"
            }
        },
        {
            "$addFields": {
                #. Ajoute un champ "players_and_downloaders_info" qui contient la liste combinée des "players_and_downloaders"
                "players_and_downloaders_info": {
                    "$slice": [
                        {
                            "$let": {
                                "vars": {
                                    #. Vérifie si l'username current_uid est présent dans les downloaders
                                    "current_user_in_downloaders": {
                                        "$filter": {
                                            "input": "$players_and_downloaders",
                                            "as": "downloader",
                                            "cond": { "$eq": ["$$downloader.users_id", current_uid] }
                                        }
                                    },
                                    #. Récupère les amis présents dans les downloaders
                                    "friends_list": {
                                        "$map": {
                                            "input": {
                                                "$filter": {
                                                    "input": "$players_and_downloaders",
                                                    "as": "downloader",
                                                    "cond": { "$in": ["$$downloader.users_id", friends] }
                                                }
                                            },
                                            "as": "filtered_downloader",
                                            "in": { "username": "$$filtered_downloader.users_id" }
                                        }
                                    },
                                    #. Récupère un maximum de 3 downloaders qui ne sont pas des amis
                                    "non_friends_list": {
                                        "$slice": [
                                            {
                                                "$map": {
                                                    "input": {
                                                        "$filter": {
                                                            "input": "$players_and_downloaders",
                                                            "as": "downloader",
                                                            "cond": { "$not": { "$in": ["$$downloader.users_id", extended_friends] } }
                                                        }
                                                    },
                                                    "as": "non_friend_downloader",
                                                    "in": { "username": "$$non_friend_downloader.users_id" }
                                                }
                                            },
                                            3
                                        ]
                                    }
                                },
                                "in": {
                                    #. Combine current_user (s'il est présent), les amis, et les non-amis
                                    "$concatArrays": [
                                        {
                                            "$cond": {
                                                "if": { "$gt": [{ "$size": "$$current_user_in_downloaders" }, 0] },
                                                "then": [{ "username": current_uid }],
                                                "else": []
                                            }
                                        },
                                        "$$friends_list",
                                        "$$non_friends_list"
                                    ]
                                }
                            }
                        },
                        3  #. Limite le nombre total de résultats à un maximum de 3
                    ]
                },
                #. Ajoute un champ "total_players_and_downloaders" pour stocker le nombre total de players_and_downloaders.
                "total_players_and_downloaders": { "$size": "$players_and_downloaders" }
            }
        },

        #. Étape 7 : Jointure avec la collection `pinners`
        {
            "$lookup": {
                "from": "pinners",
                "localField": "_id",
                "foreignField": "cards_id",
                "as": "pinners"
            }
        },
        {
            "$addFields": {
                #. Vérifier si l'utilisateur actuel a épinglé la carte.
                "has_pinned": {
                    "$gt": [
                        {
                            "$size": {
                                "$filter": {
                                    "input": "$pinners",
                                    "as": "pinner",
                                    #. Vérifie si l'utilisateur actuel est dans la liste des pinners.
                                    "cond": {"$eq": ["$$pinner.users_id", current_uid]}
                                }
                            }
                        },
                        0
                    ]
                },
                #. Compter le nombre total d'épinglements de la carte.
                "total_pinners": {"$size": "$pinners"}
            }
        },

        #. Étape 8 : Projetion des champs à renvoyer au client
        {
            "$project": {
                "id": {"$toString": "$_id"},
                "title": 1,
                "created_on": 1,
                "corrected": 1,
                "items": 1,
                "type": 1,
                "keywords": 1,
                "comment": 1,
                "user": {
                    "username": "$user_info.username",
                    "firstname": "$user_info.firstname",
                    "lastname": "$user_info.lastname"
                },
                "level": {
                    "fullname": "$level_info.fullname"
                },
                "subject": {
                    "_id": "$subject_info._id",
                    "shortname": "$subject_info.shortname",
                    "fullname": "$subject_info.fullname"
                },
                "complexity": {
                    "_id": "$complexity_info._id",
                    "value": "$complexity_info.value"
                },
                "players_and_downloaders_info": 1,
                "total_players_and_downloaders": 1,
                "has_pinned": 1,
                "total_pinners": 1
            }
        },

        #. Étape 9 : Pagination des résultats
        {"$skip": skip},
        {"$limit": limit}
    ]

    #. Exécution du pipeline d'agrégation
    cards = list(cards_collection.aggregate(pipeline))

    return jsonify({"cards": cards})
