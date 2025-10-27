import React, { useState } from "react";

export default function ProviderForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [phone, setPhone] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!name || !profession || !phone || !hourlyRate) {
      setError("Please fill all required fields");
      return;
    }
    onSubmit({ name, profession, phone, hourlyRate: Number(hourlyRate), bio });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4"
    >
      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label className="block mb-1 font-semibold">Name*</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Profession*</label>
        <input
          type="text"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          placeholder="Carpenter, Electrician, Mechanic..."
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Phone*</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Hourly Rate (₹)*</label>
        <input
          type="number"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
          min="0"
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows="3"
          className="w-full border px-3 py-2 rounded"
          placeholder="Tell something about your skills, expertise..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-3 rounded hover:bg-teal-700 transition"
      >
        Save Profile
      </button>
    </form>
  );
}
