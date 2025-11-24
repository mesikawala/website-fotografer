import React, { useState } from "react";
import FilterButtons from "../ui/FilterButtons";
import GalleryGrid from "../ui/GalleryGrid";
import Lightbox from "../ui/Lightbox";
import { galleryData } from "../../Data/galleryData";

const GallerySection = ({ darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState(null);

  const filteredGallery =
    selectedCategory === "all"
      ? galleryData
      : galleryData.filter((img) => img.category === selectedCategory);

  return (
    <section
      id="gallery"
      className={`relative py-20 overflow-hidden ${
        darkMode ? "bg-[#0b1f3a]" : "bg-gray-50"
      }`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-24 pointer-events-none ${
          darkMode
            ? "bg-gradient-to-b from-[#0b1f3a] via-[#0b1f3a]/70 to-transparent"
            : "bg-gradient-to-b from-white via-white/70 to-transparent"
        }`}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4 fade-in">
          Portfolio
        </h2>
        <p
          className={`text-center mb-12 fade-in ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Explore my work across different categories
        </p>

        <FilterButtons
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          darkMode={darkMode}
        />

        <GalleryGrid
          gallery={filteredGallery}
          setLightboxImage={setLightboxImage}
        />
      </div>

      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </section>
  );
};

export default GallerySection;
