from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from .models import Employees
from .serializers import EmpoyeesSerializer

class BaseViewTest (APITestCase):
    client = APIClient()
