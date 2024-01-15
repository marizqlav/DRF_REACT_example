from .serializers import TaskSerializer, ProjectSerializer
from .models import Task, Project

from rest_framework import viewsets

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer # el apartado b el serializer TaskSerializer, la clase que quiero convertir en JSON
    queryset = Task.objects.all() # el apartado a el modelo Task

#API REST FULL con modelo complejo
class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer # el apartado b el serializer ProjectSerializer, la clase que quiero convertir en JSON
    queryset = Project.objects.all() # el apartado a el modelo Project