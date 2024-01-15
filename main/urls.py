from django.urls import path, include
from rest_framework import routers
from .views import TaskView, ProjectView

router = routers.DefaultRouter()


router.register(r'tasks', TaskView, "tasks")
router.register(r'projects', ProjectView, "projects")

urlpatterns = [

    path("api/", include(router.urls))

]