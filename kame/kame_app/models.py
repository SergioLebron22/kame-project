from django.db import models
import uuid
from django.contrib.auth.hashers import make_password
# import icd10_table as icd10
'''
    Here are the models needed to create all objects
    to be stored in the database
'''

# Create your models here.

class User(models.Model):
    '''Model for employee profiles'''
    employee_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    password = models.CharField(max_length=250)
    name = models.CharField(max_length=254)

    def save(self, *args, **kwargs):
        if self.password and not self.password.startswith('pbkdf2_sha256$'):
            self.password = make_password(self.password)
        super(User, self).save(*args, **kwargs)

class Patient(models.Model):
    '''Model for patient socio-demographic information'''
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=250)
    age = models.IntegerField()
    gender = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=150)
    address = models.CharField(max_length=254)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    ssn = models.CharField(max_length=100)



class MedicalHistory(models.Model):
    '''Model for patients medical history'''
    history_id = models.UUIDField(primary_key=True, default= uuid.uuid4, editable=False)
    patient_id = models.ForeignKey('Patient', on_delete=models.CASCADE)
    surgeries = models.TextField()
    allergies = models.TextField()
    medical_conditions = models.TextField()

class VitalSigns(models.Model):
    '''Model for patients vital signs'''
    vitals_id = models.UUIDField(primary_key=True, default= uuid.uuid4, editable=False)
    pulse = models.IntegerField()
    temperature = models.FloatField()
    respiratory_rate = models.IntegerField()
    weight = models.FloatField()
    height = models.FloatField()

# icd10_code = icd10.get_foreign_key(description) #add logic for input argument

class MedicalRecord(models.Model):
    '''Model for medical record data'''
    record_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient_id = models.ForeignKey('Patient', on_delete=models.CASCADE) #for deleting we can use on_delete=models.CASCADE
    Code = models.ForeignKey('icd10', on_delete=models.CASCADE) #need to see if it works
    history_id = models.ForeignKey('MedicalHistory', on_delete=models.CASCADE)
    vitals_id = models.ForeignKey('VitalSigns', on_delete=models.CASCADE)
    progress_notes = models.TextField()
    lab_data = models.TextField()
    imaging_reports = models.TextField()
    medications = models.TextField()
    inmunizations = models.TextField()
