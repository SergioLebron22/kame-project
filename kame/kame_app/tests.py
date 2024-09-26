from django.test import TestCase
from kame_app.models import User
import uuid

# Create your tests here.

class TestUser(TestCase):
    def setUp(self):
        self.user = User.objects.create(
        role = 'doctor',
        email = 'testemail@email.com',
        password = 'Password567789',
        name = 'That Guy'
    )

    def test_user_creation(self):
        self.assertIsInstance(self.user.employee_id, uuid.UUID)
        self.assertEqual(self.user.role, 'doctor')
        self.assertEqual(self.user.email, 'testemail@email.com')
        self.assertEqual(self.user.password, 'Password567789')
        self.assertEqual(self.user.name, 'That Guy')
