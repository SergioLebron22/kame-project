from django.urls import path 
from . import dashboard_views


urlpatterns = [
    path("users/", dashboard_views.users, name="users"),
    path("<str:user_id>/", dashboard_views.get_user, name="get_user"),
    path("<str:user_id>/", dashboard_views.update_user, name="update_user"),
    path("<str:user_id>/", dashboard_views.delete_user, name="delete_user"),
    path("create_user/", dashboard_views.create_user, name="create_user"),
    path("", dashboard_views.dashboard, name="dashboard"),
]