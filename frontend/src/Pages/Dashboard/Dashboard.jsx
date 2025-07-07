import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaPhoneAlt, FaVideo, FaEllipsisV, FaUsers, FaImage } from 'react-icons/fa';

const ChatDashboard = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [activeContact, setActiveContact] = useState(1);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState({ 1: [], 2: [] });
  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  const contacts = [
    { id: 1, name: 'Kaluna', lastSeen: 'Online', unread: 0, avatar: 'K' },
    { id: 2, name: 'Dahesa', lastSeen: '2 jam lalu', unread: 1, avatar: 'D' },
  ];

  const getRoomName = (contactId) => {
    return contacts.find(c => c.id === contactId)?.name.toLowerCase() || 'default';
  };

  const connectWebSocket = (contactId) => {
    const roomName = getRoomName(contactId);
    const wsUrl = `ws://127.0.0.1:9000/ws/chat/${roomName}/`;




    if (ws.current) {
      ws.current.close();
    }

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log(`Connected to room: ${roomName}`);
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.message) {
        const newMessage = {
          id: Date.now(),
          sender: data.sender,
          text: data.message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: data.sender === 'You',
        };

        setChats(prev => ({
          ...prev,
          [contactId]: [...prev[contactId], newMessage],
        }));
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket closed');
    };
  };

  useEffect(() => {
    connectWebSocket(activeContact);
    return () => {
      if (ws.current) ws.current.close();
    };
  }, [activeContact]);

  const sendMessage = () => {
    if (message.trim() !== '' && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        message,
        sender: 'You',
      }));
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const getContactAvatar = (contactId) => contacts.find(c => c.id === contactId)?.avatar || '?';
  const getContactName = (contactId) => contacts.find(c => c.id === contactId)?.name || 'Unknown';
  const getContactStatus = (contactId) => contacts.find(c => c.id === contactId)?.lastSeen || '';
  const messages = chats[activeContact];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col">
          <div className="p-4 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center text-white font-bold text-lg">Y</div>
              <div>
                <p className="font-semibold text-gray-800">You</p>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="text-gray-500 hover:text-teal-600"><FaUsers size={18} /></button>
              <button className="text-gray-500 hover:text-teal-600"><FaEllipsisV size={18} /></button>
            </div>
          </div>

          <div className="flex bg-gray-100 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('chats')}
              className={`flex-1 py-3 text-center font-medium text-sm transition-colors ${
                activeTab === 'chats' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >Chat</button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {contacts.map(contact => (
              <div
                key={contact.id}
                onClick={() => setActiveContact(contact.id)}
                className={`flex items-center p-3 border-b border-gray-100 cursor-pointer transition-colors ${
                  activeContact === contact.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                  contact.lastSeen === 'Online'
                    ? 'bg-gradient-to-r from-teal-500 to-green-500 ring-2 ring-teal-300'
                    : 'bg-gradient-to-r from-gray-400 to-gray-500'
                }`}>
                  {contact.avatar}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold text-gray-800 truncate">{contact.name}</p>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{contact.lastSeen}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-500 truncate">
                      {chats[contact.id][chats[contact.id].length - 1]?.text || 'Mulai percakapan'}
                    </p>
                    {contact.unread > 0 && (
                      <span className="bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-[#f0f2f5] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent z-0" />
          <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center text-white font-bold text-lg">
                {getContactAvatar(activeContact)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{getContactName(activeContact)}</p>
                <p className="text-xs text-gray-500">{getContactStatus(activeContact)}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-teal-600 hover:bg-teal-50 shadow-sm"><FaPhoneAlt size={16} /></button>
              <button className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white hover:bg-teal-700 shadow-sm"><FaVideo size={18} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-3 z-10">
            <div className="text-center my-4">
              <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Chat dengan {getContactName(activeContact)}
              </span>
            </div>

            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
                  msg.isMe ? 'bg-teal-500 text-white rounded-br-none' : 'bg-white border border-gray-200 rounded-bl-none'
                } shadow-sm`}>
                  <p>{msg.text}</p>
                  <div className={`text-xs mt-1 ${msg.isMe ? 'text-teal-100 text-right' : 'text-gray-500'}`}>{msg.time}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-200 flex items-center z-10">
            <button className="w-10 h-10 rounded-full text-gray-500 hover:text-teal-600 hover:bg-gray-100 flex items-center justify-center">
              <FaImage size={18} />
            </button>
            <div className="flex-1 mx-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pesan..."
                className="w-full min-h-[40px] max-h-24 px-4 py-2 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                rows="1"
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                message.trim()
                  ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-md transform hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <FaPaperPlane size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;
