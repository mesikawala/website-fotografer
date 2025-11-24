import React from "react";

const DatePicker = ({
  availableDates,
  selectedDate,
  setSelectedDate,
  darkMode,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      {availableDates.map((date) => (
        <button
          key={date}
          onClick={() => setSelectedDate(date)}
          className={`p-3 rounded-lg text-center transition-all ${
            selectedDate === date
              ? "bg-yellow-600 text-white"
              : darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          <div className="text-sm">
            {new Date(date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
            })}
          </div>
        </button>
      ))}
    </div>
  );
};

export default DatePicker;
