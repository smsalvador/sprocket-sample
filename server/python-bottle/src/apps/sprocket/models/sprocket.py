from sqlalchemy import Column, Integer, Float, Text, Boolean

from src.core.models import BaseModel


class SprocketModel(BaseModel):
    __tablename__ = 'sprocket'

    teeth = Column("teeth", Integer())
    pitch_diameter = Column("pitch_diameter", Float())
    outside_diameter = Column("outside_diameter", Float())
    pitch = Column("pitch", Float())
    description = Column("description", Text(), default="")
    is_active = Column("is_active", Boolean(), default=True)

    def __init__(self, teeth, pitch_diameter, outside_diameter, pitch, description, is_active):
        self.teeth = teeth
        self.pitch_diameter = pitch_diameter
        self.outside_diameter = outside_diameter
        self.pitch = pitch
        self.description = description
        self.is_active = is_active

    def __repr__(self):
        return f"<SprocketModel('{self.id}', '{self.date_added}', '{self.date_updated}', {self.teeth}, {self.pitch_diameter}, {self.outside_diameter}, {self.pitch}, '{self.description}', {self.is_active})>"
