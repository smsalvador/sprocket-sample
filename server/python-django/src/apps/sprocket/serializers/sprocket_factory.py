from rest_framework import serializers

from ..models.sprocket_factory import SprocketFactory, SprocketFactoryProduction


class SprocketFactorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SprocketFactory
        fields = '__all__'

class SprocketFactoryProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SprocketFactoryProduction
        fields = '__all__'
