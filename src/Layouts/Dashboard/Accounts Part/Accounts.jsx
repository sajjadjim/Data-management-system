import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import BuyProducts from './Buy Products/BuyProducts';

export default function Accounts() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Accounts</h1>

      {/* Navigation Buttons */}
      <div className="mb-4 flex justify-center space-x-4">
        <Link to="/payment-history">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition">
            Payment History
          </button>
        </Link>

        <Link to="/product-history">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500 transition">
            Products History
          </button>
        </Link>
      </div>

      {/* Display the BuyProducts component */}
      <BuyProducts />
    </div>
  );
}
