const { Server } = require('socket.io');

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: { origin: '*', credentials: true }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join a room based on user ID for targeted messages
    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`User joined room: ${userId}`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
}

function getIo() {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
}

module.exports = { initSocket, getIo };
