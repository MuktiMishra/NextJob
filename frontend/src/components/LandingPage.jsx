import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">
          JobPortal
        </h1>
        <div className="space-x-6 hidden md:flex">
          <button onClick={() => navigate("/login")} className="text-sm font-medium hover:text-indigo-600 transition">
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-black text-white px-5 py-2 rounded-xl text-sm hover:bg-gray-800 transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          Find Your
          <span className="block bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">
            Dream Job
          </span>
          Faster Than Ever
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-6 text-lg text-gray-600 max-w-2xl"
        >
          Connect with top companies, showcase your skills, and land opportunities
          that match your passion. Your career journey starts here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Create Account
          </button>
          <button
            onClick={() => navigate("/jobs")}
            className="px-8 py-3 rounded-2xl border border-gray-300 font-semibold hover:bg-gray-100 transition"
          >
            Browse Jobs
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Smart Matching",
              desc: "AI-powered job recommendations tailored to your skills.",
            },
            {
              title: "Easy Applications",
              desc: "Apply to multiple jobs with just one click.",
            },
            {
              title: "Track Progress",
              desc: "Monitor your applications and interview updates easily.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="p-8 rounded-2xl shadow-md border border-gray-100 bg-gradient-to-br from-white to-slate-50"
            >
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
          Ready to Take the Next Step?
        </h2>
        <button
          onClick={() => navigate("/register")}
          className="px-8 py-3 bg-white text-black rounded-2xl font-semibold hover:scale-105 transition"
        >
          Join Now
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
