import React, { useState } from "react";
import { Camera, Menu, X, Sun, Moon, HelpCircle } from "lucide-react";

const Navbar = ({
  darkMode,
  setDarkMode,
  activeSection,
  setActiveSection,
  menuOpen,
  setMenuOpen,
}) => {
  const [show3DHelp, setShow3DHelp] = useState(false);
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

            {/* 3D Controls Help */}
            <div className="relative">
              <button
                onClick={() => setShow3DHelp(!show3DHelp)}
                className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  activeSection === "gallery" ? "text-yellow-600" : ""
                } ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                title="3D Gallery Help"
              >
                <HelpCircle size={20} />
              </button>

              {show3DHelp && (
                <div className={`absolute right-0 top-12 w-64 p-4 rounded-lg shadow-lg ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                } border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                  <h3 className="font-semibold mb-2">🎮 3D Gallery Controls</h3>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">🖱️</span>
                      <span>Drag to rotate camera</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">🔄</span>
                      <span>Scroll to zoom in/out</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">🖼️</span>
                      <span>Click photos to view</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">⌨️</span>
                      <span>Arrow keys to navigate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">📱</span>
                      <span>Touch gestures on mobile</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t text-xs opacity-70">
                    Go to Gallery section to enable 3D mode
                  </div>
                </div>
              )}
            </div>

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
