from rest_framework import viewsets
from .serializers import ProfileSerializer
from .models import Profile

class ProfileAPI(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer