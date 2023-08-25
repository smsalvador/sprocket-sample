from django.db import models
from django.utils.translation import gettext_lazy as _

from src.core.models import BaseModel


class Sprocket(BaseModel):
    """
    Sprocket Model
    Defines the structure and attributes of a sprocket
    """
    teeth = models.IntegerField(_("Teeth"))
    pitch_diameter = models.DecimalField(_("Pitch diameter"), decimal_places=2, max_digits=6)
    outside_diameter = models.DecimalField(_("Outside diameter"), decimal_places=2, max_digits=6)
    pitch = models.DecimalField(_("Pitch"), decimal_places=2, max_digits=6)
    description = models.TextField(_("Description"), blank=True, default='')
    is_active = models.BooleanField(_("Active"), default=True)

    def __str__(self):
        return f'Teeth: {self.teeth}, Diameter: ({self.pitch_diameter} / {self.outside_diameter}), Pitch: {self.pitch}'

    def __repr__(self):
        return f'Sprocket(teeth={self.teeth}, pitch_diameter={self.pitch_diameter}, outside_diameter={self.outside_diameter}, pitch={self.pitch}, description="{self.description}" is_active={self.is_active})'

    def save(self, *args, **kwargs):
        if not isinstance(self.teeth, int):
            raise TypeError(_("Teeth number should be an integer"))

        if self.pitch_diameter <= 0:
            raise ValueError(_("Pitch diameter should be a decimal number higher than 0"))

        if self.outside_diameter <= 0:
            raise ValueError(_("Outside diameter should be a decimal number higher than 0"))

        if self.pitch <= 0:
            raise ValueError(_("Pitch should be a decimal number higher than 0"))

        super(Sprocket, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Sprockets"
