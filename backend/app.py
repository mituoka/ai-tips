from flask import Flask, request, make_response, send_file
import boto3
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
from PIL import Image
import io

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

@app.route('/api/upload_image', methods=['POST'])
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


@app.route('/api/download_image', methods=['GET'])
def download_file():
    print('ファイルダウンロード開始')
    filename = request.args.get('filename')  

    if not filename:
        return 'Filename is required', 400

    filename_secure = secure_filename(filename)

    temp_file_path = os.path.join('/tmp', filename_secure)

    try:
        s3.download_file('ai-tips-backet', filename_secure, temp_file_path)

        # 画像をリサイズ
        img = Image.open(temp_file_path)
        img = img.resize((600, 400))  # 例として幅600px、高さ400pxにリサイズ
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format=img.format)
        img_byte_arr = img_byte_arr.getvalue()

        # リサイズした画像をクライアントに送信
        return send_file(
            io.BytesIO(img_byte_arr),
            mimetype='image/jpeg',  # 適宜変更してください
            as_attachment=True,
            download_name=filename_secure
        )

    except Exception as e:
        print(e)
        return 'Error downloading file from S3', 500


if __name__ == '__main__':
    app.run(debug=True)
