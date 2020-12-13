from rest_framework import viewsets
from django.contrib.auth import (
    get_user_model, authenticate, login, logout
)
from .serializers import (
    UserSerializer, LoginSerializer, UserRegisterationSerializer
)

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

@api_view(["POST"]
def login(request, *args, **kwargs):
    login_user = LoginSerializer(data=request.data)

    if login_user.is_valid():
        user = authenticate(
            username=login_user.validated_data.get("username"),
            password=login_user.validated_data.get("password")
        )
        login(request, user)

@api_view(["POST"]
def logout(request, *args, **kwargs):
    if request.user.is_authenticated:
        user = request.user
        logout(request)

@api_view(["POST"]
def register(request, *args, **kwargs):
    user_data = request.data.copy()
    if user_data.get('email') == '':
        user_data.pop('email')

    s = UserRegisterationSerializer(data=data, context={'request': request})
    if s.is_valid():
        unauthenticated_user = s.save()
        if unauthenticated_user is None:
            pass
            # return error
        
        user = authenticate(
            username=unauthenticated_user.username,
            password=user_data.get('password')
        )
        login(request, user)
        # return response
    else:
        pass
        # return error