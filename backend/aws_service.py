import boto3
from config import Config
from io import BytesIO

class S3Service:
    def __init__(self):
        self.client = boto3.client(
            's3',
            aws_access_key_id=Config.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY,
            region_name=Config.AWS_REGION
        )
        self.bucket_name = Config.S3_BUCKET_NAME
    
    def upload_fileobj(self, fileobj, filename):
        self.client.upload_fileobj(fileobj, self.bucket_name, filename)
        

