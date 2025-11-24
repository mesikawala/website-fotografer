import React from "react";

const AboutSection = ({ darkMode }) => {
  return (
    <section
      id="about"
      className={`py-20 ${darkMode ? "bg-black" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <img
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600"
              alt="Photographer"
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div className="fade-in">
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p
              className={`mb-4 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              } leading-relaxed`}
            >
              Dengan pengalaman lebih dari 8 tahun di dunia fotografi, saya
              berkomitmen untuk mengabadikan momen-momen berharga Anda dengan
              sentuhan artistik yang unik.
            </p>
            <p
              className={`mb-4 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              } leading-relaxed`}
            >
              Setiap foto yang saya ambil bukan hanya sekadar gambar, tetapi
              sebuah cerita yang akan Anda kenang selamanya. Spesialisasi saya
              meliputi wedding, portrait, product, dan travel photography.
            </p>
            <p
              className={`${
                darkMode ? "text-gray-300" : "text-gray-600"
              } leading-relaxed`}
            >
              Mari ciptakan karya visual yang tak terlupakan bersama.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
