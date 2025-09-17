import React, { useState } from "react";
import { FaImage, FaDollarSign, FaBarcode, FaWeightHanging, FaCalendarAlt } from "react-icons/fa"; // Importing FontAwesome Icons
import axios from "axios"; // For making API calls
import { toast, ToastContainer } from "react-toastify"; // For showing success or error messages

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    price: "",
    quantity: "",
    weight: "",
    issueDate: "",
    image: null, // Initially null (will be set by either URL or file)
    imageUrl: "", // To store URL if the user chooses to input an online image link
    imageOption: "offline", // 'offline' for file upload, 'online' for URL input
    category: "", // Added category
    description: "", // Added description
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change (image upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: URL.createObjectURL(file),
        imageUrl: "", // Clear image URL if user selects offline
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the product data for submission
    const productData = { ...formData };

    // If the image option is offline (file upload), we need to upload the image
    if (formData.imageOption === "offline" && formData.image) {
      const formDataForImage = new FormData();
      formDataForImage.append("image", formData.image); // Assuming 'image' contains the file object

      try {
        const response = await axios.post(
          "https://api.imgbb.com/1/upload?key=33a2c6805e11a3513bc48df11dc013df", // ImageBB API
          formDataForImage,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Update the image URL in the product data
        productData.image = response.data.data.url;
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image!"); // Show error toast if image upload fails
        return; // Stop execution if image upload fails
      }
    } else if (formData.imageOption === "online" && formData.imageUrl) {
      // If the user selected "online", use the provided image URL
      productData.image = formData.imageUrl;
    } else {
      toast.error("Please provide a valid image."); // Show error if no image is provided
      return; // Stop execution if no image is provided
    }

    try {
      // Send the product data to the backend for storage
      const response = await axios.post("https://electronics-database-three.vercel.app/products", productData);

      if (response.status === 200) {
        // Show success message (toast)
        toast.success("Product added successfully!");

        // Reset the form after successful submission
        setFormData({
          name: "",
          code: "",
          price: "",
          quantity: "",
          weight: "",
          issueDate: "",
          image: null,
          imageUrl: "",
          imageOption: "offline",
          category: "",
          description: "",
        });

        // Automatically dismiss the toast after 2 seconds
        setTimeout(() => {
          toast.dismiss(); // Dismiss the toast after 2 seconds
        }, 1000);
      } else {
        toast.error("Error adding product!"); // Show error message if adding product fails
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product!"); // Show error message if request fails
    }
  };

  return (
    <section className="min-h-screen py-16 px-6">
       <ToastContainer/>
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
                name="name"
                value={formData.name}
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
                name="code"
                value={formData.code}
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

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 flex items-center">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all"
              >
                <option value="">Select a Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Food">Food</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>

            {/* Product Description */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 flex items-center">
                Product Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                className="w-full border border-gray-300 rounded-lg px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all"
              />
            </div>

            {/* Image Upload Option */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Select Image Option</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="offline"
                  name="imageOption"
                  value="offline"
                  checked={formData.imageOption === "offline"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="offline" className="text-gray-700 mr-6">Offline (Upload Image)</label>
                <input
                  type="radio"
                  id="online"
                  name="imageOption"
                  value="online"
                  checked={formData.imageOption === "online"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="online" className="text-gray-700">Online (URL)</label>
              </div>
            </div>

            {/* Product Image */}
            {formData.imageOption === "offline" && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2 flex items-center">
                  <FaImage className="mr-3 text-blue-600" />
                  Product Image (Upload)
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
            )}

            {/* Product Image URL */}
            {formData.imageOption === "online" && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Product Image (URL)</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  className="w-full border border-gray-300 rounded-lg px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all"
                />
              </div>
            )}
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
