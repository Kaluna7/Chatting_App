from django.urls import path
from django.http import JsonResponse

def hello(request):
    return JsonResponse({'message': 'Hello from Django API!'})

urlpatterns = [
    path('', hello),
]
