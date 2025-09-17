import React from 'react';
import { AiOutlineDatabase, AiOutlineAppstoreAdd, AiOutlineUserAdd, AiOutlineSetting } from 'react-icons/ai';

const Section4 = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Relevant Features for Product Management</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Feature 1: Product Inventory */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <div className="flex justify-center mb-4">
            <AiOutlineDatabase size={40} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-center text-gray-700 mb-2">Manage Inventory</h3>
          <p className="text-center text-gray-500">
            Keep track of your product stock, manage inventory levels, and set reorder points to avoid stockouts.
          </p>
        </div>

        {/* Feature 2: Add New Product */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <div className="flex justify-center mb-4">
            <AiOutlineAppstoreAdd size={40} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-center text-gray-700 mb-2">Add New Product</h3>
          <p className="text-center text-gray-500">
            Easily add new products to your system with all the necessary details, including name, price, and category.
          </p>
        </div>

        {/* Feature 3: User Management */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <div className="flex justify-center mb-4">
            <AiOutlineUserAdd size={40} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-center text-gray-700 mb-2">User Management</h3>
          <p className="text-center text-gray-500">
            Manage user roles and permissions to ensure secure access to different parts of the product management system.
          </p>
        </div>

        {/* Feature 4: Settings */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <div className="flex justify-center mb-4">
            <AiOutlineSetting size={40} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-center text-gray-700 mb-2">Settings & Customization</h3>
          <p className="text-center text-gray-500">
            Customize the system according to your business needs, set preferences, and manage system settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section4;
