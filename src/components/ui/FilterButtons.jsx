import React from "react";

const FilterButtons = ({ selectedCategory, setSelectedCategory, darkMode }) => {
  const categories = ["all", "wedding", "portrait", "product", "travel"];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12 fade-in">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`px-6 py-2 rounded-full transition-all ${
            selectedCategory === cat
              ? "bg-yellow-600 text-white"
              : darkMode
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
