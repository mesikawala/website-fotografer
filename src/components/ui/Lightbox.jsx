import React from "react";
import { X } from "lucide-react";

const Lightbox = ({ image, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white hover:text-yellow-600 transition-colors"
        onClick={onClose}
      >
        <X size={32} />
      </button>
      <img
        src={image.src}
        alt={image.alt}
        className="max-w-full max-h-[90vh] object-contain"
      />
    </div>
  );
};

export default Lightbox;
