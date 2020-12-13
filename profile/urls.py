from rest_framework.routers import SimpleRouter
from .apis import ProfileAPI

router = SimpleRouter()
router.register(r'api/profile', ProfileAPI, basename='profile')

urlpatterns = []
urlpatterns += router.urls