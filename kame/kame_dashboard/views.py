from django.http import JsonResponse
from kame_app.models import Patient, CustomUser, MedicalRecord, Icd10
import json
from datetime import date
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.db.models.functions import TruncMonth
from django.db.models import Count


def dashboard(request):
    if request.method == 'GET':
        data = MedicalRecord.objects.all()
        return JsonResponse([record.to_dict() for record in data], safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

def users(request):
    if request.method == "GET":
        data = CustomUser.objects.all()
        return JsonResponse([user.to_dict() for user in data], safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

def get_user(request, employee_id):
    if request.method == 'GET':
        data = CustomUser.objects.get(pk=employee_id)
        return JsonResponse(data.to_dict(), safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def update_user(request, employee_id):
    if request.method == "PUT":
        try:
            user = CustomUser.objects.get(pk=employee_id)
            data = json.loads(request.body)

            user.role = data.get('role', user.role)
            user.email = data.get('email', user.email)
            user.name = data.get('name', user.name)

            if 'password' in data:
                user.set_password(data['password'])

            user.save()
            return JsonResponse({'message': 'User updated successfully'}, status=200)
        except CustomUser.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def delete_user(request, employee_id):
    if request.method == "DELETE":
        try:
            user = get_object_or_404(CustomUser, pk=employee_id)
            user.delete()
            return JsonResponse({'message': 'User deleted succesfully'}, status=200)
        except CustomUser.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

def get_patients_dashboard(request):
    if request.method == 'GET':
        # Group by month and count the number of patients per month
        data = (
            Patient.objects
            .annotate(month=TruncMonth('last_visited'))  # Assuming 'last_visited' is a DateTime field
            .values('month')
            .annotate(count=Count('patient_id'))  # Count the number of patients per month
            .order_by('month')
        )

        # Format the data for JSON response
        response_data = [
            {'month': item['month'].strftime('%B %Y'), 'count': item['count']}
            for item in data
        ]
        return JsonResponse(response_data, safe=False)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

# @csrf_exempt
def create_employee(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            role = data.get('role')
            email = data.get('email')
            password = data.get('password')
            name = data.get('name')

            if not role or not email or not password or not name:
                return JsonResponse({'error': 'Missing required fields'}, status=400)
            if role == 'admin':
                user = CustomUser.objects.create_superuser(email=email, password=password, role=role, name=name)
            else:
                user = CustomUser.objects.create_user(email=email, password=password, role=role, name=name)
            return JsonResponse({'message': 'User created successfully', 'user_id': user.employee_id}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

def get_patient_visits(request):
    if request.method == 'GET':
        try:
            today = date.today()
            patients = Patient.objects.filter(last_visited=today)
            visits = patients.count()

            # data = {
            #     "date": today,
            #     "visits": visits,
            # }
            return JsonResponse(patients)
        except Exception as e:
            return JsonResponse({'error': 'An error occurred while fetching patient visits.'}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
