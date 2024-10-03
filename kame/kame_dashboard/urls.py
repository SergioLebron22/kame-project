from django.urls import path
from kame_dashboard.urls import views


urlpattenrs = [
    path('', views.dahboard, name="dashboard"),
    path('users/', views.users, name="users"),
    path("<str:user_id>/", views.get_user, name="get_user"),
    path("<str:user_id>/", views.update_user, name="update_user"),
    path("<str:user_id>/", views.delete_user, name="delete_user"),
    path('create_user/', views.create_user, name="create_user"),
    path('patients/', views.get_patients, name='patients'),

]
