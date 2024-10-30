from flask import Flask
from flask_socketio import SocketIO
from .database import db
from .constants import async_mode

socketio = SocketIO()

app = Flask(__name__)
socketio = SocketIO(app, async_mode=async_mode, logger=True, engineio_logger=True)  #. noqa E402

def create_app():
  app = Flask(__name__)
  socketio.init_app(app, async_mode=async_mode, logger=True, engineio_logger=True)
  
  with app.app_context():
    from . import routes, cards, pinned, friends
    app.register_blueprint(routes.bp)
    app.register_blueprint(cards.bp)
    app.register_blueprint(pinned.bp)
    app.register_blueprint(friends.bp)
    
  return app
