import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-500 shadow-lg px-8 py-4 flex justify-between items-center sticky top-0 z-20">
      <div className="text-3xl font-extrabold text-white tracking-wide drop-shadow-md">
        <Link to="/">LocalHub</Link>
      </div>
      <ul className="flex items-center space-x-6">
        <li>
          <Link
            to="/skill-exchange"
            className="text-white hover:bg-indigo-600 hover:text-teal-100 px-4 py-2 rounded transition"
          >
            Share Skills
          </Link>
        </li>
        {user ? (
          <>
            <button className="text-white bg-white/10 px-3 py-1 rounded-xl font-semibold transition hover:bg-white/20">
              Hi, {user.name}
            </button>
            <li>
              <button
                onClick={logout}
                className="bg-pink-500 text-white px-5 py-2 rounded-xl shadow hover:bg-pink-600 transition font-medium"
              >
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-xl shadow hover:bg-teal-50 transition"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="border-2 border-white text-white font-semibold px-4 py-2 rounded-xl hover:bg-white/20 transition"
              >
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
