import React, { useState } from "react";

export default function BookingForm({ providerId, onSubmit, onCancel }) {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ providerId, date, timeSlot, message });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Book Service</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="mb-3 w-full border rounded px-3 py-2"
      />
      <input
        type="time"
        value={timeSlot}
        onChange={(e) => setTimeSlot(e.target.value)}
        required
        className="mb-3 w-full border rounded px-3 py-2"
      />
      <textarea
        placeholder="Additional message (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="mb-3 w-full border rounded px-3 py-2"
      />
      <div className="flex justify-end space-x-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">
          Confirm Booking
        </button>
      </div>
    </form>
  );
}
