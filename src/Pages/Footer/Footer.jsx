import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa"; // Social media icons

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-indigo-900 text-gray-300 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Left: Copyright */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} ProductManager. All rights reserved.
        </p>

        {/* Middle: Links */}
        <div className="space-x-6 mt-6 md:mt-0 text-center md:text-left">
          <a href="/" className="hover:text-white transition duration-300">Home</a>
          <a href="/products" className="hover:text-white transition duration-300">Products</a>
          <a href="/add-product" className="hover:text-white transition duration-300">Add Product</a>
          <a href="/contact" className="hover:text-white transition duration-300">Contact</a>
        </div>

        {/* Right: Social Media Icons */}
        <div className="flex space-x-6 mt-6 md:mt-0">
          <a href="#" className="text-2xl hover:text-white transition duration-300">
            <FaFacebookF />
          </a>
          <a href="#" className="text-2xl hover:text-white transition duration-300">
            <FaTwitter />
          </a>
          <a href="#" className="text-2xl hover:text-white transition duration-300">
            <FaLinkedinIn />
          </a>
          <a href="#" className="text-2xl hover:text-white transition duration-300">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
