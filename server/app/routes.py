import time
import random
from flask import Blueprint, jsonify

bp = Blueprint('routes', __name__)

random_time = random.randint(0, 4)

@bp.route("/")
def index():
  time.sleep(random_time)
  return jsonify({ "welcome": "Welcome to Quoddex!" })
