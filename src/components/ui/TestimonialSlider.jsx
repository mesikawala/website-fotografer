import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialSlider = ({ testimonial, onNext, onPrev, darkMode }) => {
  return (
    <div
      className={`relative ${
        darkMode ? "bg-gray-800" : "bg-gray-50"
      } rounded-lg p-8 shadow-xl fade-in`}
    >
      <div className="text-center">
        <div className="flex justify-center mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <span key={i} className="text-yellow-600 text-2xl">
              ★
            </span>
          ))}
        </div>
        <p
          className={`text-xl italic mb-6 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          "{testimonial.text}"
        </p>
        <p className="font-semibold text-yellow-600">{testimonial.name}</p>
      </div>

      <button
        onClick={onPrev}
        className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full ${
          darkMode
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-white hover:bg-gray-100"
        } transition-colors`}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={onNext}
        className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full ${
          darkMode
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-white hover:bg-gray-100"
        } transition-colors`}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default TestimonialSlider;
