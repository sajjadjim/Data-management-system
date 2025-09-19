import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineSearch } from "react-icons/ai"; // Search icon
import Skeleton from "react-loading-skeleton"; // Skeleton loader for loading state
import { motion } from "framer-motion"; // React Motion Library for animations
import useAxiosInstance from "../../../Hook/useAxiosInstance";

const Food = () => {
  useEffect(() => {
    document.title = "Food Products - Inventory Management System";
  });

  const useAxios = useAxiosInstance();

  // Pagination and Search State
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productsPerPage = 9;

  // Fetch products using React Query
  const { data: AllProducts = [], isLoading, isSuccess } = useQuery({
    queryKey: ["products", currentPage], // Add currentPage to the queryKey for cache persistence
    queryFn: async () => {
      const res = await useAxios.get("/products");
      const foodProducts = res.data.filter(product => product.category === "Food");
      return foodProducts || [];
    },
    keepPreviousData: true, // Prevent re-fetch when the page changes
    refetchOnWindowFocus: false, // Prevent refetch on tab switch
  });

  // Filter products by search term (name or code)
  const filteredProducts = AllProducts.filter((product) =>
    (product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Paginate filtered products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Show modal with product details
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  // Close modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Page Title and Description */}
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Food Products</h1>
      <p className="text-center text-lg text-gray-500 mb-6">
        Here you can find a list of all our amazing food products.
      </p>

      {/* Search bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full p-3 pl-10 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name or code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AiOutlineSearch className="absolute left-3 top-3 text-gray-500" size={20} />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          // Show skeleton loaders when data is loading
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center space-x-4">
            <Skeleton width={250} height={300} />
            <Skeleton width={250} height={300} />
            <Skeleton width={250} height={300} />
          </div>
        ) : isSuccess && currentProducts.length === 0 ? (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-lg text-gray-600">
            No products found.
          </div>
        ) : (
          // Actual products displayed after data is fetched
          currentProducts.map((product) => (
            <motion.div
              key={product._id}
              className="bg-white rounded-lg shadow-lg p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold text-blue-600">{product.name}</h3>
                <p className="text-gray-600">{product.code}</p>
                <p className="text-lg font-semibold text-blue-500 mt-2">{product.price} Taka</p>
                <p className="text-gray-500 mt-2">{product.description}</p>
                <p className="text-sm text-gray-500 mt-2">Category: <span className="font-bold">{product.category}</span></p>
                <p className="text-sm text-gray-500 mt-2">Quantity Available: {product.quantity}</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <button
                    className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                    onClick={() => handleViewDetails(product)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <ul className="flex space-x-4">
          {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
            <li
              key={index}
              className={`cursor-pointer px-4 py-2 rounded-lg text-lg ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Product Details */}
     {selectedProduct && (
                <motion.div
                  className="fixed inset-0 flex justify-center items-center z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Blurred background */}
                  <div className="absolute inset-0  bg-opacity-40 backdrop-blur-sm"></div>
                  <div className="relative bg-white rounded-lg shadow-lg w-96 p-6 z-10">
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">Product Details</h2>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-xl font-semibold text-blue-600">{selectedProduct.name}</h3>
                    <p className="text-gray-600">{selectedProduct.code}</p>
                    <p className="text-lg font-semibold text-blue-500 mt-2">{selectedProduct.price} Taka</p>
                    <p className="text-gray-500 mt-2">{selectedProduct.description}</p>
                    <p className="text-sm text-gray-500 mt-2">Category: {selectedProduct.category}</p>
                    <p className="text-sm text-gray-500 mt-2">Quantity Available: {selectedProduct.quantity}</p>
                    <div className="mt-6 flex justify-between">
                      <button
                        className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
    </div>
  );
};

export default Food;
