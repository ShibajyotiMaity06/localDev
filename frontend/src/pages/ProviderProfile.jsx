import React, { useState, useEffect } from "react";
import BookingForm from "../components/BookingForm";
import { createBooking } from "../services/bookingAPI";
import { useAuth } from "../context/AuthContext";

export default function ProviderProfile({ provider, onClose }) {
  const { user } = useAuth();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [error, setError] = useState("");

  if (!provider) return null;

  const handleBookingSubmit = async (data) => {
    try {
      await createBooking(data, localStorage.getItem("token"));
      alert("Booking submitted successfully!");
      setShowBookingForm(false);
      onClose(); // close profile after booking
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-6">
      <div className="bg-white rounded shadow max-w-xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <img
          src={provider.profilePic || "/default-avatar.png"}
          alt={provider.name}
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-2xl font-bold mb-2 text-teal-600">{provider.name}</h2>
        <p className="text-lg font-semibold">{provider.profession}</p>
        <p className="mt-3">{provider.bio || "No bio available."}</p>
        <p className="mt-3"><strong>Hourly Rate:</strong> ₹{provider.hourlyRate}</p>
        <p><strong>Rating:</strong> {provider.Rating?.toFixed(1) || "N/A"}</p>
        {/* Optional: show calendar availability here */}
        {error && <p className="text-red-600 my-2">{error}</p>}
        {showBookingForm ? (
          <BookingForm
            providerId={provider._id}
            onSubmit={handleBookingSubmit}
            onCancel={() => setShowBookingForm(false)}
          />
        ) : (
          user && user.role !== "ServiceProvider" && (
            <button
              onClick={() => setShowBookingForm(true)}
              className="mt-4 px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
            >
              Book Now
            </button>
          )
        )}
      </div>
    </div>
  );
}
