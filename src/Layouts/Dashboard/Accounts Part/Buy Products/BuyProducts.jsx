import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineShoppingCart } from 'react-icons/ai'; // Cart Icon
import { toast } from 'react-toastify';
import BuyProductModal from './BuyProductModal'; // Modal component for buying product
import useAxiosInstance from '../../../../Hook/useAxiosInstance';

const BuyProducts = () => {
  const useAxios = useAxiosInstance();
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Available Products</h1>
      
      {/* Product List */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-center bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Code</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">Loading...</td>
              </tr>
            ) : (
              currentProducts?.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{product.name}</td>
                  <td className="px-4 py-2 border">{product.code}</td>
                  <td className="px-4 py-2 border">{product.price} Taka</td>
                  <td className="px-4 py-2 border">{product.quantity}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                      onClick={() => handleProductSell(product)}
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
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <ul className="flex space-x-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`cursor-pointer px-4 py-2 rounded-lg text-lg ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
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
