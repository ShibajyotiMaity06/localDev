// src/api/bookings.api.js
import api from './axios';

/**
 * createBooking
 * body: { providerId, date, timeSlot, message }
 */
export const createBooking = async (body) => {
  const res = await api.post('/bookings', body);
  return res.data;
};

/**
 * getBookings
 * role: 'provider' or 'user' (backend expects query param 'role')
 */
export const getBookings = async (role = 'user') => {
  const res = await api.get('/bookings', { params: { role } });
  return res.data; // array
};

/**
 * updateBookingStatus
 * id: bookingId
 * body: { status: 'Accepted'|'Declined'|'Completed'|'Pending', message? }
 */
export const updateBookingStatus = async (id, body) => {
  const res = await api.put(`/bookings/${id}`, body);
  return res.data;
};
