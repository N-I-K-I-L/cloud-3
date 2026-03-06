from django.urls import path, re_path
from . import views


urlpatterns = [
    re_path(r'^(?!api/|admin/|static/|media/).*$' , views.spa_entry, name='spa-entry'),
]
