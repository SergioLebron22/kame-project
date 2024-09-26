from django.urls import path 
from . import dataviews


urlspatterns = [
    path("users/", dataviews.users, name="users"),
    path("<str:user_id>/", dataviews.get_user, name="get_user"),
    path("<str:user_id>/", dataviews.update_user, name="update_user"),
    path("<str:user_id>/", dataviews.delete_user, name="delete_user"),
    path("create_user/", dataviews.create_user, name="create_user"),
    path("", dataviews.dashboard, name="dashboard"),
]