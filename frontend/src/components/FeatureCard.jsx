import React from "react";

const FeatureCard = ({ title, desc }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition max-w-sm mx-auto">
    <h3 className="text-2xl font-semibold text-teal-600">{title}</h3>
    <p className="mt-2 text-gray-600">{desc}</p>
  </div>
);

export default FeatureCard;
