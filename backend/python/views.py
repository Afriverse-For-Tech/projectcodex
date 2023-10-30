# from django.shortcuts import render 
from django.http import HttpResponse


def home_page_view(request):
    return HttpResponse("Hello, World!")

# Create your views here.
