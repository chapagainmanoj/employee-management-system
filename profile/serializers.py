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
    work_experience = WorkExperienceSerializer(many=True, allow_null=False, required=False)
    academic_profile = AcademicSerializer(many=True, allow_null=False, required=False)

    class Meta:
        model = Profile
        fields = '__all__'

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        

        work_data = validated_data.pop('work_experience', None)
        academic_data = validated_data.pop('academic_profile', None)

        profile = Profile.objects.create(user=user._wrapped, **validated_data)
        if work_data: 
            for work in work_data:
                WorkExperience.objects.create(profile=profile, **work)
        if academic_data:
            for acedmic in academic_data:
                Academic.objects.create(profile=profile, **acedmic)
        return profile


    def update(self, instance, validated_data):
        work_data = validated_data.pop('work_experience', None)
        academic_data = validated_data.pop('academic_profile', None)

        work_experience = instance.work_experience
        academic_profile = instance.academic_profile

        import pdb; pdb.set_trace()

        # instance.name = validated_data.get('name', instance.name)
        # instance.designation = validated_data.get('designation', designation.name)
        # instance.dob = validated_data.get('dob', instance.dob)
        # instance.primary_address = validated_data.get('primary_address', instance.primary_address)
        # instance.secondary_address = validated_data.get('secondary_address', instance.secondary_address)
        # instance.gender = validated_data.get('gender', instance.gender)
        # instance.status = validated_data.get('name', instance.name)
        # instance.remarks = validated_data.get('name', instance.name)
        # instance.hobbies = validated_data.get('name', instance.name)

        # instance.save()

        # profile.is_premium_member = profile_data.get(
        #     'is_premium_member',
        #     profile.is_premium_member
        # )
        # profile.has_support_contract = profile_data.get(
        #     'has_support_contract',
        #     profile.has_support_contract
        #  )
        # profile.save()

        return instance