from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions

from .models.sprocket import Sprocket
from .models.sprocket_factory import SprocketFactory, SprocketFactoryProduction

from .serializers.sprocket import SprocketSerializer
from .serializers.sprocket_factory import SprocketFactorySerializer, SprocketFactoryProductionSerializer


class SprocketViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows sprockets to be viewed or edited.
    """
    queryset = Sprocket.objects.all().order_by('-created_at')
    serializer_class = SprocketSerializer
    permission_classes = [permissions.IsAuthenticated]

class SprocketFactoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows sprocket factories to be viewed or edited.
    """
    queryset = SprocketFactory.objects.all().order_by('-created_at')
    serializer_class = SprocketFactorySerializer
    permission_classes = [permissions.IsAuthenticated]

class SprocketFactoryProductionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows sprockets production to be viewed or edited.
    """
    # queryset = SprocketFactoryProduction.objects.all().order_by('-created_at')
    queryset = SprocketFactoryProduction.objects.all()
    serializer_class = SprocketFactoryProductionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        factory_id = self.request.query_params.get('factory_id')
        sprocket_id = self.request.query_params.get('sprocket_id')

        if factory_id and sprocket_id:
            queryset = self.queryset.filter(factory__id=factory_id, sprocket__id=sprocket_id)
        elif factory_id and not sprocket_id:
            queryset = self.queryset.filter(factory__id=factory_id)
        elif not factory_id and sprocket_id:
            queryset = self.queryset.filter(sprocket__id=sprocket_id)
        else:
            queryset = self.queryset

        return queryset.order_by('-created_at')
