import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="bg-gray-50 py-20 text-center max-w-5xl mx-auto px-4">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
        Connect Locally, Grow Together
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
        Sell, lend, hire, or learn from people in your community with LocalHub.
      </p>

      {user ? (
        <Link to="/dashboard">
          <button className="bg-teal-600 text-white text-lg px-8 py-4 rounded-lg shadow hover:bg-teal-700 transition">
            Go to Dashboard
          </button>
        </Link>
      ) : (
        <Link to="/register">
          <button className="bg-teal-600 text-white text-lg px-8 py-4 rounded-lg shadow hover:bg-teal-700 transition">
            Get Started
          </button>
        </Link>
      )}
    </section>
  );
};

export default Hero;
