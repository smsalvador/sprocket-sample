import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _

class BaseModel(models.Model):
    """
    Base Model
    Defines the attributes of a puppy
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    class Meta:
        abstract = True
