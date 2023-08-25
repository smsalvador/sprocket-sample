from django.contrib import admin

from .models.sprocket import Sprocket
from .models.sprocket_factory import SprocketFactory, SprocketFactoryProduction

@admin.register(Sprocket)
class SprocketAdmin(admin.ModelAdmin):
    pass

@admin.register(SprocketFactory)
class SprocketFactoryAdmin(admin.ModelAdmin):
    pass

@admin.register(SprocketFactoryProduction)
class SprocketFactoryProductionAdmin(admin.ModelAdmin):
    pass
