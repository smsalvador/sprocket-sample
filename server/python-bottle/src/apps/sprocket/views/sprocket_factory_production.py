from bottle import request, response

from ..models.sprocket import SprocketModel
from ..models.sprocket_factory import SprocketFactoryModel, SprocketFactoryProductionModel
from src.tools.serializer import serialize


response.content_type = 'application/json'


def get_views(app, settings):
    @app.get(f'/{settings.URL_BASE}/sprockets-factory-production/{settings.URL_BASE_VERSION}')
    def sprockets_get(db):
        filter_by_factory = request.query.get('factory')
        filter_by_sprocket = request.query.get('sprocket')

        if (filter_by_factory and filter_by_sprocket):
            obj = db.query(SprocketFactoryProductionModel).filter(SprocketFactoryProductionModel.factory == filter_by_factory).filter(SprocketFactoryProductionModel.sprocket == filter_by_sprocket).all()
        elif (filter_by_factory and not filter_by_sprocket):
            obj = db.query(SprocketFactoryProductionModel).filter(SprocketFactoryProductionModel.factory == filter_by_factory).all()
        elif (not filter_by_factory and filter_by_sprocket):
            obj = db.query(SprocketFactoryProductionModel).filter(SprocketFactoryProductionModel.sprocket == filter_by_sprocket).all()
        elif (filter_by_factory and filter_by_sprocket):
            obj = db.query(SprocketFactoryProductionModel).all()

        obj_json = serialize(obj)

        response.content_type = 'application/json'
        return obj_json

    @app.get(f'/{settings.URL_BASE}/sprockets-factory-production/{settings.URL_BASE_VERSION}/:id')
    def sprockets_get(id, db):
        obj = db.query(SprocketFactoryProductionModel).get(id)

        if not obj:
            response.status = 404
            return

        obj_json = serialize(obj)

        response.content_type = 'application/json'
        return obj_json

    @app.post(f'/{settings.URL_BASE}/sprockets-factory-production/{settings.URL_BASE_VERSION}')
    def sprocket_post(db):
        request_json = request.json

        field_factory = request_json.get('factory')
        field_sprocket = request_json.get('sprocket')
        field_production_actual = request_json.get('production_actual')
        field_production_goal = request_json.get('production_goal')

        obj_factory = db.query(SprocketFactoryModel).get(id)
        obj_sprocket = db.query(SprocketModel).get(id)

        if not obj_factory or not obj_sprocket:
            response.status = 404
            return

        obj = SprocketFactoryProductionModel(
            factory=field_factory,
            sprocket=field_sprocket,
            production_actual=field_production_actual,
            production_goal=field_production_goal
        )
        db.add(obj)
        db.commit()
        db.refresh(obj)

        obj_json = serialize(obj)

        response.content_type = 'application/json'
        return obj_json

    @app.put(f'/{settings.URL_BASE}/sprockets-factory-production/{settings.URL_BASE_VERSION}/:id')
    def sprocket_put(id: str, db):
        obj = db.query(SprocketFactoryProductionModel).get(id)

        if not obj:
            response.status = 404
            return

        request_json = request.json

        obj.factory = request_json.get('factory', obj.factory)
        obj.sprocket = request_json.get('sprocket', obj.sprocket)
        obj.production_actual = request_json.get('production_actual', obj.production_actual)
        obj.production_goal = request_json.get('production_goal', obj.production_goal)

        db.add(obj)
        db.commit()
        db.refresh(obj)

        obj_json = serialize(obj)

        response.content_type = 'application/json'
        return obj_json

    @app.delete(f'/{settings.URL_BASE}/sprockets-factory-production/{settings.URL_BASE_VERSION}/:id')
    def sprocket_delete(id: str, db):
        obj = db.query(SprocketFactoryProductionModel).get(id)

        if not obj:
            response.status = 404
            return

        db.delete(obj)
        db.commit()

        response.content_type = 'application/json'
        return { "success": True }
