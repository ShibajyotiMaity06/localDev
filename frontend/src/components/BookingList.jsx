import React from "react";

export default function BookingList({ bookings, userRole, onUpdateStatus }) {
  if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <div>
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="border p-4 rounded shadow mb-4 bg-white"
        >
          <p><strong>Service Provider:</strong> {booking.providerId?.name || "N/A"}</p>
          <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
          <p><strong>Time Slot:</strong> {booking.timeSlot || "N/A"}</p>
          <p><strong>Status:</strong> {booking.status}</p>

          {userRole === "ServiceProvider" && booking.status === "Pending" && (
            <div className="mt-2 space-x-2">
              <button
                onClick={() => onUpdateStatus(booking._id, "Accepted")}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Accept
              </button>
              <button
                onClick={() => onUpdateStatus(booking._id, "Declined")}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Decline
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
