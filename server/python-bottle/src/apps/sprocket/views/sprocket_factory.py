from bottle import request, response

from ..models.sprocket_factory import SprocketFactoryModel
from src.tools.serializer import serialize


response.content_type = 'application/json'


def get_views(app, settings):
    @app.get(f'/{settings.URL_BASE}/sprocket-factory/{settings.URL_BASE_VERSION}')
    def sprockets_get(db):
        obj = db.query(SprocketFactoryModel).all()
        obj_json = serialize(obj)

        response.content_type = 'application/json'
        return obj_json

    @app.get(f'/{settings.URL_BASE}/sprockets-factory/{settings.URL_BASE_VERSION}/:id')
    def sprockets_get(id, db):
        obj = db.query(SprocketFactoryModel).get(id)

        if not obj:
            response.status = 404
            return

        obj_json = serialize(obj)

        response.content_type = 'application/json'
        return obj_json

    @app.post(f'/{settings.URL_BASE}/sprockets-factory/{settings.URL_BASE_VERSION}')
    def sprocket_post(db):
        request_json = request.json

        field_name = request_json.get('name')
        field_description = request_json.get('description')
        field_is_active = request_json.get('is_active')

        obj = SprocketFactoryModel(
            name=field_name,
            description=field_description,
            is_active=field_is_active
        )
        db.add(obj)
        db.commit()
        db.refresh(obj)

        obj_json = serialize(obj)

        response.content_type = 'application/json'
        return obj_json

    @app.put(f'/{settings.URL_BASE}/sprockets-factory/{settings.URL_BASE_VERSION}/:id')
    def sprocket_put(id: str, db):
        obj = db.query(SprocketFactoryModel).get(id)

        if not obj:
            response.status = 404
            return

        request_json = request.json

        obj.name = request_json.get('name', obj.teeth)
        obj.description = request_json.get('description', obj.description)
        obj.is_active = request_json.get('is_active', obj.is_active)

        db.add(obj)
        db.commit()
        db.refresh(obj)

        obj_json = serialize(obj)

        response.content_type = 'application/json'
        return obj_json

    @app.delete(f'/{settings.URL_BASE}/sprockets-factory/{settings.URL_BASE_VERSION}/:id')
    def sprocket_delete(id: str, db):
        obj = db.query(SprocketFactoryModel).get(id)

        if not obj:
            response.status = 404
            return

        db.delete(obj)
        db.commit()

        response.content_type = 'application/json'
        return { "success": True }
