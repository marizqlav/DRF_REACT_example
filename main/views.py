from .serializers import TaskSerializer, ProjectSerializer
from .models import Task, Project

from rest_framework import viewsets, permissions

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer # el apartado b el serializer TaskSerializer, la clase que quiero convertir en JSON
    queryset = Task.objects.all() # el apartado a el modelo Task
        #sobreescribes los permisos que se configuran en settings.py para que funcione la libreria
    permission_classes = [permissions.AllowAny]


#API REST FULL con modelo complejo
class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer # el apartado b el serializer ProjectSerializer, la clase que quiero convertir en JSON
    queryset = Project.objects.all() # el apartado a el modelo Project
    #sobreescribes los permisos que se configuran en settings.py para que funcione la libreria
    permission_classes = [permissions.AllowAny]
