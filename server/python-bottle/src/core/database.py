import pathlib

from sqlalchemy.sql import text

directory = pathlib.Path(__file__).parent.resolve()

def install_extensions(engine):
    with engine.connect() as con:
        query = text('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        con.execute(query)
        con.commit()
