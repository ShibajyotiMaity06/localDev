import React from "react";
import { Link } from "react-router-dom";

const Hero = () => (
  <section className="bg-gradient-to-br from-cyan-100 via-teal-200 to-indigo-200 py-24 min-h-[55vh] flex flex-col items-center justify-center relative">
    <div className="absolute inset-0 pointer-events-none">
      <svg className="absolute top-0 right-0" viewBox="0 0 500 120" height="150" width="500">
        <path d="M0,40 C150,120 350,0 500,60 L500,00 L0,0 Z" fill="#4f46e5" opacity="0.13"></path>
      </svg>
    </div>
    <div className="relative z-10 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-700 mb-6 animate-fadein">
        Unlock Skills.<br />
        Empower Each Other.
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl mx-auto animate-fadein">
        Find your learning partner, teach what you love, and discover new horizons together. Here, <span className="text-teal-700 font-bold">sharing skills</span> is the center of everything.
      </p>
      <Link
        to="/skill-exchange"
        className="bg-gradient-to-r from-teal-500 via-indigo-500 to-pink-500 text-white font-bold text-xl px-8 py-4 rounded-full shadow-xl hover:scale-105 transform hover:-translate-y-1 transition-all duration-200 animate-bounce"
      >
        Start Sharing Skills
      </Link>
    </div>
    <img
      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
      alt="Skill exchange"
      className="mt-12 rounded-2xl shadow-2xl w-80 ring-4 ring-teal-100"
    />
  </section>
);

export default Hero;
