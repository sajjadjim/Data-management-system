const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left */}
        <p className="text-sm">
          © {new Date().getFullYear()} ProductManager. All rights reserved.
        </p>

        {/* Links */}
        <div className="space-x-4 mt-3 md:mt-0">
          <a href="/" className="hover:text-white">Home</a>
          <a href="/products" className="hover:text-white">Products</a>
          <a href="/add-product" className="hover:text-white">Add Product</a>
          <a href="/contact" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;