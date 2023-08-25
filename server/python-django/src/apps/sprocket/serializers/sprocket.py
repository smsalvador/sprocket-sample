from rest_framework import serializers
from ..models.sprocket import Sprocket


class SprocketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sprocket
        fields = '__all__'
