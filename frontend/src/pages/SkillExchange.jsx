import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  fetchSkillExchanges,
  createNewSkill,
  acceptSkillExchange,
  deleteSkillExchange,
} from "../services/skillExchangeAPI";
import SkillCard from "../components/SkillCard";
import NewSkillForm from "../components/NewSkillForm";

export default function SkillExchange() {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    loadSkills();
  }, [search, category]);

  async function loadSkills() {
    setLoading(true);
    setError("");
    try {
      const data = await fetchSkillExchanges({ search, category });
      setSkills(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handlePostSkill(data) {
    setError("");
    try {
      await createNewSkill(data, localStorage.getItem("token"));
      setShowForm(false);
      loadSkills();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleAccept(id) {
    setError("");
    try {
      await acceptSkillExchange(id, localStorage.getItem("token"));
      loadSkills();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    setError("");
    try {
      await deleteSkillExchange(id, localStorage.getItem("token"));
      loadSkills();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 text-teal-600">Skill Exchange</h1>

      <div className="flex mb-4 space-x-4">
        <input
          type="text"
          placeholder="Search skills..."
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 flex-grow"
        />
        <select
          className="border rounded px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          <option value="Coding">Coding</option>
          <option value="Art">Art</option>
          <option value="Others">Others</option>
        </select>

        <button
          onClick={() => setShowForm(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
        >
          Post Skill
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {showForm && (
        <NewSkillForm onSubmit={handlePostSkill} onCancel={() => setShowForm(false)} />
      )}

      {loading ? (
        <p>Loading...</p>
      ) : skills.length === 0 ? (
        <p>No skill exchange posts found.</p>
      ) : (
        skills.map((skill) => (
          <SkillCard
            key={skill._id}
            skill={skill}
            onAccept={handleAccept}
            onDelete={handleDelete}
            userId={user?._id}
          />
        ))
      )}
    </div>
  );
}
