import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons (lucide-react)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide">
            Product<span className="text-yellow-300">Manager</span>
          </Link>
          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 font-medium">
            <Link to="/" className="hover:text-yellow-300 transition">
              Home
            </Link>
            <Link to="/products" className="hover:text-yellow-300 transition">
              Products
            </Link>
            <Link to="/add-product" className="hover:text-yellow-300 transition">
              Add Product
            </Link>
            <Link to="/contact" className="hover:text-yellow-300 transition">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-4 pb-4 space-y-2">
          <Link
            to="/"
            className="block py-2 hover:text-yellow-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block py-2 hover:text-yellow-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/add-product"
            className="block py-2 hover:text-yellow-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Add Product
          </Link>
          <Link
            to="/contact"
            className="block py-2 hover:text-yellow-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;