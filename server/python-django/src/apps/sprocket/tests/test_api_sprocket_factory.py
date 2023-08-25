import json

from django.contrib.auth.models import User
from django.test import TestCase, Client
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

from src.core.tools import UUIDEncoder
from ..models.sprocket import Sprocket
from ..models.sprocket_factory import SprocketFactory, SprocketFactoryProduction
from ..serializers.sprocket_factory import SprocketFactorySerializer, SprocketFactoryProductionSerializer


class SprocketFactoryTest(TestCase):
    """ Test module for Sprocket Factory model """

    def setUp(self):
        sprocket_factory = SprocketFactory.objects.create(
            name = "Test Factory",
            description = "",
            is_active = True,
        )

        self.sprocket_factory_id = sprocket_factory.id
        self.client = Client()
        self.test_user = User.objects.create_user(
            username="test_user",
            password="test_password",
        )

        self.api_client = APIClient()
        self.api_client.login(username='test_user', password='test_password')

    def test_get_all(self):
        response = self.api_client.get(reverse('sprocketfactory-list'))
        response_items = response.json().get('results')

        sprockets = SprocketFactory.objects.all()
        sprockets_items = json.loads(json.dumps(SprocketFactorySerializer(sprockets, many=True).data))

        self.assertEqual(response_items, sprockets_items)

    def test_get_one(self):
        response = self.api_client.get(reverse('sprocketfactory-detail', kwargs={'pk': self.sprocket_factory_id}))
        response_item = response.json()

        sprocket = SprocketFactory.objects.get(id=self.sprocket_factory_id)
        sprocket_item = json.loads(json.dumps(SprocketFactorySerializer(sprocket).data))

        self.assertEqual(response_item, sprocket_item)

    def test_add_one(self):
        response_data = {
            'name': "New Test Factory",
            'description': "",
            'is_active': True,
        }
        response = self.api_client.post(reverse('sprocketfactory-list'), response_data)
        response_item = response.json()

        sprocket_factory = SprocketFactory.objects.get(id=response_item.get('id'))
        sprocket_factory_item = json.loads(json.dumps(SprocketFactorySerializer(sprocket_factory).data))

        self.assertEqual(response_item, sprocket_factory_item)

    def test_update_one(self):
        sprocket_factory = SprocketFactory.objects.get(id=self.sprocket_factory_id)
        sprocket_factory_item = json.loads(json.dumps(SprocketFactorySerializer(sprocket_factory).data))

        response_data = {
            'name': "New Test Factory",
            'description': "",
            'is_active': True,
        }
        response = self.api_client.put(reverse('sprocketfactory-detail', kwargs={'pk': self.sprocket_factory_id}), response_data)
        response_item = response.json()

        self.assertNotEqual(response_item, sprocket_factory_item)

    def test_delete_one(self):
        response_data = {
            'name': "New Test Factory",
            'description': "",
            'is_active': True,
        }
        response = self.api_client.post(reverse('sprocketfactory-list'), response_data)
        response_item = response.json()

        self.api_client.delete(reverse('sprocketfactory-detail', kwargs={'pk': response_item.get('id')}))

        with self.assertRaises(SprocketFactory.DoesNotExist):
            SprocketFactory.objects.get(id=response_item.get('id'))

    def test_auth(self):
        self.api_client.logout()

        response = self.api_client.get(reverse('sprocketfactory-list'))

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class SprocketFactoryProductionTest(TestCase):
    """ Test module for Sprocket Factory Production model """

    def setUp(self):
        sprocket = Sprocket.objects.create(
            teeth = 5,
            pitch_diameter = 5.5,
            outside_diameter = 6,
            pitch = 1,
            description = "",
            is_active = True,
        )
        sprocket_factory = SprocketFactory.objects.create(
            name = "Test Factory",
            description = "",
            is_active = True,
        )
        sprocket_factory_production = SprocketFactoryProduction.objects.create(
            factory = sprocket_factory,
            sprocket = sprocket,
            production_actual = 30,
            production_goal = 31,
        )
        self.sprocket_id = sprocket.id
        self.sprocket_factory_id = sprocket_factory.id
        self.sprocket_factory_production_id = sprocket_factory_production.id
        self.client = Client()
        self.test_user = User.objects.create_user(
            username="test_user",
            password="test_password",
        )

        self.api_client = APIClient()
        self.api_client.login(username='test_user', password='test_password')

    def test_get_all(self):
        response = self.api_client.get(reverse('sprocketfactoryproduction-list'))
        response_items = response.json().get('results')

        sprockets_production = SprocketFactoryProduction.objects.all()
        sprockets_production_items = json.loads(json.dumps(SprocketFactoryProductionSerializer(sprockets_production, many=True).data, cls=UUIDEncoder))

        self.assertEqual(response_items, sprockets_production_items)

    def test_get_one(self):
        response = self.api_client.get(reverse('sprocketfactoryproduction-detail', kwargs={'pk': self.sprocket_factory_production_id}))
        response_item = response.json()

        sprockets_production = SprocketFactoryProduction.objects.get(id=self.sprocket_factory_production_id)
        sprockets_production_items = json.loads(json.dumps(SprocketFactoryProductionSerializer(sprockets_production).data, cls=UUIDEncoder))

        self.assertEqual(response_item, sprockets_production_items)

    def test_add_one(self):
        response_data = {
            'factory': self.sprocket_factory_id,
            'sprocket': self.sprocket_id,
            'production_actual': 30,
            'production_goal': 30,
        }
        response = self.api_client.post(reverse('sprocketfactoryproduction-list'), response_data)
        response_item = response.json()

        sprockets_production = SprocketFactoryProduction.objects.get(id=response_item.get('id'))
        sprockets_production_item = json.loads(json.dumps(SprocketFactoryProductionSerializer(sprockets_production).data, cls=UUIDEncoder))

        self.assertEqual(response_item, sprockets_production_item)

    def test_update_one(self):
        sprockets_production = SprocketFactoryProduction.objects.get(id=self.sprocket_factory_production_id)
        sprockets_production_item = json.loads(json.dumps(SprocketFactoryProductionSerializer(sprockets_production).data, cls=UUIDEncoder))

        response_data = {
            'factory': self.sprocket_factory_id,
            'sprocket': self.sprocket_id,
            'production_actual': 31,
            'production_goal': 29,
        }
        response = self.api_client.put(reverse('sprocketfactoryproduction-detail', kwargs={'pk': self.sprocket_factory_production_id}), response_data)
        response_item = response.json()

        self.assertNotEqual(response_item, sprockets_production_item)

    def test_delete_one(self):
        response_data = {
            'factory': self.sprocket_factory_id,
            'sprocket': self.sprocket_id,
            'production_actual': 30,
            'production_goal': 30,
        }
        response = self.api_client.post(reverse('sprocketfactoryproduction-list'), response_data)
        response_item = response.json()

        self.api_client.delete(reverse('sprocketfactoryproduction-detail', kwargs={'pk': response_item.get('id')}))

        with self.assertRaises(SprocketFactoryProduction.DoesNotExist):
            SprocketFactoryProduction.objects.get(id=response_item.get('id'))

    def test_auth(self):
        self.api_client.logout()

        response = self.api_client.get(reverse('sprocketfactoryproduction-list'))

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
