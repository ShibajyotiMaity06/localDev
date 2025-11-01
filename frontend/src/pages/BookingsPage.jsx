import { useEffect, useState } from 'react';
import { getBookings, updateBookingStatus } from '../api/bookingApi';
import Button from '../components/UI/Button';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const data = await getBookings();
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateBookingStatus(id, status);
    fetchBookings();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>
      <div className="grid gap-4">
        {bookings.map((b) => (
          <div key={b._id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{b.providerName}</p>
              <p className="text-sm text-gray-600">{b.date} - {b.timeSlot}</p>
              <p className="text-sm text-gray-600">Status: {b.status}</p>
            </div>
            <div className="flex gap-2">
              {b.status === 'pending' && (
                <>
                  <Button onClick={() => handleStatusChange(b._id, 'confirmed')}>Confirm</Button>
                  <Button className="bg-red-500 hover:bg-red-600" onClick={() => handleStatusChange(b._id, 'cancelled')}>Cancel</Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
