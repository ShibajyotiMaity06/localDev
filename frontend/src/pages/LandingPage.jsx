import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";


const testimonials = [
  {
    name: "Aditi Verma",
    role: "Designer & Learner",
    text: "I found a great coding mentor through LocalHub Skill Exchange. It’s so easy to connect and learn—highly recommended for everyone!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Arjun Malhotra",
    role: "Web Developer",
    text: "Teaching someone JavaScript was fun. The platform really makes real-life skill sharing simple and meaningful.",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg"
  },
  {
    name: "Priya Singh",
    role: "Artist & Teacher",
    text: "I exchanged my painting skills for digital editing tips. Loved the easy process and friendly people here.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const faqs = [
  {
    q: "What is Skill Exchange?",
    a: "It's a way to teach what you know and learn new skills directly from others in your community, one-on-one."
  },
  {
    q: "How do I get started?",
    a: "Just sign up, create your profile, and browse available skill listings or post your own skill for exchange!"
  },
  {
    q: "Is Skill Exchange free?",
    a: "Yes, LocalHub's Skill Exchange is free to use for everyone. You can share and learn skills without any charges."
  }
];

const LandingPage = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-tl from-teal-100 via-pink-100 to-indigo-100">
    <Navbar />
    <Hero />
    <section className="py-16 px-6 bg-gradient-to-tl from-teal-100 via-pink-50 to-indigo-50">
      <h2 className="text-3xl md:text-4xl mb-10 font-bold text-center text-indigo-700">What our users say</h2>
      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl border-t-4 border-teal-400 text-center transition-all">
            <img src={t.avatar} alt={t.name} className="w-20 h-20 mx-auto rounded-full mb-4 border-2 border-teal-200 shadow" />
            <h3 className="text-lg font-bold text-gray-700">{t.name}</h3>
            <p className="text-sm text-teal-500 mb-2">{t.role}</p>
            <p className="text-gray-600 italic">“{t.text}”</p>
          </div>
        ))}
      </div>
    </section>

    {/* FAQs */}
    <section className="py-14 px-6 bg-white">
      <h2 className="text-3xl md:text-4xl mb-10 font-bold text-center text-indigo-700">FAQs</h2>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-6 bg-indigo-50 rounded-xl shadow hover:shadow-lg">
            <h4 className="text-lg font-bold text-teal-700">{faq.q}</h4>
            <p className="mt-2 text-gray-700">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Footer */}
    <footer className="mt-16 py-8 bg-gradient-to-r from-indigo-500 via-teal-500 to-pink-500 text-white shadow-inner text-center text-lg font-semibold">
      Made with <span className="mx-2 text-pink-300">♥</span> in India &middot; LocalHub &copy; 2025
    </footer>
  </div>
);

export default LandingPage;
