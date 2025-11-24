import React from "react";

const HeroSection = ({ darkMode }) => {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920)",
          filter: "brightness(0.5)",
        }}
      />
      <div className="relative z-10 text-center px-4">
        <h1
          className="text-5xl md:text-7xl font-bold text-white mb-4 fade-in bg-gradient-to-r from-yellow-200 via-white to-yellow-500 bg-clip-text text-transparent"
          style={{ transition: "background-position 0.6s ease" }}
        >
          Capturing Moments,
          <br />
          Crafting Stories
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 fade-in bg-gradient-to-r from-white/90 via-yellow-200/80 to-white/90 bg-clip-text text-transparent">
          Professional Photography with Artistic Vision
        </p>
        <a
          href="#gallery"
          className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-8 py-3 rounded-full hover:from-yellow-400 hover:to-yellow-600 transition-all transform hover:scale-105 shadow-lg shadow-yellow-900/40 fade-in"
        >
          View Portfolio
        </a>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-b from-transparent via-black/60 to-[#0b1f3a] pointer-events-none" />
    </section>
  );
};

export default HeroSection;
