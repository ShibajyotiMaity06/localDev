const API_BASE = 'http://localhost:5000/api/messages';

export async function sendMessage(data, token) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
}

export async function fetchMessages(receiverId, token) {
  const res = await fetch(`${API_BASE}/${receiverId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch messages');
  return res.json();
}
