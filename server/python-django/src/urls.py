from django.contrib import admin
from django.urls import include, path
from django.conf import settings

from .apps.sprocket import urls as sprocket_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

# API Urls management

urlpatterns_api = []

for app in settings.INSTALLED_APPS:
    if app.startswith("src.apps."):
        urlpatterns_api.append(
            path('', include(sprocket_urls))
        )

urlpatterns.append(
    path('api/', include(urlpatterns_api))
)
