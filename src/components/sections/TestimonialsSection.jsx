import React, { useState } from "react";
import TestimonialSlider from "../ui/TestimonialSlider";
import { testimonialsData } from "../../Data/testimonialsData";

const TestimonialsSection = ({ darkMode }) => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex(
      (prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length
    );
  };

  return (
    <section className={`py-20 ${darkMode ? "bg-black" : "bg-white"}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 fade-in">
          Client Testimonials
        </h2>

        <TestimonialSlider
          testimonial={testimonialsData[testimonialIndex]}
          onNext={nextTestimonial}
          onPrev={prevTestimonial}
          darkMode={darkMode}
        />
      </div>
    </section>
  );
};

export default TestimonialsSection;
