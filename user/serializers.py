import re
from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email']

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

class LoginSerializer(UsernameSerializer):
    password = serializers.CharField()

class UserRegisterationSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    password = serializers.CharField(required=True)