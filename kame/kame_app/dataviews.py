from  .models import Patient, MedicalRecord,VitalSigns,MedicalHistory
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from datetime import datetime

# Create your views here.
def patients(request):
    data = Patient.objects.all()
    return JsonResponse([patient.to_dict() for patient in data], safe=False)

@csrf_exempt
def create_patient(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            full_name = data.get("full_name")
            age = data.get("age")
            gender = data.get("gender")
            phone_number = data.get("phone_number")
            address = data.get("address")
            city = data.get("city")
            country = data.get("country")
            date_of_birth = datetime.fromisoformat(data.get("date_of_birth"))
            ssn = data.get("ssn")
            
            new_patient = Patient.objects.create(
                full_name=full_name,
                age=age,
                gender=gender,
                phone_number=phone_number,
                address=address,
                city=city,
                country=country,
                date_of_birth=date_of_birth,
                ssn=ssn
            )
            
            serialized_patient = serializers.serialize('json', [new_patient])
            patient_data = json.loads(serialized_patient)[0]['fields']
            return JsonResponse(patient_data, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

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
