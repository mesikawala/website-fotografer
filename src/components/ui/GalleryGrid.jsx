import React from "react";

const GalleryGrid = ({ gallery, setLightboxImage }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {gallery.map((image, index) => (
        <div
          key={image.id}
          className="fade-in cursor-pointer group relative overflow-hidden rounded-lg"
          style={{
            animationDelay: `${index * 0.1}s`,
            paddingBottom: "100%",
          }}
          onClick={() => setLightboxImage(image)}
        >
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-sm font-semibold px-2 text-center">
              {image.alt}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
