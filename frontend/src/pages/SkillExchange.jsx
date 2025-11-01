import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  fetchSkillExchanges,
  createNewSkill,
  acceptSkillExchange,
  deleteSkillExchange,
  completeSkillExchange,
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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9; // 3x3 grid

  useEffect(() => {
    loadSkills();
    setCurrentPage(1); // reset to first page on new filter/search
    // eslint-disable-next-line
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

  async function handleComplete(id) {
    setError("");
    try {
      await completeSkillExchange(id, localStorage.getItem("token"));
      loadSkills();
    } catch (err) {
      setError(err.message);
    }
  }

  // --- Pagination logic ---
  const totalPages = Math.ceil(skills.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentSkills = skills.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="min-h-screen bg-gradient-to-tl from-teal-100 via-indigo-50 to-pink-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700 drop-shadow">
          Skill Exchange
        </h1>

        <div className="flex flex-col md:flex-row md:space-x-4 items-center mb-8 justify-center">
          <input
            type="text"
            placeholder="🔍 Search skills..."
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-teal-300 rounded-xl px-4 py-3 flex-grow focus:outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50 font-medium max-w-xs mb-3 md:mb-0"
          />

          <select
            className="border-2 border-indigo-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-indigo-50 max-w-xs"
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
            className="bg-gradient-to-r from-teal-500 to-pink-500 text-white font-bold px-6 py-3 rounded-xl shadow hover:scale-105 transition ml-0 md:ml-6 mt-3 md:mt-0"
          >
            Post Skill
          </button>
        </div>

        {error && <p className="text-center text-red-600 mb-4">{error}</p>}
        {showForm && (
          <NewSkillForm onSubmit={handlePostSkill} onCancel={() => setShowForm(false)} />
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin h-10 w-10 border-4 border-teal-300 border-t-transparent rounded-full"></div>
          </div>
        ) : skills.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No skill exchange posts found.</p>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {currentSkills.map((skill) => (
                <SkillCard
                  key={skill._id}
                  skill={skill}
                  onAccept={handleAccept}
                  onDelete={handleDelete}
                  onComplete={handleComplete}
                  userId={user?._id}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-14">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full font-bold transition ${
                    currentPage === i + 1
                      ? "bg-teal-600 text-white shadow"
                      : "bg-gray-200 hover:bg-pink-200 text-gray-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
