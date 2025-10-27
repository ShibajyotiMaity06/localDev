const API_BASE = 'http://localhost:5000/api/skill-exchange';

export async function fetchSkillExchanges(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}?${query}`);
  if (!res.ok) throw new Error('Failed to fetch skill exchanges');
  return res.json();
}


export async function createNewSkill(data, token) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create skill exchange');
  return res.json();
}

export async function acceptSkillExchange(id, token) {
  const res = await fetch(`${API_BASE}/${id}/accept`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to accept skill exchange');
  return res.json();
}

// Delete skill exchange by ID
export async function deleteSkillExchange(id, token) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to delete skill exchange');
  return res.json();
}
