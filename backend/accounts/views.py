from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class RegisterView(APIView):
    def post(self, request):
        return Response({'message': 'Register success'}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        return Response({'message': 'Login success'}, status=status.HTTP_200_OK)
