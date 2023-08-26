import os
from dotenv import load_dotenv

load_dotenv()

DEBUG = True if os.environ.get('DEBUG') == "true" else False

HOST = os.environ.get('HOST', '0.0.0.0')
PORT = int(os.environ.get('PORT', 8080))

URL_BASE = 'api'
URL_BASE_VERSION = 'v1'

INSTALLED_APPS = [
    'sprocket'
]

DB_NAME=os.environ.get('DB_NAME', 'python-bottle')
DB_USER=os.environ.get('DB_USER', 'postgres')
DB_PASSWORD=os.environ.get('DB_PASSWORD', 'postgres')
DB_HOST=os.environ.get('DB_HOST', '127.0.0.1')
DB_PORT=os.environ.get('DB_PORT', '5432')
