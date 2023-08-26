from src.database import db

from .base import BaseModel


class SprocketModel(BaseModel):
    __tablename__ = 'sprocket'

    teeth = db.Column("teeth", db.Integer())
    pitch_diameter = db.Column("pitch_diameter", db.Float())
    outside_diameter = db.Column("outside_diameter", db.Float())
    pitch = db.Column("pitch", db.Float())
    description = db.Column("description", db.Text(), default="")
    is_active = db.Column("is_active", db.Boolean(), default=True)

    def __init__(self, teeth, pitch_diameter, outside_diameter, pitch, description, is_active, id=None, date_added=None, date_updated=None):
        self.teeth = teeth
        self.pitch_diameter = pitch_diameter
        self.outside_diameter = outside_diameter
        self.pitch = pitch
        self.description = description
        self.is_active = is_active

    def json(self):
        return {
            'id':self.id,
            'date_added':self.date_added,
            'date_updated':self.date_updated,
            'teeth':self.teeth,
            'pitch_diameter': self.pitch_diameter,
            'outside_diameter': self.outside_diameter,
            'pitch': self.pitch,
            'description': self.description,
            'is_active': self.is_active,
        }

    def __repr__(self):
        return f"SprocketModel('{self.id}', '{self.date_added}', '{self.date_updated}', {self.teeth}, {self.pitch_diameter}, {self.outside_diameter}, {self.pitch}, '{self.description}', {self.is_active})"
