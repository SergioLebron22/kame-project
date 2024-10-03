from django.http import JsonResponse
from kame_app.models import Patient, CustomUser

def dashboard(request):
    # Fetch all patients with related medical records and ICD10 codes
    patients = Patient.objects.all().prefetch_related('medicalrecord_set__icd10')

    # Prepare data to be serialized
    data = []
    for patient in patients:
        records = []
        for record in patient.medicalrecord_set.all():
            records.append({
                'description': record.description,
                'icd10_code': record.icd10.code,  # Assuming 'code' is a field in the Icd10 model
                'icd10_description': record.icd10.description  # Assuming 'description' is a field in the Icd10 model
            })
        data.append({
            'full_name': patient.full_name,
            'age': patient.age,
            'gender': patient.gender,
            'phone_number': patient.phone_number,
            'address': patient.address,
            'city': patient.city,
            'country': patient.country,
            'date_of_birth': patient.date_of_birth.isoformat(),
            'ssn': patient.ssn,
            'medical_records': records,
        })

    # Return the data as a JSON response
    return JsonResponse(data, safe=False)

def users(request):
    data = CustomUser.objects.all()
    return JsonResponse(data, safe=False)

def get_user(request, employee_id):
    data = CustomUser.objects.get(pk=employee_id)
    return JsonResponse(data, safe=False)

def update_user(request, employee_id):
    data = CustomUser.objects.get(pk=employee_id)
    return JsonResponse(data, safe=False)

def delete_user(request, employee_id):
    try:
        user = CustomUser.objects.get(pk=employee_id)
        user.delete()
        return JsonResponse({'message': 'User deleted succesfully'}, status=200)
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

def get_patinets(request):
    data = Patient.objects.all()
    return JsonResponse(data, safe=False)
