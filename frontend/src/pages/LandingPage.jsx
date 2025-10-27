import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";

const LandingPage = () => {
  const features = [
    { title: "Skill Exchange", desc: "Teach what you know, learn something new." },
    { title: "Local Services", desc: "Find trusted professionals near you." },
    { title: "Marketplace", desc: "Buy, lend, or sell items in your community." },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <section className="py-16 px-6 md:px-12 lg:px-24 grid gap-10 md:grid-cols-3 bg-gray-50 flex-grow">
        {features.map((f, i) => (
          <FeatureCard key={i} title={f.title} desc={f.desc} />
        ))}
      </section>
    </div>
  );
};

export default LandingPage;
