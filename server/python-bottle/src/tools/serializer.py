import json

class SQLAlchemySerializer(json.JSONEncoder):

    def default(self, obj):
        fields = {}
        for field in [f for f in dir(obj) if not f.startswith('_') and f != 'metadata' and f != 'registry']:
            data = obj.__getattribute__(field)
            try:
                json.dumps(data)
                fields[field] = data
            except TypeError:
                fields[field] = str(data)
        return fields

def serialize(obj):
    return json.dumps(obj, cls=SQLAlchemySerializer)
