from django.urls import path
from . import dataviews

urlpatterns = [
    path("patients/", dataviews.patients, name="patients"),
    path("patients/create_patient/", dataviews.create_patient, name="create_patient"),
    path("patients/<str:patient_id>/create_medical_record/", dataviews.create_medical_record, name="create_medical_record"),
    path("patients/<str:patient_id>/create_medical_history/", dataviews.create_medical_history, name="create_medical_history"),
    path("patients/<str:patient_id>/create_vital_signs/", dataviews.create_vital_signs, name="create_vital_signs"),
    path("patients/<str:patient_id>/", dataviews.get_patient, name="patient"),
    path("patients/<str:patient_id>/medical_record/", dataviews.get_medical_record, name="medical_record"),
    path("patients/<str:patient_id>/vital_signs/", dataviews.get_vital_signs, name="vital_signs"),
    path("patients/<str:patient_id>/medical_history/", dataviews.get_medical_history, name="medical_history"),
    path("patients/<str:patient_id>/patient_appointments/", dataviews.get_patient_appointments, name="patient_appointmet"),
    path("create_appointment/<str:patient_id>/", dataviews.create_appointment, name="create_appointment"),
    
]