import re
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from profile.serializers import ProfileSerializer

class UserSerializer(serializers.ModelSerializer):
    # profile = ProfileSerializer()
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'password', 'is_active', 'first_name', 'last_name',  'is_staff']
        read_only_fields = ['is_active']
        extra_kwargs = {
            'password': {'write_only': True}
        }
        # fields = '__all__'

class UsernameSerializer(serializers.Serializer):
    username = serializers.CharField()

    def validate_username(self, username):
        user = None
        message = 'Incorrect username, email or password.'
        
        try:
            if re.match(r".*?@.*\..*", username):
                user = get_user_model().objects.get(email=username)
            elif isinstance(username, str) and len(username) < 100:
                user = get_user_model().objects.get(username=username)
        except get_user_model().DoesNotExist:
            pass
        if not user:
            raise serializers.ValidationError(message)
        return user.username

class LoginSerializer(UsernameSerializer):
    password = serializers.CharField()

class UserRegisterationSerializer(serializers.Serializer):
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    password = serializers.CharField(required=True)

    def create(self, data):
        try:
            user = get_user_model().objects.create_user(**data)
        except IntegrityError:
            raise serializers.ValidationError({"username": "User already exists"})

        return user