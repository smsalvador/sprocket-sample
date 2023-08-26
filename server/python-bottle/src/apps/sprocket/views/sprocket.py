from bottle import request, response

from ..models.sprocket import SprocketModel
from src.tools.serializer import serialize


response.content_type = 'application/json'


def get_views(app, settings):
    @app.get(f'/{settings.URL_BASE}/sprockets/{settings.URL_BASE_VERSION}')
    def sprockets_get(db):
        obj = db.query(SprocketModel).all()
        obj_json = serialize(obj)

        response.content_type = 'application/json'
        return obj_json

    @app.get(f'/{settings.URL_BASE}/sprockets/{settings.URL_BASE_VERSION}/:id')
    def sprockets_get(id, db):
        obj = db.query(SprocketModel).get(id)

        if not obj:
            response.status = 404
            return

        obj_json = serialize(obj)

        response.content_type = 'application/json'
        return obj_json

    @app.post(f'/{settings.URL_BASE}/sprockets/{settings.URL_BASE_VERSION}')
    def sprocket_post(db):
        request_json = request.json

        field_teeth = request_json.get('teeth')
        field_pitch_diameter = request_json.get('pitch_diameter')
        field_outside_diameter = request_json.get('outside_diameter')
        field_pitch = request_json.get('pitch')
        field_description = request_json.get('description')
        field_is_active = request_json.get('is_active')

        obj = SprocketModel(
            teeth=field_teeth,
            pitch_diameter=field_pitch_diameter,
            outside_diameter=field_outside_diameter,
            pitch=field_pitch,
            description=field_description,
            is_active=field_is_active
        )
        db.add(obj)
        db.commit()
        db.refresh(obj)

        obj_json = serialize(obj)

        response.content_type = 'application/json'
        return obj_json

    @app.put(f'/{settings.URL_BASE}/sprockets/{settings.URL_BASE_VERSION}/:id')
    def sprocket_put(id: str, db):
        obj = db.query(SprocketModel).get(id)

        if not obj:
            response.status = 404
            return

        request_json = request.json

        obj.teeth = request_json.get('teeth', obj.teeth)
        obj.pitch_diameter = request_json.get('pitch_diameter', obj.pitch_diameter)
        obj.outside_diameter = request_json.get('outside_diameter', obj.outside_diameter)
        obj.pitch = request_json.get('pitch', obj.pitch)
        obj.description = request_json.get('description', obj.description)
        obj.is_active = request_json.get('is_active', obj.is_active)

        db.add(obj)
        db.commit()
        db.refresh(obj)

        obj_json = serialize(obj)

        response.content_type = 'application/json'
        return obj_json

    @app.delete(f'/{settings.URL_BASE}/sprockets/{settings.URL_BASE_VERSION}/:id')
    def sprocket_delete(id: str, db):
        obj = db.query(SprocketModel).get(id)

        if not obj:
            response.status = 404
            return

        db.delete(obj)
        db.commit()

        response.content_type = 'application/json'
        return { "success": True }
