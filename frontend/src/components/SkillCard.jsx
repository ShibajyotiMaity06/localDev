import React from "react";

export default function SkillCard({ skill, onAccept, onDelete, onComplete, userId }) {
  const isOwner = skill.userId._id === userId;
  const isAccepter = skill.acceptedBy && skill.acceptedBy === userId;

  const statusStyles = {
    Open: "bg-green-400",
    "In Progress": "bg-yellow-400",
    Completed: "bg-indigo-400"
  };

  return (
    <div className="rounded-xl shadow-xl p-6 bg-white hover:shadow-2xl border-t-4 border-teal-300 relative min-h-[350px] flex flex-col">
      <div className="mb-1 flex justify-between">
        <h3 className="text-xl font-bold text-teal-600">{skill.skillRequired}</h3>
        <span
          className={`ml-2 px-3 py-1 rounded-full text-white font-semibold ${statusStyles[skill.status] || "bg-gray-400"}`}
        >
          {skill.status}
        </span>
      </div>
      <p className="mb-2"><span className="font-medium text-indigo-500">Offered:</span> {skill.skillOffered}</p>
      <p className="mb-1"><span className="font-medium text-pink-500">Description:</span> {skill.description || 'N/A'}</p>
      <div className="flex gap-6 mb-2">
        <p><span className="font-semibold text-gray-700">Category:</span> {skill.category}</p>
        <p><span className="font-semibold text-gray-700">Location:</span> {skill.location || 'Virtual'}</p>
      </div>
      <p className="mb-1"><span className="font-semibold text-gray-700">Posted by:</span> {skill.userId.name}</p>
      <div className="mt-auto flex space-x-3">
        {skill.status === 'Open' && !isOwner && (
          <button
            onClick={() => onAccept(skill._id)}
            className="bg-teal-500 text-white px-4 py-2 rounded-xl shadow hover:bg-teal-600 font-bold transition"
          >
            Accept
          </button>
        )}
        {isOwner && (
          <button
            onClick={() => onDelete(skill._id)}
            className="bg-pink-500 text-white px-4 py-2 rounded-xl shadow hover:bg-pink-600 font-bold transition"
          >
            Delete
          </button>
        )}
        {/* Mark Complete button - only for owner or accepter */}
        {skill.status === "In Progress" && (isOwner || isAccepter) && (
          <button
            onClick={() => onComplete(skill._id)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-700 font-bold transition"
          >
            Mark as Completed
          </button>
        )}

        <p>
  <strong>Accepted By:</strong> {skill.acceptedBy ? skill.acceptedBy.name : "Not accepted yet"}
</p>
      </div>
    </div>
  );
}
