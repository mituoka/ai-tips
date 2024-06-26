from flask import Flask, request, make_response, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from aws_service import S3Service
from io import BytesIO
import os
from PIL import Image
import numpy as np

# テスト
app = Flask(__name__)
CORS(app)
s3_service = S3Service()

users = {
    "user1": "password1"
}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    if username in users and users[username] == password:
        return jsonify({"message": "Login successful", "authenticated": True}), 200
    else:
        return jsonify({"message": "Invalid credentials", "authenticated": False}), 400

@app.route('/api/upload_image', methods=['POST'])
def upload_file():
    print('画像解析処理開始')
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    if file :
        
        filename = secure_filename(file.filename)
        response = s3_service.upload_fileobj(file, filename) 
        return jsonify(response), 200
    else:
        return jsonify({'error': 'Invalid file format'}), 40

def image_analysis():
    print('画像解析処理開始')
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    if file and allowed_file(file.filename):
        image = Image.open(file.stream)
        image_np = np.array(image)
        average_color = np.mean(image_np, axis=(0, 1)) 
        response = {
            'average_color': {
                'red': int(average_color[0]),
                'green': int(average_color[1]),
                'blue': int(average_color[2])
            }
        }
        
        return jsonify(response), 200
    else:
        return jsonify({'error': 'Invalid file format'}), 40

if __name__ == '__main__':
    app.run(debug=True)
