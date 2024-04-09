from setuptools import setup, find_packages

setup(
    name='my_package',
    version='0.1',
    packages=find_packages(),
    install_requires=[
        'numpy>=1.18.1',  # 例としてnumpyパッケージを依存関係として追加
        'pandas>=1.0.1',
        'flask',
        'flask_cors',
        'boto3'
        'Pillow'
    ]
)
