import pathlib
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text

directory = pathlib.Path(__file__).parent.resolve()

db = SQLAlchemy()

def init_database():
    with db.engine.connect() as con:
        query = text('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        con.execute(query)
        con.commit()

    db.create_all()

    with db.engine.connect() as con:
        with open(f"{directory}/database.sql") as file:
            query = text(file.read())
            con.execute(query)
            con.commit()
