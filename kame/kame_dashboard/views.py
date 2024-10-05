from django.http import JsonResponse
from kame_app.models import Patient, CustomUser, MedicalRecord
import json
from django.core import serializers


def dashboard(request):
    data = MedicalRecord.objects.all()
    return JsonResponse([record.to_dict() for record in data], safe=False)

def users(request):
    if request.method == "GET":
        data = CustomUser.objects.all()
        return JsonResponse([user.to_dict() for user in data], safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

def get_user(request, employee_id):
    if request.method == 'GET':
        data = CustomUser.objects.get(pk=employee_id)
        return JsonResponse(data, safe=False)

def update_user(request, employee_id):
    if request.method == "PUT":

        data = CustomUser.objects.get(pk=employee_id)
        return JsonResponse(data, safe=False)

def delete_user(request, employee_id):
    if request.method == "DELETE":
        try:
            user = CustomUser.objects.get(pk=employee_id)
            user.delete()
            return JsonResponse({'message': 'User deleted succesfully'}, status=200)
        except CustomUser.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

def get_patients(request):
    data = Patient.objects.all()
    return JsonResponse(data, safe=False)

def create_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            role = data.get('role')
            email = data.get('email')
            password = data.get('password')
            name = data.get('name')

            if not role or not email or not password or not name:
                return JsonResponse({'error': 'Missing required fields'}, status=400)
            user = CustomUser.objects.create_user(role=role, name=name, email=email, password=password)
            return JsonResponse({'message': 'User created successfully', 'user_id': user.id}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
