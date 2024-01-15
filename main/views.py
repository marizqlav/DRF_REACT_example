from .serializers import TaskSerializer
from .models import Task

from rest_framework import viewsets

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer # el apartado b el serializer TaskSerializer, la clase que quiero convertir en JSON
    queryset = Task.objects.all() # el apartado a el modelo Task