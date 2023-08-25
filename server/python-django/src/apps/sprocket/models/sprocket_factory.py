from django.db import models
from django.utils.translation import gettext_lazy as _

from src.core.models import BaseModel
from src.apps.sprocket.models.sprocket import Sprocket

class SprocketFactory(BaseModel):
    """
    Sprocket Factory Model
    Defines the structure and attributes of a sprocket factory
    """
    name = models.CharField(_("Factory name"), max_length=255)
    description = models.TextField(_("Description"), blank=True, default='')
    is_active = models.BooleanField(_("Active"), default=True)

    def __str__(self):
        return self.name

    def __repr__(self):
        return f'SprocketFactory(name={self.name}, description={self.description}, is_active={self.is_active})'

    class Meta:
        verbose_name_plural = "Sprocket Factories"


class SprocketFactoryProduction(BaseModel):
    """
    Sprocket Factory Production Model
    Defines the production of multiple sprocket types per factory
    """
    factory = models.ForeignKey(SprocketFactory, verbose_name=_("Factory"), on_delete=models.CASCADE)
    sprocket = models.ForeignKey(Sprocket, verbose_name=_("Sprocket"), on_delete=models.CASCADE)
    production_actual = models.IntegerField(_("Actual production"))
    production_goal = models.IntegerField(_("Goal production"))

    def __str__(self):
        return f'{self.factory}, Producing: {self.sprocket}, ({self.production_actual} of {self.production_goal})'

    def __repr__(self):
        return f'SprocketFactoryProduction(factory={self.factory.id}, sprocket={self.sprocket.id}, production_actual={self.production_actual}, production_goal={self.production_goal})'

    class Meta:
        verbose_name_plural = "Sprocket Production"
