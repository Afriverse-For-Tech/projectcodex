from . import views
from django.urls import path

urlpatterns = [
    path('', views.index, name='index'),
    path('result/', views.result, name='result'),
]