from django.db import models
from django.contrib.auth import get_user_model

class Profile(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False, db_index=True)
    designation = models.CharField(max_length=100, blank=False, null=False)
    dob = models.DateField(max_length=25)
    primary_address = models.CharField(max_length=100)
    secondary_address = models.CharField(max_length=100, blank=True, null=True)

    MALE = 'Male'
    FEMALE = 'Female'
    NON_BINARY = 'Non-binary'
    TRANSGENDER = 'Transgender'
    INTERSEX = 'Intersex'
    PREFER_NOT_TO_SAY = 'I prefer not to say'
    GENDER_CHOICES = (
            (MALE, MALE,),
            (FEMALE, FEMALE,),
            (NON_BINARY, NON_BINARY,),
            (TRANSGENDER, TRANSGENDER,),
            (INTERSEX, INTERSEX,),
            (PREFER_NOT_TO_SAY, PREFER_NOT_TO_SAY,)
    )

    gender = models.CharField(
        max_length=20, choices=GENDER_CHOICES,
        null=True, blank=True
        )
    
    PENDING = "Pending"
    UNVERIFIED = "Unverified"
    VERIFIED = "Verified"
    STATUS_CHOICES = (
        (PENDING, PENDING,),
        (UNVERIFIED, UNVERIFIED,),
        (VERIFIED, VERIFIED,),
    )
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default=PENDING)
    user = models.OneToOneField(
		get_user_model(),
		on_delete=models.SET_NULL,
		related_name='user_profile',
		null=True
	)
    remarks = models.TextField(blank=True, null=True)
    hobbies = models.TextField(blank=True, null=True)

    def verify (self, request=None, remarks=''):
        self.status = 'Verified'
        self.remarks = remarks
        self.save()

    def __str__(self):
        return f"{self.name}"



class Academic(models.Model):
    profile = models.ForeignKey(
        Profile, 
        related_name='academic_profile',
        on_delete=models.CASCADE
        )
    degree = models.CharField(max_length=100)
    school = models.CharField(max_length=100)
    location = models.CharField(max_length=100, blank=True, null=True)
    percentage = models.CharField(max_length=20, blank=True, null=True)
    year_attained = models.CharField(max_length=25)
    document = models.FileField(blank=True, null=True) # method where to save file

    def __str__(self):
        return f"{self.degree}"


class WorkExperience(models.Model):
    profile = models.ForeignKey(
        Profile, 
        on_delete=models.CASCADE,
        related_name='work_experience'
        )
    company = models.CharField(max_length=100)
    year = models.CharField(max_length=25)
    location = models.CharField(max_length=100, blank=True, null=True)
    document = models.FileField(blank=True, null=True) # method where to save file

