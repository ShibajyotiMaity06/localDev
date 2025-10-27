
import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:5000", {
        auth: { token: localStorage.getItem("token") },
      });

      // Join user room to receive targeted events
      socket.current.emit("join", user._id);

      socket.current.on("connect", () => {
        console.log("Connected to socket server:", socket.current.id);
      });

      socket.current.on("disconnect", () => {
        console.log("Disconnected from socket server");
      });

      // Cleanup on unmount or user logout
      return () => {
        socket.current.disconnect();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
