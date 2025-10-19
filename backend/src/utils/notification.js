const { getIo } = require('./socket');

exports.sendNotification = (userId, message) => {
  const io = getIo();
  io.to(userId.toString()).emit('notification', { message });
};
