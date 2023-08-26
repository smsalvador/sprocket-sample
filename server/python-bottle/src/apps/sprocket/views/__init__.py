from .sprocket import get_views as sprocket_views
from .sprocket_factory import get_views as sprocket_factory_views
from .sprocket_factory_production import get_views as sprocket_factory_production_views

def get_views(app, settings):
    sprocket_views(app=app, settings=settings)
    sprocket_factory_views(app=app, settings=settings)
    sprocket_factory_production_views(app=app, settings=settings)
