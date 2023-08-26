from flask import request

from src.schemas import SprocketFactoryProductionSchema
from src.repositories.sprocket_factory import SprocketFactoryProductionRepo

itemRepo = SprocketFactoryProductionRepo()
itemSchema = SprocketFactoryProductionSchema()
itemSchemaList = SprocketFactoryProductionSchema(many=True)

MESSAGE__ITEM_NOT_FOUND = "Item not found, ID: {}"

def get_all():
    return itemSchemaList.dump(itemRepo.fetchAll()), 200

def get_all_by_factory(id):
    return itemSchemaList.dump(itemRepo.fetchByFactory(id)), 200

def get_all_by_sprocket(id):
    return itemSchemaList.dump(itemRepo.fetchBySprocket(id)), 200

def get_one(id):
    item_data = itemRepo.fetchById(id)

    if item_data:
        return itemSchema.dump(item_data)

    return {'message': MESSAGE__ITEM_NOT_FOUND.format(id)}, 404

def create():
    request_json = request.get_json()

    item_data = itemSchema.load(request_json)
    itemRepo.create(item_data)

    return itemSchema.dump(item_data), 201

def update(id):
    request_json = request.get_json()

    item_data = itemRepo.fetchById(id)

    if item_data:
        item_data.teeth = request_json.get('teeth', item_data.teeth)
        item_data.pitch_diameter = request_json.get('pitch_diameter', item_data.pitch_diameter)
        item_data.outside_diameter = request_json.get('outside_diameter', item_data.outside_diameter)
        item_data.pitch = request_json.get('pitch', item_data.pitch)
        item_data.description = request_json.get('description', item_data.description)
        item_data.is_active = request_json.get('is_active', item_data.is_active)

        itemRepo.update(item_data)

        return itemSchema.dump(item_data)

    return {'message': MESSAGE__ITEM_NOT_FOUND.format(id)}, 404

def delete(id):
    item_data = itemRepo.fetchById(id)

    if item_data:
        itemRepo.delete(id)

        return {'success': True}, 200

    return {'message': MESSAGE__ITEM_NOT_FOUND.format(id)}, 404
