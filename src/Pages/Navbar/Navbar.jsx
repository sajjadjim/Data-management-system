import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Settings, Home, ShoppingCart, ChevronDown } from "lucide-react"; // Added ChevronDown for dropdown
import { toast } from "react-toastify"; // For toast notifications
import useAuth from "../../Hook/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false); // for managing the Products dropdown
  const [userDropdownOpen, setUserDropdownOpen] = useState(false); // for managing the User dropdown
  const { logOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // to track the current active route

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

  const isActive = (path) => {
    return location.pathname === path ? "text-yellow-300" : "text-white"; // highlight active link
  };

  const handleProductsDropdownToggle = () => {
    setProductsDropdownOpen(!productsDropdownOpen);
  };

  const handleUserDropdownToggle = () => {
    setUserDropdownOpen(!userDropdownOpen);
    setProductsDropdownOpen(false); // Close the Products dropdown when User dropdown is toggled
  };

  // Keep the products dropdown open if user is on any product route
  useEffect(() => {
    if (location.pathname.includes("/products")) {
      setProductsDropdownOpen(true);
    } else {
      setProductsDropdownOpen(false);
    }
  }, [location.pathname]);

  // Default User Avatar (in case the user does not have a profile picture)
  const userAvatar = user?.photoURL || "https://www.w3schools.com/w3images/avatar2.png";

  // Close Modal when route changes
  useEffect(() => {
    setProductsDropdownOpen(false); // Close the Products dropdown when route changes
    setUserDropdownOpen(false); // Close the User dropdown when route changes
  }, [location]);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide">
            Product<span className="text-yellow-300">Manager</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex justify-center items-center justify-items-center space-x-6 font-medium">
            <Link to="/" className={`hover:text-yellow-300 transition ${isActive("/")}`}>
              <Home size={20} className="inline mr-2" />
              Home
            </Link>

            {/* Products Dropdown with More Routes */}
            <div className="relative">
              <button
                onClick={handleProductsDropdownToggle} // Always open dropdown on button press
                className={`flex items-center space-x-2 p-2 hover:text-yellow-300 transition ${isActive("/products")}`}
                aria-haspopup="true"
                aria-expanded={productsDropdownOpen}
              >
                <ShoppingCart size={20} className="inline mr-2" />
                Products
                <ChevronDown size={16} className="inline ml-2" />
              </button>
              {productsDropdownOpen && ( // Show dropdown only when clicked
                <div className="absolute left-0 mt-2 w-48 bg-blue-700 rounded-lg shadow-lg py-2">
                  <Link
                    to="/products"
                    className="block px-4 py-2 text-white hover:bg-blue-600"
                    onClick={() => setProductsDropdownOpen(false)}
                  >
                    All Products
                  </Link>
                  <Link
                    to="/products/electronics"
                    className="block px-4 py-2 text-white hover:bg-blue-600"
                    onClick={() => setProductsDropdownOpen(false)}
                  >
                    Electronics
                  </Link>
                  <Link
                    to="/products/food"
                    className="block px-4 py-2 text-white hover:bg-blue-600"
                    onClick={() => setProductsDropdownOpen(false)}
                  >
                    Food
                  </Link>
                  <Link
                    to="/products/clothings"
                    className="block px-4 py-2 text-white hover:bg-blue-600"
                    onClick={() => setProductsDropdownOpen(false)}
                  >
                    Clothing
                  </Link>
                  <Link
                    to="/products/furniture"
                    className="block px-4 py-2 text-white hover:bg-blue-600"
                    onClick={() => setProductsDropdownOpen(false)}
                  >
                    Furniture
                  </Link>
                </div>
              )}
            </div>

            {/* Conditional "Add Product" Link */}
            {user && (
              <Link to="/add-product" className={`hover:text-yellow-300 transition ${isActive("/add-product")}`}>
                <Settings size={20} className="inline mr-2" />
                Add Product
              </Link>
            )}

            <Link to="/contact" className={`hover:text-yellow-300 transition ${isActive("/contact")}`}>
              <User size={20} className="inline mr-2" />
              Contact
            </Link>
            <Link to="/about" className={`hover:text-yellow-300 transition ${isActive("/contact")}`}>
              <User size={20} className="inline mr-2" />
              About Us
            </Link>

            {/* User Dropdown if logged in */}
            {user ? (
              <div className="relative">
                <button
                  onClick={handleUserDropdownToggle}
                  className="flex items-center space-x-2 p-2 hover:text-yellow-300 transition"
                >
                  <img src={userAvatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-blue-700 rounded-lg shadow-lg py-2">
                    <Link
                      to="/dashboard/accounts"
                      className="block px-4 py-2 text-white hover:bg-blue-600"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <Home size={16} className="inline mr-2" />
                      Accounts
                    </Link>
                    <Link
                      to="/dashboard/products"
                      className="block px-4 py-2 text-white hover:bg-blue-600"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <ShoppingCart size={16} className="inline mr-2" />
                      Dashboard
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-white hover:bg-blue-600"
                      onClick={() => setUserDropdownOpen(false)}
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
            className={`block py-2 hover:text-yellow-300 transition ${isActive("/")}`}
            onClick={() => setIsOpen(false)}
          >
            <Home size={20} className="inline mr-2" />
            Home
          </Link>
          <Link
            to="/products"
            className={`block py-2 hover:text-yellow-300 transition ${isActive("/products")}`}
            onClick={() => setIsOpen(false)}
          >
            <ShoppingCart size={20} className="inline mr-2" />
            Products
          </Link>

          {/* Conditional Mobile "Add Product" Link */}
          {user && (
            <Link
              to="/add-product"
              className={`block py-2 hover:text-yellow-300 transition ${isActive("/add-product")}`}
              onClick={() => setIsOpen(false)}
            >
              <Settings size={20} className="inline mr-2" />
              Add Product
            </Link>
          )}

          <Link
            to="/contact"
            className={`block py-2 hover:text-yellow-300 transition ${isActive("/contact")}`}
            onClick={() => setIsOpen(false)}
          >
            <User size={20} className="inline mr-2" />
            Contact

          </Link>
          <Link
            to="/about"
            className={`block py-2 hover:text-yellow-300 transition ${isActive("/contact")}`}
            onClick={() => setIsOpen(false)}
          >
            <User size={20} className="inline mr-2" />
            About Us
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
