from django.urls import path
from rest_framework.routers import SimpleRouter
from .apis import UserAPI
from . import views

router = SimpleRouter()
router.register(r'api/user', UserAPI, basename='user')

urlpatterns = [
    path('register/', views.register_page, name='register-page'),
    path('login/', views.login_page, name='login-page'),
    path('', views.app, name='app-page'),
]
urlpatterns += router.urls