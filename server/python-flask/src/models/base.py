from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from src.database import db

class BaseModel(db.Model):
    __abstract__ = True

    id = db.Column(UUID(), primary_key=True, nullable=False, server_default=func.uuid_generate_v4())
    date_added = db.Column(db.DateTime(True), nullable=True, server_default=func.now())
    date_updated = db.Column(db.DateTime(True), nullable=True, server_default=func.now())
