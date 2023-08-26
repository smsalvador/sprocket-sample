from src.database import db
from src.models.sprocket import SprocketModel


class SprocketRepo:
    def fetchAll(self):
        return db.session.query(SprocketModel).all()

    def fetchById(self,_id):
        return db.session.query(SprocketModel).filter_by(id=_id).first()

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
