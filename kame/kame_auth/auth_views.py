from kame_app.models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.contrib.auth.hashers import check_password
from django.contrib.auth.decorators import login_required
from django.contrib.sessions.models import Session
import json

@require_POST
def login_view(request):
    try:
        data = json.loads(request.body)
        print(data)

        email = data['username']
        password = data['password']
        print(password)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'User does not exist'}, status=400)
        
        auth_user = authenticate(request, username=email, password=password)
        
        if auth_user is not None and check_password(password, auth_user.password):
            login(request, auth_user)
            session_id = request.session.session_key
            return JsonResponse({"message": 'Login successful', 'role': auth_user.role, 'name': auth_user.name, "sessionID": session_id}, status=200)
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid email or password'}, status=400)
    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON data'}, status=400)


def logout_view(request):
    session_id = request.headers.get('Authorization', '').replace('SessionID ', '')
    try:
        session = Session.objects.get(session_key=session_id)
        user_id = session.get_decoded().get('_auth_user_id')
        
        if user_id:
            logout(request)
            session.delete()
            return JsonResponse({"message": "log out successful!"}, status=200)
    except Session.DoesNotExist:
        return JsonResponse({'message': 'User alreadey logged out'})
    return JsonResponse({'message': 'User alreadey logged out'})

@ensure_csrf_cookie
def check_auth(request):
    session_id = request.headers.get('Authorization', '').replace('SessionID ', '')
    try:
        session = Session.objects.get(session_key=session_id)
        user_id = session.get_decoded().get('_auth_user_id')
        if user_id:
            print("is auth")
            return JsonResponse({'isAuthenticated': True})
    except Session.DoesNotExist:
        print("not auth")
        return JsonResponse({'isAuthenticated': False})
    return JsonResponse({'isAuthenticated': False})