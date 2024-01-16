from django.urls import path, include
from rest_framework import routers
from .views import TaskView, ProjectView
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()


router.register(r'tasks', TaskView, "tasks")
router.register(r'projects', ProjectView, "projects")

urlpatterns = [

    path("api/", include(router.urls)),
    path("auth/", include("djoser.urls")),# para autenticacion
    path("auth/", include("djoser.urls.authtoken")), # para autenticacion
    path("auth/", include("djoser.urls.jwt")), # para autenticacion
    path("", include_docs_urls(
        title="Complete API REST FULL including authentication")),

]