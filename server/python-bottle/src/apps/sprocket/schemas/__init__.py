from sqlalchemy import MetaData

from .sprocket import generate_schema as generate_schema_sprocket
from .sprocket_factory import generate_schema as generate_schema_sprocket_factory

def generate_schemas(engine):
    metadata = MetaData()

    generate_schema_sprocket(metadata=metadata)
    generate_schema_sprocket_factory(metadata=metadata)

    metadata.create_all(engine)
