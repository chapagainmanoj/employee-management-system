from django.shortcuts import render
from django.contrib.auth.decorators import login_required

def register_page(request):
    context = {}
    return render(request, 'user/loginjoin.html', context)

def login_page(request):
    context = {}
    return render(request, 'user/loginjoin.html', context)

@login_required(login_url='/login/')
def app(request):
    context = {}
    return render(request, 'user/app.html', context)