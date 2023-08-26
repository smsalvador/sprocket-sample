import pathlib

from sqlalchemy.sql import text

directory = pathlib.Path(__file__).parent.resolve()

def apply_fixtures(engine):
    with engine.connect() as con:
        with open(f"{directory}/sprocket.sql") as file:
            query = text(file.read())
            con.execute(query)
            con.commit()
