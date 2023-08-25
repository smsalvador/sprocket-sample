from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('sprockets/v1', views.SprocketViewSet)
router.register('sprocket-factories/v1', views.SprocketFactoryViewSet)
router.register('sprocket-production/v1', views.SprocketFactoryProductionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
