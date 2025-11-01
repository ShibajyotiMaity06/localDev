import { io } from 'socket.io-client';

let socket;

export const initSocket = (userId) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit('join', userId);
  }
  return socket;
};

export const getSocket = () => socket;
