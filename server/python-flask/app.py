import connexion

from src import settings
from src.marshmallow import ma
from src.database import db, init_database


connexion_app = connexion.App(__name__, specification_dir="./")
connexion_app.add_api("openapi.yml")

app = connexion_app.app

app.config['SQLALCHEMY_DATABASE_URI'] = settings.DB_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True

@app.before_first_request
def _init_database():
    init_database()

if __name__ == "__main__":
    db.init_app(app)
    ma.init_app(app)
    app.run(host=settings.HOST, port=settings.PORT, debug=settings.DEBUG)
