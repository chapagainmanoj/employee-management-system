from rest_framework import viewsets
from django.contrib.auth import get_user_model
from .serializers import UserSerializer

class UserAPI(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """     
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()

    #  def list(self, request):
    #     queryset = User.objects.all()
    #     serializer = UserSerializer(queryset, many=True)
    #     return Response(serializer.data)

    # def retrieve(self, request, pk=None):
    #     queryset = User.objects.all()
    #     user = get_object_or_404(queryset, pk=pk)
    #     serializer = UserSerializer(user)
    #     return Response(serializer.data)