import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Settings, Home } from "lucide-react"; // icons from lucide-react
import { toast } from "react-toastify"; // For toast notifications
import useAuth from "../../Hook/useAuth";
import AuthProvider from "../../Auth/Authprovider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // for managing the dropdown
  const { logOut , user } = useAuth()
  const navigate = useNavigate();


  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout successful ❌");
        setTimeout(() => {
          navigate(`${location.state ? location.state : '/'}`);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

            {/* User Dropdown if logged in */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 p-2 hover:text-yellow-300 transition"
                >
                  <User size={24} />
                  <span>{user.displayName || "User"}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-blue-700 rounded-lg shadow-lg py-2">
                    <Link
                      to="/dashboard/products"
                      className="block px-4 py-2 text-white hover:bg-blue-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Home size={16} className="inline mr-2" />
                      Dashboard
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-white hover:bg-blue-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Settings size={16} className="inline mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="block px-4 py-2 text-white w-full text-left hover:bg-blue-600"
                    >
                      <LogOut size={16} className="inline mr-2" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // If user is not logged in, show Login and Sign Up buttons
              <div className="flex space-x-4">
                <Link to="/auth/login" className="px-4 py-2 rounded bg-yellow-400 text-black hover:bg-yellow-500 transition">
                  Login
                </Link>
                <Link to="/auth/signup" className="px-4 py-2 rounded bg-yellow-400 text-black hover:bg-yellow-500 transition">
                  Sign Up
                </Link>
              </div>
            )}
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

          {/* Mobile login/signup buttons */}
          {!user && (
            <div className="mt-4 flex flex-col space-y-2">
              <Link to="/auth/login" className="block text-center bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500">
                Login
              </Link>
              <Link to="/auth/signup" className="block text-center bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
