const Contact = () => {
  return (
    <section className="bg-gradient-to-r from-gray-200 to-gray-400 min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
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
          <div className="bg-white p-10 rounded-3xl shadow-2xl transition-all hover:scale-105 hover:shadow-2xl">
            <h3 className="text-3xl font-semibold text-gray-800 mb-8">Send Us a Message</h3>
            <form className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Your Message</label>
                <textarea
                  rows="6"
                  placeholder="Write your message here..."
                  className="w-full border border-gray-300 rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all"
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
          <div className="bg-blue-600 text-white p-10 rounded-3xl shadow-xl flex flex-col justify-center">
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
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white text-2xl hover:text-gray-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white text-2xl hover:text-gray-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-white text-2xl hover:text-gray-300">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
