from django.urls import path
from . import auth_views

urlpatterns = [
    path('login/', auth_views.login_view, name="login"),
    path('logout/', auth_views.logout_view, name='logout'),
    path('check-auth/', auth_views.check_auth, name="check_auth")
]