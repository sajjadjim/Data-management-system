import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineEdit } from 'react-icons/ai'; // Icons
import useAxiosInstance from '../../Hook/useAxiosInstance'; // Custom axios hook
import { toast } from 'react-toastify';

const ProductsDashboard = () => {
  const useAxios = useAxiosInstance();

  // State for modal, pagination, and product quantity inputs
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReliesModal, setShowReliesModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addAmount, setAddAmount] = useState(0);
  const [reliesAmount, setReliesAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Show 10 products per page

  // Fetch all products using React Query
  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await useAxios.get('/products');
      return res.data || [];
    },
  });

  // Handle pagination
  const totalPages = Math.ceil(products?.length / productsPerPage);
  const currentProducts = products?.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Handle Add Product stock (without mutation)
  const handleAddStock = async () => {
    if (addAmount <= 0 || !selectedProduct) {
      toast.error('Please enter a valid amount.');
      return;
    }

    try {
      // Optimistically update the UI
      const updatedProducts = products.map((product) =>
        product._id === selectedProduct._id
          ? { ...product, quantity: product.quantity + addAmount }
          : product
      );

      // Update the state for immediate UI feedback
      refetch(); // Trigger a manual refetch after the stock update

      const response = await useAxios.patch(`/products/${selectedProduct._id}/stock`, {
        quantityChange: addAmount,
      });

      if (response.data) {
        toast.success('Product stock updated!');
        setShowAddModal(false); // Close the modal after success
      }
    } catch (error) {
      toast.error('Error updating stock: ' + error.message);
    }
  };

  // Handle Relies Product stock (subtract stock) without mutation
  const handleReliesStock = async () => {
    if (reliesAmount <= 0 || !selectedProduct) {
      toast.error('Please enter a valid amount.');
      return;
    }

    try {
      // Optimistically update the UI
      const updatedProducts = products.map((product) =>
        product._id === selectedProduct._id
          ? { ...product, quantity: product.quantity - reliesAmount }
          : product
      );

      // Update the state for immediate UI feedback
      refetch(); // Trigger a manual refetch after the stock update

      const response = await useAxios.patch(`/products/${selectedProduct._id}/stock`, {
        quantityChange: -reliesAmount,
      });

      if (response.data) {
        toast.success('Product stock updated!');
        setShowReliesModal(false); // Close the modal after success
      }
    } catch (error) {
      toast.error('Error updating stock: ' + error.message);
    }
  };

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Products Dashboard</h1>

      {/* Table of Products */}
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
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition mr-2"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowAddModal(true);
                      }}
                    >
                      <AiOutlinePlus size={20} />
                    </button>
                    <button
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition mr-2"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowReliesModal(true);
                      }}
                    >
                      <AiOutlineMinus size={20} />
                    </button>
                    <button
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
                      onClick={() => {
                        // Trigger product detail update modal
                        setSelectedProduct(product);
                      }}
                    >
                      <AiOutlineEdit size={20} />
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
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Add Product Stock</h2>
            <input
              type="number"
              value={addAmount}
              onChange={(e) => setAddAmount(Number(e.target.value))}
              placeholder="Enter amount to add"
              className="w-full p-3 border rounded-lg mb-4"
            />
            <div className="flex justify-between">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                onClick={handleAddStock}
              >
                Add
              </button>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Relies Product Modal */}
      {showReliesModal && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Reduce Product Stock</h2>
            <input
              type="number"
              value={reliesAmount}
              onChange={(e) => setReliesAmount(Number(e.target.value))}
              placeholder="Enter amount to reduce"
              className="w-full p-3 border rounded-lg mb-4"
            />
            <div className="flex justify-between">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"
                onClick={handleReliesStock}
              >
                Reduce
              </button>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                onClick={() => setShowReliesModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsDashboard;
