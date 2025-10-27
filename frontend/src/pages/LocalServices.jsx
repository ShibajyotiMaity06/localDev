import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchProviders } from "../services/providerAPI";
import { createBooking, fetchBookings, updateBookingStatus } from "../services/bookingAPI";
import ProviderCard from "../components/ProviderCard";
import BookingForm from "../components/BookingForm";

export default function LocalServices() {
  const { user } = useAuth();
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [professionFilter, setProfessionFilter] = useState("");

  useEffect(() => {
    loadProviders();
    loadBookings();
  }, [professionFilter]);

  async function loadProviders() {
    setLoading(true);
    try {
      const data = await fetchProviders(professionFilter ? { profession: professionFilter } : {});
      setProviders(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadBookings() {
    if (!user) return;
    try {
      const role = user.role === 'ServiceProvider' ? 'provider' : 'user';
      const data = await fetchBookings(role, localStorage.getItem('token'));
      setBookings(data);
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleBookingSubmit(data) {
    try {
      await createBooking(data, localStorage.getItem('token'));
      alert("Booking request sent!");
      setShowBookingForm(false);
      loadBookings();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleUpdateBooking(id, status) {
    try {
      await updateBookingStatus(id, { status }, localStorage.getItem('token'));
      loadBookings();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Browse Service Providers</h1>
      
      <div className="mb-6">
        <label className="mr-4 font-medium">Filter by Profession:</label>
        <select
          className="border rounded px-3 py-2"
          value={professionFilter}
          onChange={(e) => setProfessionFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="carpenter">Carpenter</option>
          <option value="electrician">Electrician</option>
          <option value="mechanic">Mechanic</option>
          {/* More professions */}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {loading ? (
          <p>Loading providers...</p>
        ) : providers.length === 0 ? (
          <p>No providers found.</p>
        ) : (
          providers.map((provider) => (
            <ProviderCard key={provider._id} provider={provider} onSelect={setSelectedProvider} />
          ))
        )}
      </div>

      {selectedProvider && (
        <BookingForm
          providerId={selectedProvider._id}
          onSubmit={handleBookingSubmit}
          onCancel={() => setSelectedProvider(null)}
        />
      )}

      <h2 className="text-2xl font-semibold mb-4 text-teal-600">My Bookings</h2>
      <div>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((booking) => (
            <div key={booking._id} className="border p-4 rounded mb-3 bg-white shadow">
              <p><strong>Service:</strong> {booking.providerId.name}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Time slot:</strong> {booking.timeSlot || 'N/A'}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              {user.role === 'ServiceProvider' && booking.status === "Pending" && (
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleUpdateBooking(booking._id, 'Accepted')}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleUpdateBooking(booking._id, 'Declined')}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
