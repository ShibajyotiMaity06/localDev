// src/api/messages.api.js
import api from './axios';

/**
 * sendMessage
 * We include both 'content' and 'message' in payload to tolerate backend schema mismatch.
 * body: { receiverId, content }  // will also send message:content
 */
export const sendMessage = async ({ receiverId, content, receiverModel = 'User', senderModel = 'User' }) => {
  const payload = {
    receiverId,
    content,
    message: content,        // defensive: some versions of backend expect 'message'
    receiverModel,
    senderModel,
  };
  const res = await api.post('/messages', payload);
  return res.data;
};

/**
 * getMessages
 * receiverId - id of the other party (the controller expects param receiverId)
 * returns full convo sorted by createdAt asc (backend sorts by createdAt:1)
 */
export const getMessages = async (receiverId) => {
  const res = await api.get(`/messages/${receiverId}`);
  return res.data;
};
