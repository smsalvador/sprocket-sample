from django.test import TestCase

from ..models.sprocket import Sprocket


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

    def test_str(self):
        sprocket = Sprocket.objects.get(id=self.sprocket_id)
        sprocket_str = f'Teeth: {sprocket.teeth}, Diameter: ({sprocket.pitch_diameter} / {sprocket.outside_diameter}), Pitch: {sprocket.pitch}'

        self.assertEqual(str(sprocket), sprocket_str)

    def test_repr(self):
        sprocket = Sprocket.objects.get(id=self.sprocket_id)
        sprocket_repr = f'Sprocket(teeth={sprocket.teeth}, pitch_diameter={sprocket.pitch_diameter}, outside_diameter={sprocket.outside_diameter}, pitch={sprocket.pitch}, description="{sprocket.description}" is_active={sprocket.is_active})'

        self.assertEqual(repr(sprocket), sprocket_repr)

    def test_data_equality(self):
        sprocket = Sprocket.objects.get(id=self.sprocket_id)
        sprocket_tmp = Sprocket.objects.create(
            teeth = 5,
            pitch_diameter = 5.5,
            outside_diameter = 6,
            pitch = 1,
            description = "",
            is_active = True,
        )

        self.assertNotEqual(sprocket, sprocket_tmp)

    def test_data_integrity(self):
        with self.assertRaises(TypeError):
            sprocket_tmp = Sprocket(
                teeth = 10.5,
                pitch_diameter = 5.5,
                outside_diameter = 6,
                pitch = 1.5,
                description = "",
                is_active = False,
            )
            sprocket_tmp.save()

        with self.assertRaises(ValueError):
            sprocket_tmp = Sprocket(
                teeth = 10,
                pitch_diameter = 0,
                outside_diameter = 6,
                pitch = 1.5,
                description = "",
                is_active = False,
            )
            sprocket_tmp.save()

        with self.assertRaises(ValueError):
            sprocket_tmp = Sprocket(
                teeth = 10,
                pitch_diameter = 5,
                outside_diameter = -1,
                pitch = 1.5,
                description = "",
                is_active = False,
            )
            sprocket_tmp.save()


        with self.assertRaises(ValueError):
            sprocket_tmp = Sprocket(
                teeth = 10,
                pitch_diameter = 5,
                outside_diameter = 6,
                pitch = 0,
                description = "",
                is_active = False,
            )
            sprocket_tmp.save()
