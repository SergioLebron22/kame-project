from django.urls import path
from . import views


urlpatterns = [
    path('', views.dashboard, name="dashboard"),
    path('users/', views.users, name="users"),
    path('patients_dashboard/', views.get_patients_dashboard, name='patients_dashboard'),
    path("<str:employee_id>/", views.get_user, name="get_user"),
    path("<str:employee_id>/update/", views.update_user, name="update_user"),
    path("<str:employee_id>/delete/", views.delete_user, name="delete_user"),
    path('create_employee/', views.create_employee, name="create_user")
]
