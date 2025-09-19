import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa"; // Social media icons

const About = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      bio: "John is the visionary behind Product Manager. With years of experience in product management and a passion for technology, he started this platform to help businesses manage their products.",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      twitter: "https://twitter.com/johndoe",
      instagram: "https://instagram.com/johndoe",
    },
    {
      name: "Jane Smith",
      role: "Lead Developer",
      bio: "Jane is a highly skilled software engineer with expertise in building scalable applications. She is the lead developer of Product Manager, ensuring that it runs smoothly and efficiently.",
      linkedin: "https://linkedin.com/in/janesmith",
      github: "https://github.com/janesmith",
      twitter: "https://twitter.com/janesmith",
      instagram: "https://instagram.com/janesmith",
    },
    {
      name: "Mark Williams",
      role: "Product Manager",
      bio: "Mark has a deep understanding of the product lifecycle and is passionate about delivering great user experiences. He oversees the product management at Product Manager.",
      linkedin: "https://linkedin.com/in/markwilliams",
      github: "https://github.com/markwilliams",
      twitter: "https://twitter.com/markwilliams",
      instagram: "https://instagram.com/markwilliams",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">About Us</h1>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-blue-700 mb-4">Our Website</h2>
        <p className="text-lg text-gray-600">
          Welcome to Product Manager, a comprehensive platform designed to streamline product management, track inventory, and simplify the process of adding and selling products. Our mission is to provide a seamless and efficient way for businesses and entrepreneurs to manage their products while maintaining full control over their stock and sales operations.
        </p>
        <p className="text-lg text-gray-600 mt-4">
          We believe that managing your product inventory should be a hassle-free experience, which is why we’ve developed this intuitive system for managing products and tracking sales in real-time.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-blue-700 mb-4">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 w-80">
              <img
                src={`https://i.pravatar.cc/150?img=${index + 1}`}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-600 text-center">{member.name}</h3>
              <p className="text-center text-gray-600">{member.role}</p>
              <p className="text-gray-500 mt-2">{member.bio}</p>

              <div className="flex justify-center space-x-4 mt-4">
                <a href={member.linkedin} className="text-blue-600 hover:text-blue-800">
                  <FaLinkedin size={24} />
                </a>
                <a href={member.github} className="text-gray-800 hover:text-black">
                  <FaGithub size={24} />
                </a>
                <a href={member.twitter} className="text-blue-400 hover:text-blue-600">
                  <FaTwitter size={24} />
                </a>
                <a href={member.instagram} className="text-pink-600 hover:text-pink-800">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-blue-700 mb-4">The Authority</h2>
        <p className="text-lg text-gray-600">
          Product Manager is authorized by trusted authorities in the industry. Our platform follows best practices for data security, ensuring that user data is kept safe and secure. We strive for transparency and accountability, providing a reliable service to all our users.
        </p>
      </section>

      <footer className="text-center mt-16">
        <p className="text-lg text-gray-600">
          © 2025 Product Manager. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default About;
