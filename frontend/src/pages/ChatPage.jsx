import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getMessages, sendMessage } from '../api/messageApi';
import ChatWindow from '../components/ChatWindow';

const socket = io(import.meta.env.VITE_BACKEND_URL);

export default function ChatPage({ userId, receiverId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('join', userId);
    loadMessages();

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, []);

  const loadMessages = async () => {
    const data = await getMessages(receiverId);
    setMessages(data);
  };

  const handleSend = async (content) => {
    const msg = await sendMessage({ receiverId, message: content });
    socket.emit('message', msg);
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <div className="p-6 h-[80vh]">
      <h1 className="text-2xl font-semibold mb-4">Chat</h1>
      <ChatWindow socket={socket} userId={userId} receiverId={receiverId} messages={messages} onSend={handleSend} />
    </div>
  );
}
