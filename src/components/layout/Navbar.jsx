import React from "react";
import { Camera, Menu, X, Sun, Moon } from "lucide-react";

const Navbar = ({
  darkMode,
  setDarkMode,
  activeSection,
  setActiveSection,
  menuOpen,
  setMenuOpen,
}) => {
  const navItems = ["Home", "Gallery", "About", "Services", "Contact"];

  return (
    <nav
      className={`fixed w-full z-50 ${
        darkMode ? "bg-black/90" : "bg-white/90"
      } backdrop-blur-md border-b ${
        darkMode ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Camera className="text-yellow-600" size={28} />
            <span className="text-xl font-bold">LensArt</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`hover:text-yellow-600 transition-colors ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
                onClick={() => setActiveSection(item.toLowerCase())}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`md:hidden ${
            darkMode ? "bg-black" : "bg-white"
          } border-t ${darkMode ? "border-gray-800" : "border-gray-200"}`}
        >
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`block hover:text-yellow-600 transition-colors ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
                onClick={() => {
                  setActiveSection(item.toLowerCase());
                  setMenuOpen(false);
                }}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 hover:text-yellow-600 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
