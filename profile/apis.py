from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import ProfileSerializer
from .models import Profile
from .permissions import IsAdminOrIsSelf


class ProfileAPI(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminOrIsSelf]

    @action(detail=False, methods=['GET'])
    def verified(self, request, id=None):
        try:
            verified_users = Profile.objects.filter(status='Verified')
            pass
        except expression as identifier:
            pass
        serializer = self.get_serializer(verified_users, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def pending(self, request, id=None):
        try:
            verified_users = Profile.objects.filter(status='Pending')
            pass
        except expression as identifier:
            pass
        serializer = self.get_serializer(verified_users, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=["GET"])
    def my(self, request):
        print(request.user.id, 'my profile')
        my_profile_data = None
        try:
            my_profile = Profile.objects.get(user__id=request.user.id)
            serializer = self.get_serializer(my_profile)
            my_profile_data = serializer.data
        except Profile.DoesNotExist:
            my_profile_data = {}
        return Response(my_profile_data)
        