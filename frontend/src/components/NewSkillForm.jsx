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
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white via-teal-50 to-indigo-50 p-8 rounded-xl shadow-xl mb-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-extrabold mb-5 text-indigo-700 text-center">Post a New Skill Exchange</h2>
      <div className="mb-5">
        <label className="block font-semibold mb-2">Skill you want to learn*</label>
        <input
          type="text"
          className="w-full border-2 border-teal-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={skillRequired}
          onChange={(e) => setSkillRequired(e.target.value)}
          required
        />
      </div>
      <div className="mb-5">
        <label className="block font-semibold mb-2">Skill you can teach*</label>
        <input
          type="text"
          className="w-full border-2 border-teal-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={skillOffered}
          onChange={(e) => setSkillOffered(e.target.value)}
          required
        />
      </div>
      <div className="mb-5">
        <label className="block font-semibold mb-2">Description (optional)</label>
        <textarea
          className="w-full border-2 border-indigo-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-2">Category</label>
          <select
            className="w-full border-2 border-indigo-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-2">Location</label>
          <select
            className="w-full border-2 border-pink-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="Virtual">Virtual</option>
            <option value="In Person">In Person</option>
          </select>
        </div>
      </div>

      <div className="flex space-x-4 justify-end mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-teal-500 to-pink-500 text-white px-4 py-2 rounded-xl font-bold shadow hover:scale-105 transition"
        >
          Post Skill
        </button>
      </div>
    </form>
  );
}
