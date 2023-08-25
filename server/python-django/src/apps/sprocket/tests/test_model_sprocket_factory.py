from django.test import TestCase

from ..models.sprocket import Sprocket
from ..models.sprocket_factory import SprocketFactory, SprocketFactoryProduction


class SprocketFactoryTest(TestCase):
    """ Test module for Sprocket Factory model """

    def setUp(self):
        sprocket_factory = SprocketFactory.objects.create(
            name = "Test Factory Name",
            description = "",
            is_active = True,
        )

        self.sprocket_factory_id = sprocket_factory.id

    def test_str(self):
        sprocket_factory = SprocketFactory.objects.get(id=self.sprocket_factory_id)
        sprocket_factory_str = "Test Factory Name"

        self.assertEqual(str(sprocket_factory), sprocket_factory_str)

    def test_repr(self):
        sprocket_factory = SprocketFactory.objects.get(id=self.sprocket_factory_id)
        sprocket_factory_repr = f'SprocketFactory(name={sprocket_factory.name}, description={sprocket_factory.description}, is_active={sprocket_factory.is_active})'

        self.assertEqual(repr(sprocket_factory), sprocket_factory_repr)

    def test_data_equality(self):
        sprocket_factory = SprocketFactory.objects.get(id=self.sprocket_factory_id)
        sprocket_factory_tmp = SprocketFactory.objects.create(
            name = "Test Factory Name",
            description = "",
            is_active = True,
        )

        self.assertNotEqual(sprocket_factory, sprocket_factory_tmp)

class SprocketFactoryProductionTest(TestCase):
    """ Test module for Sprocket Factory Production model """

    def setUp(self):
        self.sprocket_factory = SprocketFactory.objects.create(
            name = "Test Factory Name",
            description = "",
            is_active = True,
        )
        self.sprocket = Sprocket.objects.create(
            teeth = 5,
            pitch_diameter = 5.5,
            outside_diameter = 6,
            pitch = 1,
            description = "",
            is_active = True,
        )

    def test_str(self):
        sprocket_factory_production = SprocketFactoryProduction.objects.create(
            factory = self.sprocket_factory,
            sprocket = self.sprocket,
            production_actual = 30,
            production_goal = 31
        )

        sprocket_factory_production_str = f'{self.sprocket_factory.name}, Producing: {self.sprocket}, ({sprocket_factory_production.production_actual} of {sprocket_factory_production.production_goal})'

        self.assertEqual(str(sprocket_factory_production), sprocket_factory_production_str)

    def test_repr(self):
        sprocket_factory_production = SprocketFactoryProduction.objects.create(
            factory = self.sprocket_factory,
            sprocket = self.sprocket,
            production_actual = 30,
            production_goal = 31
        )

        sprocket_factory_production_repr = f'SprocketFactoryProduction(factory={self.sprocket_factory.id}, sprocket={self.sprocket.id}, production_actual={sprocket_factory_production.production_actual}, production_goal={sprocket_factory_production.production_goal})'

        self.assertEqual(repr(sprocket_factory_production), sprocket_factory_production_repr)

    def test_data_equality(self):
        sprocket_factory_production_a = SprocketFactoryProduction.objects.create(
            factory = self.sprocket_factory,
            sprocket = self.sprocket,
            production_actual = 30,
            production_goal = 31
        )
        sprocket_factory_production_b = SprocketFactoryProduction.objects.create(
            factory = self.sprocket_factory,
            sprocket = self.sprocket,
            production_actual = 30,
            production_goal = 31
        )

        self.assertNotEqual(sprocket_factory_production_a, sprocket_factory_production_b)
