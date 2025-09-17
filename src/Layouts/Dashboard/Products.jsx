import React, { useState, useEffect } from 'react';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'; // Icons
import useAxiosInstance from '../../Hook/useAxiosInstance'; // Custom axios hook
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { useSpring, animated } from '@react-spring/web'; // Import for React Spring animations

const ProductsDashboard = () => {
  useEffect(() => {
    document.title = "Dashboard - Products";
  });

  const useAxios = useAxiosInstance();

  // State for modal, pagination, product quantity inputs
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReliesModal, setShowReliesModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // State for Product Detail Modal
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false); // Confirmation Modal for Deletion
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addAmount, setAddAmount] = useState(0);
  const [reliesAmount, setReliesAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Show 10 products per page
  const [refreshKey, setRefreshKey] = useState(0); // Key to trigger re-fetch

  // Fetch all products using React Query with refetch triggered by refreshKey
  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ['products', refreshKey], // Add refreshKey to queryKey for re-fetch
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

      // Trigger a manual refetch by changing the refreshKey
      setRefreshKey((prevKey) => prevKey + 1);

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

      // Trigger a manual refetch by changing the refreshKey
      setRefreshKey((prevKey) => prevKey + 1);

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

  // Handle Product Deletion
  const handleDeleteProduct = async () => {
    try {
      const response = await useAxios.delete(`/products/${selectedProduct._id}`);

      if (response.data) {
        toast.success('Product deleted successfully!');
        refetch(); // Re-fetch the products list to reflect the deletion
        setShowDeleteConfirmModal(false); // Close the modal after successful deletion
      }
    } catch (error) {
      toast.error('Error deleting product: ' + error.message);
    }
  };

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Animations for table rows using React Spring
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 500 } });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Products Dashboard</h1>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin border-t-4 border-blue-500 w-16 h-16 rounded-full"></div>
        </div>
      )}

      {/* Table of Products */}
      {!isLoading && (
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
              {currentProducts?.map((product) => (
                <animated.tr
                  key={product._id}
                  className="hover:bg-gray-100"
                  style={fadeIn} // Apply fade-in animation to rows
                >
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
                      className="bg-yellow-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition mr-2"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowEditModal(true); // Open the Product Detail Modal
                      }}
                    >
                      <AiOutlineEdit size={20} />
                    </button>
                    <button
                      className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowDeleteConfirmModal(true); // Open the delete confirmation modal
                      }}
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                </animated.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <ul className="flex space-x-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`cursor-pointer px-6 py-3 rounded-lg text-lg ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>

      {/* Product Deletion Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Are you sure?</h2>
            <p className="mb-4">Do you really want to delete this product?</p>
            <div className="flex justify-between">
              <button
                className="bg-red-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-red-500 transition"
                onClick={handleDeleteProduct}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
                onClick={() => setShowDeleteConfirmModal(false)}
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals for Product Actions */}
      {/* Your modals for Add, Relies, Edit, and Delete will go here */}
    </div>
  );
};

export default ProductsDashboard;
