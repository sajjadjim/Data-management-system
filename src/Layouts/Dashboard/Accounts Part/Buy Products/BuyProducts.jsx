import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineShoppingCart, AiOutlineTable, AiOutlineAppstore } from 'react-icons/ai'; // Icons for view toggle
import { toast, ToastContainer } from 'react-toastify';
import BuyProductModal from './BuyProductModal'; // Modal component for buying product
import useAxiosInstance from '../../../../Hook/useAxiosInstance';
import { motion } from 'framer-motion'; // Import for animation

const BuyProducts = () => {
  const useAxios = useAxiosInstance();
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState('table'); // Default to table view
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  // Fetch products using React Query
  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await useAxios.get('/products');
      return res.data || [];
    },
  });

  // Pagination logic
  const totalPages = Math.ceil(products?.length / productsPerPage);
  const currentProducts = products?.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Handle product sell
  const handleProductSell = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Show success toast after buying a product
  const handleProductBuy = () => {
    toast.success('Product bought successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-8">Available Products</h1>

      {/* View Toggle */}
      <div className="flex justify-center items-center mb-6 space-x-4">
        <button
          className={`p-3 rounded-full ${view === 'table' ? 'bg-indigo-600 text-white' : 'bg-gray-300'}`}
          onClick={() => setView('table')}
        >
          <AiOutlineTable size={24} />
        </button>
        <button
          className={`p-3 rounded-full ${view === 'card' ? 'bg-indigo-600 text-white' : 'bg-gray-300'}`}
          onClick={() => setView('card')}
        >
          <AiOutlineAppstore size={24} />
        </button>
      </div>

      {/* Product List */}
      {view === 'table' ? (
        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <table className="min-w-full table-auto text-center bg-white shadow-lg rounded-xl">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="px-6 py-3 border">Name</th>
                <th className="px-6 py-3 border">Code</th>
                <th className="px-6 py-3 border">Price</th>
                <th className="px-6 py-3 border">Quantity</th>
                <th className="px-6 py-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">Loading...</td>
                </tr>
              ) : (
                currentProducts?.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-100 transition ease-in-out duration-300">
                    <td className="px-6 py-4 border">{product.name}</td>
                    <td className="px-6 py-4 border">{product.code}</td>
                    <td className="px-6 py-4 border">{product.price} Taka</td>
                    <td className="px-6 py-4 border">{product.quantity}</td>
                    <td className="px-6 py-4 border">
                      <button
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-gradient-to-l hover:from-indigo-600 hover:to-blue-500 transition ease-in-out duration-300 shadow-md"
                        onClick={() => {
                          handleProductSell(product);
                          handleProductBuy(); // Show success toast
                        }}
                      >
                        <AiOutlineShoppingCart size={20} />
                        Sell
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>
      ) : (
        // Card View
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-64">
              <div className="animate-spin border-t-4 border-blue-500 w-16 h-16 rounded-full"></div>
            </div>
          ) : (
            currentProducts?.map((product) => (
              <div key={product._id} className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-blue-600">{product.name}</h3>
                <p className="text-gray-500">{product.code}</p>
                <p className="text-lg font-bold text-indigo-500 mt-2">{product.price} Taka</p>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <button
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full hover:bg-gradient-to-l hover:from-indigo-600 hover:to-blue-500 transition ease-in-out duration-300 shadow-md"
                    onClick={() => {
                      handleProductSell(product);
                      handleProductBuy(); // Show success toast
                    }}
                  >
                    <AiOutlineShoppingCart size={20} />
                    Sell
                  </button>
                </div>
              </div>
            ))
          )}
        </motion.div>
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <ul className="flex space-x-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`cursor-pointer px-6 py-3 rounded-lg text-lg ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>

      {/* Product Sell Modal */}
      {showModal && (
        <BuyProductModal 
          product={selectedProduct}
          closeModal={() => setShowModal(false)}
          refetch={refetch} 
        />
      )}
    </div>
  );
};

export default BuyProducts;
