import json
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from django.http import HttpResponseRedirect
from .serializers import UserSerializer

def get_user_info(user, request):
    user_info = UserSerializer(request.user).data
    return user_info

def register_page(request):
    if request.user.is_authenticated:
        redirect('app-page')
    context = {}
    return render(request, 'user/loginjoin.html', context)

def login_page(request):
    print('login page', request.user.is_authenticated)
    if request.user.is_authenticated:
        redirect('app-page')
        # HttpResponseRedirect(reverse('app-page'))
    context = {}
    return render(request, 'user/loginjoin.html', context)

@login_required(login_url='/login/')
def app(request):  
    context={"k_": json.dumps(get_user_info(request.user, request))}
    return render(request, 'user/app.html', context)