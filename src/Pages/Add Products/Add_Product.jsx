import React, { useState } from "react";
import { FaImage, FaDollarSign, FaBarcode, FaWeightHanging, FaCalendarAlt } from "react-icons/fa"; // Importing FontAwesome Icons

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productCode: "",
    price: "",
    quantity: "",
    weight: "",
    issueDate: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className="bg-gradient-to-r from-blue-100 to-blue-100 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto bg-white p-12 rounded-xl shadow-2xl">
        <h2 className="text-5xl font-extrabold text-center text-blue-700 mb-8">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8 md:grid md:grid-cols-2 md:gap-8">
          {/* Left Column: Product Information */}
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 flex items-center">
                <FaBarcode className="mr-3 text-blue-600" />
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-lg px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all"
              />
            </div>

            {/* Product Code */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 flex items-center">
                <FaBarcode className="mr-3 text-blue-600" />
                Product Code
              </label>
              <input
                type="text"
                name="productCode"
                value={formData.productCode}
                onChange={handleChange}
                placeholder="Enter product code"
                className="w-full border border-gray-300 rounded-lg px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 flex items-center">
                <FaDollarSign className="mr-3 text-blue-600" />
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter product price"
                className="w-full border border-gray-300 rounded-lg px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 flex items-center">
                <FaWeightHanging className="mr-3 text-blue-600" />
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter product quantity"
                className="w-full border border-gray-300 rounded-lg px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all"
              />
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="space-y-6">
            {/* Weight */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 flex items-center">
                <FaWeightHanging className="mr-3 text-blue-600" />
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Enter product weight"
                className="w-full border border-gray-300 rounded-lg px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all"
              />
            </div>

            {/* Issue Date */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 flex items-center">
                <FaCalendarAlt className="mr-3 text-blue-600" />
                Issue Date
              </label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all"
              />
            </div>

            {/* Product Image */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 flex items-center">
                <FaImage className="mr-3 text-blue-600" />
                Product Image
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-lg px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all"
              />
              {formData.image && (
                <div className="mt-4">
                  <img
                    src={formData.image}
                    alt="Product Preview"
                    className="max-w-xs rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold shadow-lg hover:opacity-90 transition-all"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
