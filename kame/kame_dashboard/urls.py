from django.urls import path
from . import views


urlpatterns = [
    path('', views.dashboard, name="dashboard"),
    path('users/', views.users, name="users"),
    path('pacientes/', views.get_patients, name='patients'),
    path("<str:employee_id>/", views.get_user, name="get_user"),
    path("<str:employee_id>/update/", views.update_user, name="update_user"),
    path("<str:employee_id>/delete/", views.delete_user, name="delete_user"),
    path('create_user/', views.create_user, name="create_user")
]
