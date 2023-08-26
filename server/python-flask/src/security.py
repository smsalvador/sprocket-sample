import time
import six

from werkzeug.exceptions import Unauthorized
from jose import JWTError, jwt

from src import settings


def _current_timestamp() -> int:
    return int(time.time())


def generate_token(user_code):
    timestamp = _current_timestamp()
    payload = {
        "iss": settings.JWT_ISSUER,
        "iat": int(timestamp),
        "exp": int(timestamp + settings.JWT_LIFETIME_SECONDS),
        "sub": str(user_code),
    }

    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def decode_token(token):
    try:
        return jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
    except JWTError as e:
        six.raise_from(Unauthorized, e)


def get_secret(user, token_info) -> str:
    return '''
    You are user_id {user} and the secret is 'wbevuec'.
    Decoded token claims: {token_info}.
    '''.format(user=user, token_info=token_info)

