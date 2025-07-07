from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import MessageSerializer
from .models import Message

class ChatView(APIView):
    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Message sent'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        room_name = request.query_params.get('room_name')
        msgs = Message.objects.filter(room_name=room_name).order_by('timestamp')
        serializer = MessageSerializer(msgs, many=True)
        return Response(serializer.data)