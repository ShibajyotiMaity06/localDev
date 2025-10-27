import React, { useEffect, useState, useRef } from "react";
import { sendMessage, fetchMessages } from "../services/messageAPI";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";

export default function MessageBox({ chatPartnerId }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.emit("join", user._id);

    socket.current.on("newMessage", (msg) => {
      if (msg.senderId === chatPartnerId || msg.receiverId === chatPartnerId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.current.disconnect();
    };
  }, [chatPartnerId, user._id]);

  useEffect(() => {
    if (chatPartnerId) {
      fetchMessages(chatPartnerId, localStorage.getItem("token"))
        .then((msgs) => setMessages(msgs))
        .catch(console.error);
    }
  }, [chatPartnerId]);

  const handleSend = async () => {
    if (!text.trim()) return;
    try {
      const msg = await sendMessage(
        {
          receiverId: chatPartnerId,
          receiverModel: "User", // adjust as needed; ideally dynamic
          senderModel: user.role === "ServiceProvider" ? "ServiceProvider" : "User",
          content: text,
        },
        localStorage.getItem("token")
      );
      setMessages([...messages, msg]);
      setText("");
    } catch (error) {
      alert("Failed to send message");
    }
  };

  return (
    <div className="border rounded p-4 max-w-md flex flex-col h-96 bg-white">
      <div className="flex-grow overflow-auto mb-2">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`mb-2 p-2 rounded max-w-xs ${
              m.senderId === user._id ? "bg-teal-200 self-end" : "bg-gray-300"
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          className="flex-grow border rounded px-3 py-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-teal-600 px-4 text-white rounded hover:bg-teal-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}