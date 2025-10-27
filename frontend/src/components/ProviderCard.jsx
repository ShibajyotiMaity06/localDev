import React from "react";

export default function ProviderCard({ provider, onSelect }) {
  return (
    <div className="border rounded p-4 shadow cursor-pointer hover:shadow-lg" onClick={() => onSelect(provider)}>
      <img
        src={provider.profilePic || '/default-avatar.png'}
        alt={provider.name}
        className="w-16 h-16 rounded-full mb-2"
      />
      <h3 className="text-lg font-semibold text-teal-600">{provider.name}</h3>
      <p className="text-sm text-gray-600">{provider.profession}</p>
      <p className="text-yellow-500">Rating: {provider.Rating?.toFixed(1) || 'N/A'}</p>
      <p>Hourly Rate: ₹{provider.hourlyRate}</p>
      <p>Status: {provider.status}</p>
      <p className="text-sm truncate">{provider.bio}</p>
    </div>
  );
}
