import React, { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import GallerySection from "./components/sections/GallerySection";
import AboutSection from "./components/sections/AboutSection";
import ServicesSection from "./components/sections/ServicesSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import BookingSection from "./components/sections/BookingSection";
import ContactSection from "./components/sections/ContactSection";
import { useDarkMode } from "./hooks/useDarkMode";
import { useActiveSection } from "./hooks/useActiveSection";
import { useScrollAnimation } from "./hooks/useScrollAnimation";
import "./styles/globals.css";
import "./styles/animations.css";

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [activeSection, setActiveSection] = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);

  useScrollAnimation();

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-black text-white" : "bg-white text-gray-900"
      } transition-colors duration-300`}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <HeroSection darkMode={darkMode} />
      <GallerySection darkMode={darkMode} />
      <AboutSection darkMode={darkMode} />
      <ServicesSection darkMode={darkMode} />
      <TestimonialsSection darkMode={darkMode} />
      <BookingSection darkMode={darkMode} />
      <ContactSection darkMode={darkMode} />

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
