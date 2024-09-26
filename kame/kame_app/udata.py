from django.urls import path
from kame.kame_app import dataviews

urlpatterns = [
    path("patients/", dataviews.patients, name="patients"),
    path("<str:patient_id>/", dataviews.get_patient, name="patient"),
    path("<str:patient_id>/medical_record/", dataviews.get_medical_record, name="medical_record"),
    path("<str:patient_id>/vital_signs/", dataviews.get_vital_signs, name="vital_signs"),
    path("<str:patient_id>/medical_history/", dataviews.get_medical_history, name="medical_history"),
    path("<str:patient_id>/patient_appointments/", dataviews.get_patient_appointments, name="patient_appointmet"),
    path("create_appointment/<str:patient_id>/", dataviews.create_appointment, name="create_appointment"),
]