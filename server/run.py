from app import create_app, socketio
from flask_cors import CORS

app = create_app()
CORS(app)

@app.after_request
def add_cors_headers(response):
  response.headers["Access-Control-Allow-Origin"] = "*"
  response.headers["Access-Control-Allow-Methods"] = "GET, POST"
  response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
  return response

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=3500, debug=True)
