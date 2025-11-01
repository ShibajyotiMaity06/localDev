import React from "react";

const icons = {
  "Skill Exchange": (
    <svg className="w-12 h-12 text-teal-500 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6A2.25 2.25 0 1118 3.75m-12 12A2.25 2.25 0 115.25 13.5m9.5 4.25V21m0-6.25V15m-6.5 0v1.25m0-6.25V9m0 6.25h1.25m-6.25-6.25h1.25"/></svg>
  )
};

const FeatureCard = ({ title, desc }) => (
  <div className="bg-white rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all text-center border-t-4 border-teal-400">
    {icons[title] || null}
    <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

export default FeatureCard;
