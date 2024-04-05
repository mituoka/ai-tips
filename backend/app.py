from flask import Flask, request, make_response
import boto3
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os  # osモジュールをインポート

app = Flask(__name__)
CORS(app)

# 環境変数から設定を読み込む
aws_access_key_id = os.environ.get('AWS_ACCESS_KEY_ID')
aws_secret_access_key = os.environ.get('AWS_SECRET_ACCESS_KEY')
region_name = os.environ.get('AWS_REGION')

# S3設定
s3 = boto3.client(
    's3',
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=region_name
)

@app.route('/upload', methods=['POST'])
def upload_file():
    print('ファイルアップロード開始')
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    if file:
        filename = secure_filename(file.filename)
        # ファイルをS3にアップロード
        s3.upload_fileobj(file, 'ai-tips-backet', filename)
        response = make_response('File uploaded successfully', 200)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        return response

if __name__ == '__main__':
    app.run(debug=True)
