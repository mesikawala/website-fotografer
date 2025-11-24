import React from "react";
import ServiceCard from "../ui/ServiceCard";
import { servicesData } from "../../Data/servicesData";

const ServicesSection = ({ darkMode }) => {
  return (
    <section
      id="services"
      className={`py-20 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4 fade-in">
          Services & Packages
        </h2>
        <p
          className={`text-center mb-12 fade-in ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Choose the perfect package for your needs
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
