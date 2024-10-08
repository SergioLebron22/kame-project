from django.db import models
import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.hashers import make_password
# import icd10_table as icd10
'''
    Here are the models needed to create all objects
    to be stored in the database
'''

# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)
class CustomUser(AbstractBaseUser, PermissionsMixin):
    '''Model for employee profiles'''
    employee_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=100)
    email = models.EmailField(unique=True, max_length=254)
    password = models.CharField(max_length=250)
    name = models.CharField(max_length=254)
    last_login = models.DateTimeField(blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def to_dict(self):
        return {
            "employee_id": self.employee_id,
            "role": self.role,
            "email": self.email,
            "password": self.password,
            "name": self.name,
        }


    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'role']

    def __str__(self):
        return self.email

class Patient(models.Model):
    '''Model for patient socio-demographic information'''
    patient_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=250)
    age = models.IntegerField()
    gender = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=150)
    address = models.CharField(max_length=254)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    ssn = models.CharField(max_length=100)

    def to_dict(self):
        return {
            "patient_id": self.patient_id,
            "full_name": self.full_name,
            "age": self.age,
            "gender": self.gender,
            "phone_number": self.phone_number,
            "address": self.address,
            "city": self.city,
            "country": self.country,
            "date_of_birth": self.date_of_birth,
            "ssn": self.ssn,
        }

class Icd10(models.Model):
    code = models.CharField(max_length=100, primary_key=True)
    description = models.CharField(max_length=254)

    class Meta:
        db_table = 'icd10'

class MedicalHistory(models.Model):
    '''Model for patients medical history'''
    history_id = models.UUIDField(primary_key=True, default= uuid.uuid4, editable=False)
    patient_id = models.ForeignKey('Patient', on_delete=models.CASCADE)
    surgeries = models.TextField()
    allergies = models.TextField()
    medical_conditions = models.TextField()

    def to_dict(self):
        return {
            "history_id": self.history_id,
            "surgeries": self.surgeries,
            "allergies": self.allergies,
            "medical_conditions": self.medical_conditions,
        }

class VitalSigns(models.Model):
    '''Model for patients vital signs'''
    vitals_id = models.UUIDField(primary_key=True, default= uuid.uuid4, editable=False)
    patient_id = models.ForeignKey('Patient', on_delete=models.CASCADE, default=uuid.uuid4)
    pulse = models.IntegerField()
    temperature = models.FloatField()
    respiratory_rate = models.IntegerField()
    weight = models.FloatField()
    height = models.FloatField()

    def to_dict(self):
        return {
            "vitals_id": self.vitals_id,
            "pulse": self.pulse,
            "temperature": self.temperature,
            "respiratory_rate": self.respiratory_rate,
            "weight": self.weight,
            "height": self.height,
        }

# icd10_code = icd10.get_foreign_key(description) #add logic for input argument

class MedicalRecord(models.Model):
    '''Model for medical record data'''
    record_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient_id = models.ForeignKey('Patient', on_delete=models.CASCADE) #for deleting we can use on_delete=models.CASCADE
    code = models.ForeignKey('Icd10', on_delete=models.SET_NULL, null=True, blank=True) #need to see if it works
    history_id = models.ForeignKey('MedicalHistory', on_delete=models.CASCADE)
    vitals_id = models.ForeignKey('VitalSigns', on_delete=models.CASCADE)
    progress_notes = models.TextField()
    lab_data = models.TextField()
    imaging_reports = models.TextField()
    medications = models.TextField()
    inmunizations = models.TextField()


    def to_dict(self):
        return {
            "record_id": self.record_id,
            "code": self.code,
            "pogress_notes": self.progress_notes,
            "lab_data": self.lab_data,
            "imaging_reports": self.imaging_reports,
            "medications": self.medications,
            "inmunizations": self.inmunizations,
        }
