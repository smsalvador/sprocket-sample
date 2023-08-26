from sqlalchemy import Column, Integer, Text, String, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from src.core.models import BaseModel


class SprocketFactoryModel(BaseModel):
    __tablename__ = 'sprocket_factory'

    name = Column("name", String(255))
    description = Column("description", Text(), default="")
    is_active = Column("is_active", Boolean(), default=True)

    def __init__(self, name, description, is_active):
        self.name = name
        self.description = description
        self.is_active = is_active

    def __repr__(self):
        return f"<SprocketFactoryModel('{self.id}', '{self.date_added}', '{self.date_updated}', {self.name}, '{self.description}', {self.is_active})>"


class SprocketFactoryProductionModel(BaseModel):
    __tablename__ = 'sprocket_factory_production'

    factory = Column("factory_id", UUID(), ForeignKey("sprocket_factory.id"), nullable=False)
    sprocket = Column("sprocket_id", UUID(), ForeignKey("sprocket.id"), nullable=False)
    production_actual = Column("production_actual", Integer())
    production_goal = Column("production_goal", Integer())

    def __init__(self, factory, sprocket, production_actual, production_goal):
        self.factory = factory
        self.sprocket = sprocket
        self.production_actual = production_actual
        self.production_goal = production_goal

    def __repr__(self):
        return f"<SprocketFactoryProductionModel('{self.id}', '{self.date_added}', '{self.date_updated}', {self.factory}, {self.sprocket}, {self.production_actual}, {self.production_goal})>"
