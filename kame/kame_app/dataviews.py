from  .models import Patient, MedicalRecord, VitalSigns, MedicalHistory, Icd10
from django.http import HttpResponseServerError, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from datetime import datetime
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator



# Create your views here.
@csrf_exempt
def patients(request):
    if request.method == 'GET':
        search_query = request.GET.get('query', '')
        page_number = request.GET.get('page', 1)
        page_size = request.GET.get('page_size', 10)

        if search_query:
            patients = Patient.objects.filter(full_name__icontains=search_query)
        else:
            patients = Patient.objects.all()

        paginator = Paginator(patients, page_size)
        page_obj = paginator.get_page(page_number)

        data = {
            'patients': [patient.to_dict() for patient in page_obj],
            'total_pages': paginator.num_pages,
            'current_page': page_obj.number,
        }
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

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

@csrf_exempt
def get_patient(request, patient_id):
    if request.method == 'GET':
        data = Patient.objects.get(pk=patient_id)
        return JsonResponse(data.to_dict(), safe=False)

    elif request.method == 'PUT':
        try:
            data = json.loads(request.body)
            patient = get_object_or_404(Patient, patient_id=patient_id)
            patient.full_name = data.get('full_name', patient.full_name)
            patient.age = data.get('age', patient.age)
            patient.gender = data.get('gender', patient.gender)
            patient.phone_number = data.get('phone_number', patient.phone_number)
            patient.address = data.get('address', patient.address)
            patient.city = data.get('city', patient.city)
            patient.country = data.get('country', patient.country)
            patient.date_of_birth = data.get('date_of_birth', patient.date_of_birth)
            patient.ssn = data.get('ssn', patient.ssn)
            patient.save()
            return JsonResponse(patient.to_dict())
        except json.JSONDecodeError:
            return JsonResponse({'Error': "Invalid json"}, status=400)
@csrf_exempt
def get_medical_record(request, patient_id):
    if request.method == 'GET':
        try:
            data = MedicalRecord.objects.get(patient_id=patient_id)
            return JsonResponse(data.to_dict())
        except MedicalRecord.DoesNotExist:
            return JsonResponse({'error': 'Medical record not found'}, status=404)
    elif request.method == 'PUT':
        try:
            data = json.loads(request.body)
            medicalrecord = MedicalRecord.objects.get(patient_id=patient_id)
            medicalrecord.progress_notes = data.get('progress_notes', medicalrecord.progress_notes)
            medicalrecord.lab_data = data.get('lab_data', medicalrecord.lab_data)
            medicalrecord.imaging_reports = data.get('imaging_reports', medicalrecord.imaging_reports)
            medicalrecord.medications = data.get('medications', medicalrecord.medications)
            medicalrecord.inmunizations = data.get('inmunizations', medicalrecord.inmunizations)
            medicalrecord.code = None
            if 'code' in data:
                try:
                    icd10_code = Icd10.objects.get(code=data['code'])
                    medicalrecord.code = icd10_code
                except Icd10.DoesNotExist:
                    return JsonResponse({'error': 'Invalid ICD-10 code'}, status=400)
            medicalrecord.save()
            return JsonResponse(medicalrecord.to_dict(), status=200)
        except json.JSONDecodeError:
            return JsonResponse({'Error': "Invalid json"}, status=400)

