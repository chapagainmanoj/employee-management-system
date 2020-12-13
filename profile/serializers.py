from rest_framework import serializers
from .models import Profile, WorkExperience, Academic

class AcademicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Academic
        fields = '__all__'

class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperience
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    work_experience = WorkExperienceSerializer(many=True)
    academic_profile = AcademicSerializer(many=True)
    class Meta:
        model = Profile
        fields = '__all__'