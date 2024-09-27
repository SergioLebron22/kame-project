from  .models import Patient, MedicalRecord,VitalSigns,MedicalHistory
from django.http import JsonResponse

# Create your views here.
def patients(request):
    data = Patient.objects.all()
    return JsonResponse([patient.to_dict() for patient in data], safe=False)

def get_patient(request, patient_id):
    data = Patient.objects.get(pk=patient_id)
    return JsonResponse(data, safe=False)

def get_medical_record(request, patient_id):
    data = MedicalRecord.objects.get(pk=patient_id)
    return JsonResponse(data, safe=False)
    

def get_vital_signs(request, patient_id):
    data = VitalSigns.object.get(pk=patient_id)
    return JsonResponse(data, safe=False)

def get_medical_history(request, patient_id):
    data = MedicalHistory.objects.get(pk=patient_id)
    return JsonResponse(data, safe=False)

def get_patient_appointments(request, patient_id):
    pass

def create_appointment(request, patient_id):
    pass