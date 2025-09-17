import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai"; // Search icon
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa"; // Social Media Icons
import { toast } from "react-toastify"; // For success/error messages

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation or submission logic here (e.g., API call)
    toast.success("Your message has been sent successfully!");
    setFormData({ name: "", email: "", message: "" }); // Reset the form after submission
  };

  return (
    <section className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-blue-700 mb-6">Contact Us</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We would love to hear from you! Fill out the form below or reach us through our contact details. Your feedback is important to us.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-14">
          {/* Contact Form */}
          <div className="bg-white p-12 rounded-3xl shadow-2xl transition-all hover:scale-105 hover:shadow-2xl">
            <h3 className="text-3xl font-semibold text-gray-800 mb-8">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Write your message here..."
                  className="w-full border border-gray-300 rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold shadow-md hover:opacity-90 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-600 text-white p-12 rounded-3xl shadow-xl flex flex-col justify-center">
            <h3 className="text-3xl font-semibold mb-6">Contact Information</h3>
            <p className="mb-6 text-lg font-light">
              Got questions or need support? Reach out to us anytime—we're here to help!
            </p>
            <ul className="space-y-5">
              <li>
                <span className="text-lg">📍</span>{" "}
                <span className="font-medium">Address:</span> Dhaka, Bangladesh
              </li>
              <li>
                <span className="text-lg">📞</span>{" "}
                <span className="font-medium">Phone:</span> +880 1234 567890
              </li>
              <li>
                <span className="text-lg">✉️</span>{" "}
                <span className="font-medium">Email:</span>{" "}
                support@productmanager.com
              </li>
            </ul>
            {/* Social Media Links */}
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-white text-2xl hover:text-gray-300">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white text-2xl hover:text-gray-300">
                <FaTwitter />
              </a>
              <a href="#" className="text-white text-2xl hover:text-gray-300">
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-white text-2xl hover:text-gray-300">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
