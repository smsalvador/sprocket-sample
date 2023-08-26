from src.database import db
from src.marshmallow import ma

from src.models.sprocket import SprocketModel
from src.models.sprocket_factory import SprocketFactoryModel, SprocketFactoryProductionModel


class SprocketSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SprocketModel
        sqla_session = db.session
        load_instance = True

class SprocketFactorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SprocketFactoryModel
        sqla_session = db.session
        load_instance = True

class SprocketFactoryProductionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SprocketFactoryProductionModel
        sqla_session = db.session
        load_instance = True
