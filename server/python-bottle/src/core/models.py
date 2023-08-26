from sqlalchemy import Column, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.sql import func


class BaseModel(DeclarativeBase):
    __abstract__ = True

    id = Column(UUID(), primary_key=True, nullable=False, server_default=func.uuid_generate_v4())
    date_added = Column(DateTime(True), nullable=True, server_default=func.now())
    date_updated = Column(DateTime(True), nullable=True, server_default=func.now())
