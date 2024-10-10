from kame_app.models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
import json

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            email = data['email']
            password = data['password']

            user = CustomUser.objects.get(email=email)
            
            if user is not None and check_password(password, user.password):
                login(request, user)
                return JsonResponse(user.to_dict(), status=200)
            else:
                return JsonResponse({'status': 'error', 'message': 'Invalid email or password'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON data'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed'}, status=405)

@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'status': 'success', 'message': 'Logged out successfully'}, status=200)
    return JsonResponse({'status': 'error', 'message': 'Only POST request are allowed'}, status=405)