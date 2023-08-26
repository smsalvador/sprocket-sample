import os
from dotenv import load_dotenv

load_dotenv()

DEBUG = True if os.environ.get('DEBUG') == "true" else False

DB_NAME = os.environ.get('DB_NAME', 'python-flask')
DB_USER = os.environ.get('DB_USER', 'postgres')
DB_PASSWORD = os.environ.get('DB_PASSWORD', 'postgres')
DB_HOST = os.environ.get('DB_HOST', '127.0.0.1')
DB_PORT = os.environ.get('DB_PORT', '5432')
DB_URL = f'postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'

HOST = os.environ.get('HOST', '0.0.0.0')
PORT = int(os.environ.get('PORT', 8080))

JWT_ISSUER = os.environ.get('JWT_ISSUER', 'sample.sprocket.connexion')
JWT_SECRET = os.environ.get('JWT_SECRET')
JWT_LIFETIME_SECONDS = int(os.environ.get('JWT_LIFETIME_SECONDS', 600))
JWT_ALGORITHM = 'HS256'
