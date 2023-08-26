from sqlalchemy.dialects.postgresql import UUID

from src.database import db

from .base import BaseModel


class SprocketFactoryModel(BaseModel):
    __tablename__ = 'sprocket_factory'

    name = db.Column("name", db.String(255))
    description = db.Column("description", db.Text(), default="")
    is_active = db.Column("is_active", db.Boolean(), default=True)

    def __init__(self, name, description, is_active):
        self.name = name
        self.description = description
        self.is_active = is_active

    def json(self):
        return {
            'id':self.id,
            'date_added':self.date_added,
            'date_updated':self.date_updated,
            'name':self.name,
            'description': self.description,
            'is_active': self.is_active,
        }

    def __repr__(self):
        return f"<procketFactoryModel('{self.id}', '{self.date_added}', '{self.date_updated}', {self.name}, '{self.description}', {self.is_active})"


class SprocketFactoryProductionModel(BaseModel):
    __tablename__ = 'sprocket_factory_production'

    factory = db.Column("factory_id", UUID(), db.ForeignKey("sprocket_factory.id"), nullable=False)
    sprocket = db.Column("sprocket_id", UUID(), db.ForeignKey("sprocket.id"), nullable=False)
    production_actual = db.Column("production_actual", db.Integer())
    production_goal = db.Column("production_goal", db.Integer())

    def __init__(self, factory, sprocket, production_actual, production_goal):
        self.factory = factory
        self.sprocket = sprocket
        self.production_actual = production_actual
        self.production_goal = production_goal

    def json(self):
        return {
            'id':self.id,
            'date_added':self.date_added,
            'date_updated':self.date_updated,
            'factory':self.factory,
            'sprocket': self.sprocket,
            'production_actual': self.production_actual,
            'production_goal': self.production_goal,
        }

    def __repr__(self):
        return f"SprocketFactoryProductionModel('{self.id}', '{self.date_added}', '{self.date_updated}', {self.factory}, {self.sprocket}, {self.production_actual}, {self.production_goal})"
