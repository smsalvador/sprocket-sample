import json

from django.contrib.auth.models import User
from django.test import TestCase, Client
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

from ..models.sprocket import Sprocket
from ..serializers.sprocket import SprocketSerializer


class SprocketTest(TestCase):
    """ Test module for Sprocket model """

    def setUp(self):
        sprocket = Sprocket.objects.create(
            teeth = 5,
            pitch_diameter = 5.5,
            outside_diameter = 6,
            pitch = 1,
            description = "",
            is_active = True,
        )

        self.sprocket_id = sprocket.id
        self.client = Client()
        self.test_user = User.objects.create_user(
            username="test_user",
            password="test_password",
        )

        self.api_client = APIClient()
        self.api_client.login(username='test_user', password='test_password')

    def test_get_all(self):
        response = self.api_client.get(reverse('sprocket-list'))
        response_items = response.json().get('results')

        sprockets = Sprocket.objects.all()
        sprockets_items = json.loads(json.dumps(SprocketSerializer(sprockets, many=True).data))

        self.assertEqual(response_items, sprockets_items)

    def test_get_one(self):
        response = self.api_client.get(reverse('sprocket-detail', kwargs={'pk': self.sprocket_id}))
        response_item = response.json()

        sprocket = Sprocket.objects.get(id=self.sprocket_id)
        sprocket_item = json.loads(json.dumps(SprocketSerializer(sprocket).data))

        self.assertEqual(response_item, sprocket_item)

    def test_add_one(self):
        response_data = {
            'teeth': 10,
            'pitch_diameter': 8,
            'outside_diameter': 10,
            'pitch': 2,
            'description': "",
            'is_active': True,
        }
        response = self.api_client.post(reverse('sprocket-list'), response_data)
        response_item = response.json()

        sprocket = Sprocket.objects.get(id=response_item.get('id'))
        sprocket_item = json.loads(json.dumps(SprocketSerializer(sprocket).data))

        self.assertEqual(response_item, sprocket_item)

    def test_update_one(self):
        sprocket = Sprocket.objects.get(id=self.sprocket_id)
        sprocket_item = json.loads(json.dumps(SprocketSerializer(sprocket).data))

        response_data = {
            'teeth': 10,
            'pitch_diameter': 8,
            'outside_diameter': 10,
            'pitch': 2,
            'description': "",
            'is_active': True,
        }
        response = self.api_client.put(reverse('sprocket-detail', kwargs={'pk': self.sprocket_id}), response_data)
        response_item = response.json()

        self.assertNotEqual(response_item, sprocket_item)

    def test_delete_one(self):
        response_data = {
            'teeth': 10,
            'pitch_diameter': 8,
            'outside_diameter': 10,
            'pitch': 2,
            'description': "",
            'is_active': True,
        }
        response = self.api_client.post(reverse('sprocket-list'), response_data)
        response_item = response.json()

        self.api_client.delete(reverse('sprocket-detail', kwargs={'pk': response_item.get('id')}))

        with self.assertRaises(Sprocket.DoesNotExist):
            Sprocket.objects.get(id=response_item.get('id'))

    def test_auth(self):
        self.api_client.logout()

        response = self.api_client.get(reverse('sprocket-list'))

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
