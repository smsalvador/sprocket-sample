from sqlalchemy import Table, Column, DateTime, Integer, String, Text, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

def generate_schema(metadata):
    Table(
        "sprocket_factory",
        metadata,
        Column("id", UUID(), primary_key=True, nullable=False, server_default=func.uuid_generate_v4() ),
        Column("date_added", DateTime(True), nullable=True, server_default=func.now()),
        Column("date_updated", DateTime(True), nullable=True, server_default=func.now()),
        Column("name", String(255)),
        Column("description", Text(), default=""),
        Column("is_active", Boolean(), default=True),
    )

    Table(
        "sprocket_factory_production",
        metadata,
        Column("id", UUID(), primary_key=True, nullable=False, server_default=func.uuid_generate_v4() ),
        Column("date_added", DateTime(True), nullable=True, server_default=func.now()),
        Column("date_updated", DateTime(True), nullable=True, server_default=func.now()),
        Column("factory_id", UUID(), ForeignKey("sprocket_factory.id"), nullable=False),
        Column("sprocket_id", UUID(), ForeignKey("sprocket.id"), nullable=False),
        Column("production_actual", Integer()),
        Column("production_goal", Integer()),
    )
