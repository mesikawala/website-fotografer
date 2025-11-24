import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactSection = ({ darkMode }) => {
  return (
    <section
      id="contact"
      className={`py-20 ${darkMode ? "bg-black" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 fade-in">
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="fade-in">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="text-yellow-600" size={20} />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-yellow-600" size={20} />
                <span>hello@lensart.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-yellow-600" size={20} />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>

            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
            >
              <Phone size={20} />
              WhatsApp Chat
            </a>
          </div>

          <div className="fade-in">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className={`w-full px-4 py-3 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-yellow-600`}
              />
              <input
                type="email"
                placeholder="Your Email"
                className={`w-full px-4 py-3 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-yellow-600`}
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className={`w-full px-4 py-3 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-yellow-600`}
              ></textarea>
              <button className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