@csrf_exempt
def create_medical_record(request, patient_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            medical_record = MedicalRecord.objects.create(
                patient_id=Patient.objects.get(pk=patient_id),
                history_id=MedicalHistory.objects.get(patient_id=patient_id),
                vitals_id=VitalSigns.objects.get(patient_id=patient_id),
                code=Icd10.objects.get(code=data.get('code')),
                progress_notes=data.get('progress_notes'),
                lab_data=data.get('lab_data'),
                imaging_reports=data.get('imaging_reports'),
                inmunizations=data.get('inmunizations'),
                medications=data.get('medications'),
            )
            return JsonResponse(medical_record.to_dict(), status=201)
        except Icd10.DoesNotExist:
            return JsonResponse({'error': "ICD-10 code not found"}, status=400)
        except Exception as e:
            return HttpResponseServerError(f'Error creating medical record: {e}')
    else:
        return JsonResponse({'error': "Invalid HTTP request"}, status=405)

@csrf_exempt
def get_vital_signs(request, patient_id):
    if request.method == 'GET':
        try: 
            data = VitalSigns.objects.get(patient_id=patient_id)
            return JsonResponse(data.to_dict())
        except VitalSigns.DoesNotExist:
            return JsonResponse({'error': 'Vital Signs not found'}, status=404)

    elif request.method == 'PUT':
        try:
            data = json.loads(request.body)
            vitalsigns = get_object_or_404(VitalSigns, patient_id=patient_id)
            vitalsigns.pulse = data.get('pulse', vitalsigns.pulse)
            vitalsigns.temperature = data.get('temperature', vitalsigns.temperature)
            vitalsigns.respiratory_rate = data.get('respiratory_rate', vitalsigns.respiratory_rate)
            vitalsigns.weight = data.get('weight', vitalsigns.weight)
            vitalsigns.height = data.get('height', vitalsigns.height)
            vitalsigns.save()
            return JsonResponse(vitalsigns.to_dict())
        except json.JSONDecodeError:
            return JsonResponse({'Error': "Invalid json"}, status=400)
    else:
        return JsonResponse({'error': "Invalid request method"}, status=405)

@csrf_exempt
def create_vital_signs(request, patient_id):
     if request.method == 'POST':
        try:
            data = json.loads(request.body)
            patient = Patient.objects.get(pk=patient_id)
            pulse = data.get('pulse')
            temperature = data.get('temperature')
            respiratory_rate = data.get('respiratory_rate')
            weight = data.get('weight')
            height = data.get('height')

            new_vitalSigns = VitalSigns.objects.create(
                patient_id=patient,
                pulse=pulse,
                temperature=temperature,
                respiratory_rate=respiratory_rate,
                weight=weight,
                height=height

            )
            serialized_vitalsigns = serializers.serialize('json', [new_vitalSigns])
            vitalSigns_data = json.loads(serialized_vitalsigns)[0]['fields']
            return JsonResponse(vitalSigns_data, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
@csrf_exempt
def get_medical_history(request, patient_id):
    if request.method == 'GET':
        try:
            data = MedicalHistory.objects.get(patient_id=patient_id)
            return JsonResponse(data.to_dict())
        except MedicalHistory.DoesNotExist:
            return JsonResponse({'error': 'Medical History does not exist'}, status=404)
    
    elif request.method == 'PUT':
        try:
            data = json.loads(request.body)
            medicalHistory = get_object_or_404(MedicalHistory, patient_id=patient_id)
            medicalHistory.surgeries = data.get('surgeries', medicalHistory.surgeries)
            medicalHistory.allergies = data.get('allergies', medicalHistory.allergies)
            medicalHistory.medical_conditions = data.get('medical_conditions', medicalHistory.medical_conditions)
            medicalHistory.save()
            return JsonResponse(medicalHistory.to_dict())
        except json.JSONDecodeError:
            return JsonResponse({'Error': "Invalid json"}, status=400)

@csrf_exempt
def create_medical_history(request, patient_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            patient = Patient.objects.get(pk=patient_id)
            surgeries = data.get('surgeries')
            allergies = data.get('allergies')
            medical_conditions = data.get('medical_conditions')

            new_medical_history = MedicalHistory.objects.create(
                patient_id=patient,
                surgeries=surgeries,
                allergies=allergies,
                medical_conditions=medical_conditions
            )
            serialized_medical_history = serializers.serialize('json', [new_medical_history])
            medicalHistory = json.loads(serialized_medical_history)[0]['fields']
            return JsonResponse(medicalHistory, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

def get_codes(request):
    if request.method == 'GET':
        query = request.GET.get('query', '')
        page_number = request.GET.get('page', 1)
        page_size = request.GET.get('page_size', 10)

        codes = Icd10.objects.filter(description__icontains=query)
        paginator = Paginator(codes, page_size)
        page_obj = paginator.get_page(page_number)

        data = {
            'codes': [code.to_dict() for code in page_obj],
            'total_pages': paginator.num_pages,
            'current_page': page_obj.number,
        }
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({'error': "Invalid HTTP request"}, status=405)


def get_patient_appointments(request, patient_id):
    pass

def create_appointment(request, patient_id):
    pass
