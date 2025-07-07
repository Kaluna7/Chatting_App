import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message
from asgiref.sync import sync_to_async  # Tambahkan ini

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Bergabung ke group channel
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        # Terima koneksi WebSocket
        await self.accept()

    async def disconnect(self, close_code):
        # Keluar dari group channel
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        sender = data.get('sender', 'Anonymous')

        # Simpan message ke database secara async
        await sync_to_async(Message.objects.create)(
            sender=sender,
            room_name=self.room_name,
            content=message
        )

        # Kirim ke semua client di group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender': sender,
            }
        )

    async def chat_message(self, event):
        # Kirim message ke WebSocket client
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'sender': event['sender'],
        }))
