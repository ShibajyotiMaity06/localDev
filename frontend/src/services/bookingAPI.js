const API_BASE = 'http://localhost:5000/api/bookings';

export async function createBooking(data, token) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Booking failed');
  return res.json();
}

export async function fetchBookings(role, token) {
  const res = await fetch(`${API_BASE}?role=${role}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to load bookings');
  return res.json();
}

export async function updateBookingStatus(id, statusData, token) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(statusData)
  });
  if (!res.ok) throw new Error('Failed to update booking');
  return res.json();
}
