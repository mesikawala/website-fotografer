import React from "react";

const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`py-8 ${darkMode ? "bg-gray-900" : "bg-gray-100"} text-center`}
    >
      <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
        © 2025 LensArt Photography. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
