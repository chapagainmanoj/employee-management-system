from django.shortcuts import render
from rest_framework.decorators import (
    api_view,
    renderer_classes
)
from rest_framework.renderers import TemplateHTMLRenderer

def register_page(request):
    context = {}
    return render(request, 'user/loginjoin.html', context)

def login_page(request):
    context = {}
    return render(request, 'user/loginjoin.html', context)

def app(request):
    context = {}
    return render(request, 'user/app.html', context)