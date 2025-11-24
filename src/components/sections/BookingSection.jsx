import React, { useState } from "react";
import { Calendar } from "lucide-react";
import DatePicker from "../ui/DatePicker";
import { availableDates } from "../../Data/availableDates";

const BookingSection = ({ darkMode }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <section className={`py-20 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4 fade-in">
          Book a Session
        </h2>
        <p
          className={`text-center mb-12 fade-in ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Select an available date for your photoshoot
        </p>

        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg p-8 shadow-lg fade-in`}
        >
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="text-yellow-600" size={24} />
            <h3 className="text-xl font-semibold">Available Dates</h3>
          </div>

          <DatePicker
            availableDates={availableDates}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            darkMode={darkMode}
          />

          {selectedDate && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className={`w-full px-4 py-3 rounded-lg ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-yellow-600`}
              />
              <input
                type="email"
                placeholder="Your Email"
                className={`w-full px-4 py-3 rounded-lg ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-yellow-600`}
              />
              <button className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors">
                Confirm Booking for{" "}
                {new Date(selectedDate).toLocaleDateString("id-ID", {
                  dateStyle: "long",
                })}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
