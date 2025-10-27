import React from "react";

export default function SkillCard({ skill, onAccept, onDelete, userId }) {
  const isOwner = skill.userId._id === userId;

  return (
    <div className="border rounded p-4 shadow mb-4 bg-white">
      <h3 className="text-lg font-semibold text-teal-600">{skill.skillRequired}</h3>
      <p><strong>Offered:</strong> {skill.skillOffered}</p>
      <p><strong>Description:</strong> {skill.description || 'N/A'}</p>
      <p><strong>Category:</strong> {skill.category}</p>
      <p><strong>Location:</strong> {skill.location || 'Virtual'}</p>
      <p><strong>Posted by:</strong> {skill.userId.name}</p>
      <p><strong>Status:</strong> 
        <span className={`ml-2 px-2 py-1 rounded text-white ${
          skill.status === 'Open' ? 'bg-green-500' :
          skill.status === 'In Progress' ? 'bg-yellow-500' :
          'bg-gray-500'
        }`}>
          {skill.status}
        </span>
      </p>

      <div className="mt-3 flex space-x-3">
        {skill.status === 'Open' && !isOwner && (
          <button
            onClick={() => onAccept(skill._id)}
            className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 transition"
          >
            Accept
          </button>
        )}
        {isOwner && (
          <button
            onClick={() => onDelete(skill._id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
