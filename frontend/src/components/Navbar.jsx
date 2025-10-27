import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-teal-600">
        <Link to="/">LocalHub</Link>
      </div>

      <ul className="flex items-center space-x-6 text-gray-700">
        <li><Link className="hover:text-teal-600" to="/">Home</Link></li>
        <li><Link className="hover:text-teal-600" to="/skill-exchange">Skill Exchange</Link></li>
        <li><Link className="hover:text-teal-600" to="/services">Services</Link></li>

        {user ? (
          <>
            <button className="text-gray-600 ">Hi, {user.name}</button>
            <li>
              <button
                onClick={logout}
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
              >
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
                to="/login"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                className="border border-teal-600 text-teal-600 px-4 py-2 rounded hover:bg-teal-100 transition"
                to="/register"
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
