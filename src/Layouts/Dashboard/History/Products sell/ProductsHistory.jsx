import React, { useState, useEffect } from 'react';
import useAxiosInstance from '../../../../Hook/useAxiosInstance';
import { AiOutlineSortAscending, AiOutlineSortDescending, AiOutlineShoppingCart } from 'react-icons/ai'; // Icons for sorting

export default function ProductHistory() {
  const useAxios = useAxiosInstance();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  // Sorting and state
  const [sortOrder, setSortOrder] = useState('desc'); // Sorting by descending by default
  const [sortField, setSortField] = useState('purchaseDate'); // Default sort field
  const [productHistory, setProductHistory] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product history (sales) data
  useEffect(() => {
    const fetchProductHistory = async () => {
      try {
        const response = await useAxios.get('/buy-products'); // API endpoint for purchase data
        setProductHistory(response.data || []);
      } catch (err) {
        setError('Error fetching product history');
      }
    };

    fetchProductHistory();
  }, []);

  // Fetch all products to match productId
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await useAxios.get('/products'); // API endpoint for product details
        setAllProducts(response.data || []);
      } catch (err) {
        setError('Error fetching product details');
      }
    };

    fetchProducts();
  }, []);

  // Match product details to the purchase history data
  const enrichedProductHistory = productHistory.map(sale => {
    const product = allProducts.find(p => p._id === sale.productId);
    return {
      ...sale,
      productName: product ? product.name : 'Product Not Found', // Match product name
      productPrice: product ? product.price : 0, // Match product price
    };
  });

  // Sort data by selected field (ascending/descending)
  const sortedProductHistory = enrichedProductHistory.sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];
    
    if (sortField === 'purchaseDate') {
      const dateA = new Date(valueA);
      const dateB = new Date(valueB);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      // Sorting for other fields like numeric fields
      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProductHistory?.length / productsPerPage);
  const currentProducts = sortedProductHistory?.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle sorting by date and other fields
  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc'); // Default to ascending when changing sort field
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-100 via-indigo-200 to-white shadow-lg rounded-xl mt-6">

      <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-8">Product Sales History</h1>

      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {/* Date Sorting */}
      <div className="mb-6 flex items-center justify-center space-x-4">
        <label htmlFor="sort-order" className="text-lg font-semibold">Sort by Date:</label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={() => handleSortChange('purchaseDate')}
          className="p-3 border rounded-lg shadow-md hover:border-blue-400 transition ease-in-out"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Product History Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full table-auto text-center bg-white shadow-lg rounded-xl">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 border cursor-pointer flex items-center justify-center space-x-1" onClick={() => handleSortChange('productName')}>
                Product Name <AiOutlineSortAscending className={`text-sm ${sortField === 'productName' && sortOrder === 'asc' ? 'rotate-180' : ''}`} />
              </th>
               <th className="px-6 py-3 border cursor-pointer" >Buyer Name</th>
              <th className="px-6 py-3 border cursor-pointer" onClick={() => handleSortChange('buyerEmail')}>Buyer Email</th>
              <th className="px-6 py-3 border cursor-pointer" onClick={() => handleSortChange('quantity')}>Quantity Sold</th>
              <th className="px-6 py-3 border cursor-pointer" onClick={() => handleSortChange('paymentMethod')}>Payment Method</th>
              <th className="px-6 py-3 border cursor-pointer" onClick={() => handleSortChange('purchaseDate')}>
                Purchase Date <AiOutlineSortAscending className={`text-sm ${sortField === 'purchaseDate' && sortOrder === 'asc' ? 'rotate-180' : ''}`} />
              </th>
              <th className="px-6 py-3 border cursor-pointer" onClick={() => handleSortChange('totalAmount')}>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts?.map((sale, index) => (
              <tr key={index} className="hover:bg-gray-100 transition duration-300 ease-in-out">
                <td className="px-6 py-4 border">{sale.productName}</td>
                <td className="px-6 py-4 border">{sale.buyerName}</td>
                <td className="px-6 py-4 border">{sale.buyerEmail}</td>
                <td className="px-6 py-4 border">{sale.quantity}</td>
                <td className="px-6 py-4 border">{sale.paymentMethod}</td>
                <td className="px-6 py-4 border">{sale.purchaseDate}</td>
                <td className="px-6 py-4 border">{sale.productPrice * sale.quantity} Taka</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
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
    </div>
  );
}
