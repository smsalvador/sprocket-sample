from src.database import db
from src.models.sprocket_factory import SprocketFactoryModel, SprocketFactoryProductionModel


class SprocketFactoryRepo:
    def fetchAll(self):
        return db.session.query(SprocketFactoryModel).all()

    def fetchById(self,_id):
        return db.session.query(SprocketFactoryModel).filter_by(id=_id).first()

    def create(self, item):
        db.session.add(item)
        db.session.commit()

    def update(self,item_data):
        db.session.merge(item_data)
        db.session.commit()

    def delete(self,_id):
        item= db.session.query(SprocketFactoryModel).filter_by(id=_id).first()
        db.session.delete(item)
        db.session.commit()


class SprocketFactoryProductionRepo:
    def fetchAll(self):
        return db.session.query(SprocketFactoryProductionModel).all()

    def fetchByFactory(self,_id):
        return db.session.query(SprocketFactoryModel).filter_by(factory=_id).all()

    def fetchBySprocket(self,_id):
        return db.session.query(SprocketFactoryModel).filter_by(sprocket=_id).all()

    def fetchById(self,_id):
        return db.session.query(SprocketFactoryProductionModel).filter_by(id=_id).first()

    def create(self, item):
        db.session.add(item)
        db.session.commit()

    def update(self,item_data):
        db.session.merge(item_data)
        db.session.commit()

    def delete(self,_id):
        item= db.session.query(SprocketModel).filter_by(id=_id).first()
        db.session.delete(item)
        db.session.commit()
