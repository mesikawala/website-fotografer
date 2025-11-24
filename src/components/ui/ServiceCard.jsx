import React from "react";

const ServiceCard = ({ service, index, darkMode }) => {
  return (
    <div
      className={`fade-in ${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <h3 className="text-2xl font-bold mb-4">{service.name}</h3>
      <p className="text-3xl font-bold text-yellow-600 mb-6">{service.price}</p>
      <ul className="space-y-3">
        {service.features.map((feature, i) => (
          <li
            key={i}
            className={`flex items-start gap-2 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <span className="text-yellow-600 mt-1">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <button className="w-full mt-8 bg-yellow-600 text-white py-3 rounded-full hover:bg-yellow-700 transition-colors">
        Book Now
      </button>
    </div>
  );
};

export default ServiceCard;
