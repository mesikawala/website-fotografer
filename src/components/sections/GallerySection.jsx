import React, { useState } from "react";
import FilterButtons from "../ui/FilterButtons";
import GalleryGrid from "../ui/GalleryGrid";
import Lightbox from "../ui/Lightbox";
import { galleryData } from "../../Data/galleryData";

// 3D Components
import ThreeCanvas from "../3d/ThreeCanvas";
import CylinderCarousel from "../3d/CylinderCarousel";
import CustomOrbitControls from "../3d/CustomOrbitControls";
import PhotoDetailView from "../3d/PhotoDetailView";
import GalleryEnvironment from "../3d/GalleryEnvironment";

// 3D Utilities
import { usePerformanceOptimization } from "../../hooks/usePerformanceOptimization";

const GallerySection = ({ darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState(null);

  // 3D Gallery State
  const [is3DMode, setIs3DMode] = useState(false);
  const [selected3DPhoto, setSelected3DPhoto] = useState(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hoveredPhoto, setHoveredPhoto] = useState(null);

  // Performance optimization
  const { isLowPerformance, getQualitySettings } = usePerformanceOptimization();

  const filteredGallery =
    selectedCategory === "all"
      ? galleryData
      : galleryData.filter((img) => img.category === selectedCategory);

  // Event handlers for 3D gallery
  const handle3DModeToggle = () => {
    setIs3DMode(!is3DMode);
    if (selected3DPhoto) {
      setSelected3DPhoto(null);
    }
  };

  const handleWebGLUnsupported = () => {
    setWebGLSupported(false);
    setIs3DMode(false);
  };

  const handlePhotoClick = (photo) => {
    setSelected3DPhoto(photo);
    setAutoRotate(false);
  };

  const handlePhotoHover = (photo, isHovering) => {
    setHoveredPhoto(isHovering ? photo : null);
  };

  const handleNextPhoto = () => {
    const currentIndex = filteredGallery.findIndex(p => p.id === selected3DPhoto?.id);
    const nextIndex = (currentIndex + 1) % filteredGallery.length;
    setSelected3DPhoto(filteredGallery[nextIndex]);
  };

  const handlePreviousPhoto = () => {
    const currentIndex = filteredGallery.findIndex(p => p.id === selected3DPhoto?.id);
    const prevIndex = currentIndex === 0 ? filteredGallery.length - 1 : currentIndex - 1;
    setSelected3DPhoto(filteredGallery[prevIndex]);
  };

  const handleCloseDetailView = () => {
    setSelected3DPhoto(null);
    setAutoRotate(true);
  };

  // Check if current photo has next/previous in filtered set
  const currentPhotoIndex = filteredGallery.findIndex(p => p.id === selected3DPhoto?.id);
  const hasNextPhoto = currentPhotoIndex < filteredGallery.length - 1;
  const hasPreviousPhoto = currentPhotoIndex > 0;

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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 fade-in">
            Portfolio
          </h2>
          <p
            className={`mb-8 fade-in ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Explore my work across different categories
          </p>

          {/* 3D Mode Toggle */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handle3DModeToggle}
              disabled={!webGLSupported}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                !webGLSupported
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : is3DMode
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {!webGLSupported
                ? "3D Unavailable"
                : is3DMode
                ? "Switch to 2D Gallery"
                : "🎮 View in 3D Gallery"}
            </button>
          </div>

          <FilterButtons
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            darkMode={darkMode}
          />
        </div>

        {/* Gallery Display */}
        {is3DMode && webGLSupported ? (
          <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
            {/* 3D Controls Info */}
            <div className={`absolute top-4 left-4 z-10 p-3 rounded-lg text-sm ${
              darkMode ? "bg-gray-800/90 text-white" : "bg-white/90 text-gray-800"
            }`}>
              <div className="font-semibold mb-1">🎮 3D Controls</div>
              <div className="text-xs space-y-1 opacity-80">
                <div>🖱️ Drag to rotate</div>
                <div>🔄 Scroll to zoom</div>
                <div>🖼️ Click photo to view</div>
                <div>⌨️ Arrow keys to navigate</div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-600">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`text-xs px-2 py-1 rounded ${
                    autoRotate
                      ? "bg-blue-500 text-white"
                      : darkMode
                      ? "bg-gray-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {autoRotate ? "⏸️ Pause" : "▶️ Play"} Rotation
                </button>
              </div>
            </div>

            {/* Photo Counter */}
            <div className={`absolute top-4 right-4 z-10 px-3 py-2 rounded-lg text-sm ${
              darkMode ? "bg-gray-800/90 text-white" : "bg-white/90 text-gray-800"
            }`}>
              {filteredGallery.length} photos
              {selectedCategory !== "all" && ` in ${selectedCategory}`}
            </div>

            {/* Hovered Photo Info */}
            {hoveredPhoto && (
              <div className={`absolute bottom-4 left-4 z-10 p-3 rounded-lg ${
                darkMode ? "bg-gray-800/90 text-white" : "bg-white/90 text-gray-800"
              }`}>
                <div className="font-semibold">{hoveredPhoto.title3D || hoveredPhoto.title}</div>
                <div className="text-sm opacity-80 capitalize">{hoveredPhoto.category}</div>
              </div>
            )}

            <ThreeCanvas
              darkMode={darkMode}
              onWebGLUnsupported={handleWebGLUnsupported}
            >
              <GalleryEnvironment darkMode={darkMode} />
              <CustomOrbitControls
                autoRotate={autoRotate}
                darkMode={darkMode}
                enablePan={!selected3DPhoto}
                enableRotate={!selected3DPhoto}
              />

              <CylinderCarousel
                photos={filteredGallery}
                onPhotoClick={handlePhotoClick}
                onPhotoHover={handlePhotoHover}
                selectedPhoto={selected3DPhoto}
                autoRotate={autoRotate && !selected3DPhoto}
                darkMode={darkMode}
              />

              {selected3DPhoto && (
                <PhotoDetailView
                  photo={selected3DPhoto}
                  onClose={handleCloseDetailView}
                  onNext={handleNextPhoto}
                  onPrevious={handlePreviousPhoto}
                  hasNext={hasNextPhoto}
                  hasPrevious={hasPreviousPhoto}
                  darkMode={darkMode}
                />
              )}
            </ThreeCanvas>
          </div>
        ) : (
          <GalleryGrid
            gallery={filteredGallery}
            setLightboxImage={setLightboxImage}
          />
        )}
      </div>

      {/* 2D Lightbox for non-3D mode */}
      {lightboxImage && !is3DMode && (
        <Lightbox
          image={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </section>
  );
};

export default GallerySection;
