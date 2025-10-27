import React, { useState } from "react";

const categories = ["Coding", "Art", "Others"];

export default function NewSkillForm({ onSubmit, onCancel }) {
  const [skillRequired, setSkillRequired] = useState("");
  const [skillOffered, setSkillOffered] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Coding");
  const [location, setLocation] = useState("Virtual");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ skillRequired, skillOffered, description, category, location });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-teal-600">Post a new skill exchange</h2>
      <div className="mb-3">
        <label className="block font-medium mb-1">Skill you want to learn</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={skillRequired}
          onChange={(e) => setSkillRequired(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="block font-medium mb-1">Skill you can teach</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={skillOffered}
          onChange={(e) => setSkillOffered(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="block font-medium mb-1">Description (optional)</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="block font-medium mb-1">Category</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block font-medium mb-1">Location</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="Virtual">Virtual</option>
          <option value="In Person">In Person</option>
        </select>
      </div>

      <div className="flex space-x-4 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
        >
          Post Skill
        </button>
      </div>
    </form>
  );
}
