from django.contrib.auth import (
    get_user_model
)
from django.contrib import auth
# from django.contrib.auth import login
import json
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from .serializers import (
    UserSerializer, LoginSerializer, UserRegisterationSerializer
)

from rest_framework.response import Response

class UserAPI(viewsets.ModelViewSet):
    """
    A viewset   for viewing and editing user instances.
    """     
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()

    # def verified_user(method='POST'):

    #     return Response(
    #         users: User.objects.filter(verified=True)
    #     )
    
    # def my_profile(method: "GET"):
    #     return Response(
    #         user: ''
    #     )
        

@api_view(["POST"])
def login(request, *args, **kwargs):
    login_user = LoginSerializer(data=request.data)

    if login_user.is_valid():
        user = auth.authenticate(
            username=login_user.validated_data.get("username"),
            password=login_user.validated_data.get("password")
        )
        if user is not None:
            auth.login(request, user)
            return Response({"detail": "Successfully logged in."})
        else:
            return Response({"username": ["Incorrect username, email or password."]}, status.HTTP_400_BAD_REQUEST)
    else:
        return Response(login_user.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def logout(request, *args, **kwargs):
    if request.user.is_authenticated:
        user = request.user
        auth.logout(request)
        return Response({"detail": "Successfully logged out."})
    else:
        error_message = {"detail": "Please login to logout."},
        return Response(error_message, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def register(request, *args, **kwargs):
    user_data = request.data.copy()
    if user_data.get('email') == '':
        user_data.pop('email')

    s = UserRegisterationSerializer(data=user_data, context={'request': request})
    if s.is_valid():
        unauthenticated_user = s.save()
        if unauthenticated_user is None:
            error_message = {"detail": "Something went wrong please try again later."},
            return Response(error_message, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        user = auth.authenticate(
            username=unauthenticated_user.username,
            password=user_data.get('password')
        )
        auth.login(request, user)
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)