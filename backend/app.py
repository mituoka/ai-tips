from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route('/api/test', methods=['GET'])
def greet():
    response = {"message": "Hello from Flask!"}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
