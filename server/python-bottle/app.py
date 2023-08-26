import bottle_sqlalchemy

from bottle import Bottle
from sqlalchemy import create_engine

from src import settings
from src.core.database import install_extensions
from src.apps.sprocket.schemas import generate_schemas
from src.apps.sprocket.fixtures import apply_fixtures
from src.apps.sprocket.views import get_views

if __name__ == '__main__':
    app_engine = create_engine(f'postgresql+psycopg2://{settings.DB_USER}:{settings.DB_PASSWORD}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}')
    app_plugin = bottle_sqlalchemy.Plugin(app_engine, keyword='db')

    install_extensions(engine=app_engine)
    generate_schemas(engine=app_engine)
    apply_fixtures(engine=app_engine)

    app = Bottle()
    app.install(app_plugin)

    get_views(app=app, settings=settings)

    app.run(host=settings.HOST, port=settings.PORT, debug=settings.DEBUG)
