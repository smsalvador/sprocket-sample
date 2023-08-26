from sqlalchemy import Table, Column, DateTime, Integer, Float, Text, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

def generate_schema(metadata):
    Table(
        "sprocket",
        metadata,
        Column("id", UUID(), primary_key=True, nullable=False, server_default=func.uuid_generate_v4() ),
        Column("date_added", DateTime(True), nullable=True, server_default=func.now()),
        Column("date_updated", DateTime(True), nullable=True, server_default=func.now()),
        Column("teeth", Integer()),
        Column("pitch_diameter", Float()),
        Column("outside_diameter", Float()),
        Column("pitch", Float()),
        Column("description", Text(), default=""),
        Column("is_active", Boolean(), default=True),
    )
