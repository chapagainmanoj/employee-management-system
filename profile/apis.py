from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import ProfileSerializer, AcademicSerializer, WorkExperienceSerializer
from .models import Profile, Academic, WorkExperience
from .permissions import IsAdminOrIsSelf


class ProfileAPI(viewsets.ModelViewSet):
    queryset = Profile.objects.all().order_by("-id")
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminOrIsSelf]
    lookup_field='id'

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
        my_profile_data = None
        try:
            my_profile = Profile.objects.get(user__id=request.user.id)
            serializer = self.get_serializer(my_profile)
            my_profile_data = serializer.data
        except Profile.DoesNotExist:
            Response({
				"detail": "Profile doesn't exists"}, status=status.HTTP_404_NOT_FOUND)
        return Response(my_profile_data)

    @action(methods=["POST"], detail=True)
    def verify(self, request, id):
        try:
            profile = Profile.objects.get(id=id)
        except Profile.DoesNotExist:
            return Response({
				"detail": "Profile doesn't exists"}, status=status.HTTP_404_NOT_FOUND)
        print('codei')
        if profile.status == profile.VERIFIED:
            return Response({
            "detail": "Profile already verified"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            profile.verify()
        return Response({"detail": "Successfully verified this profile."})

    @action(methods=["POST"], detail=True)
    def reject(self, request, id):
        remarks = request.data.get('remarks')
        try:
            profile = Profile.objects.get(id=id)
        except Profile.DoesNotExist:
            return Response({
				"detail": "Profile doesn't exists"}, status=status.HTTP_404_NOT_FOUND)
        print('codei')
        # import pdb; pdb.set_trace()
        if profile.status == profile.VERIFIED:
            return Response({
            "detail": "Profile already verified"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            profile.reject(remarks=remarks)
        return Response({"detail": "Successfully rejected this profile."})

class AcademicAPI(viewsets.ModelViewSet):
    queryset = Academic.objects.all()
    serializer_class = AcademicSerializer

class WorkExperienceAPI(viewsets.ModelViewSet):
    queryset = WorkExperience.objects.all()
    serializer_class = WorkExperienceSerializer
