from rest_framework.routers import SimpleRouter
from .apis import ProfileAPI, AcademicAPI, WorkExperienceAPI

router = SimpleRouter()
router.register(r'api/profile', ProfileAPI, basename='profile')
router.register(r'api/academic', AcademicAPI, basename='academic')
router.register(r'api/workexperience', WorkExperienceAPI, basename='workexperience')

urlpatterns = []
urlpatterns += router.urls