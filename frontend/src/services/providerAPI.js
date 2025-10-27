const API_BASE = 'http://localhost:5000/api/providers';

export async function fetchProviders(filters = {}) {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_BASE}?${query}`);
  if (!res.ok) throw new Error('Failed to fetch providers');
  return res.json();
}


export async function createProvider(data, token) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create provider profile');
  return res.json();
}