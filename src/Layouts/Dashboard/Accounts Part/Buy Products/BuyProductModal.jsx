import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosInstance from '../../../../Hook/useAxiosInstance';
import { jsPDF } from "jspdf"; // Import jsPDF

const BuyProductModal = ({ product, closeModal, refetch }) => {
  const useAxios = useAxiosInstance();
  
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [purchaseDate] = useState(new Date().toLocaleDateString()); // Today's Date
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [isPartialPayment, setIsPartialPayment] = useState(false);
  const [quantityToBuy, setQuantityToBuy] = useState(1); // Default 1 product to buy
  const [generateReceipt, setGenerateReceipt] = useState(false); // Toggle for receipt generation

  // Safely access product's quantity, default to 0 if product is undefined
  const totalPrice = product?.price * quantityToBuy || 0; // Total price for selected quantity

  // Handle Submit
  const handleSubmit = async () => {
    if (!buyerName || !buyerEmail || !paymentMethod || quantityToBuy <= 0 || (isPartialPayment && paymentAmount <= 0)) {
      toast.error('Please fill out all fields and make a valid payment.');
      return;
    }

    try {
      // Handle Partial Payment
      const remainingAmount = isPartialPayment ? totalPrice - paymentAmount : 0;

      // Call API to record the purchase
      await useAxios.post('/buy-product', {
        productId: product._id,
        buyerName,
        buyerEmail,
        paymentMethod,
        purchaseDate,
        paymentAmount,
        remainingAmount, // Store remaining balance if it's a partial payment
        quantity: quantityToBuy, // The quantity the buyer wants to purchase
      });

      // Update product quantity in the database (subtract the quantity purchased)
      await useAxios.patch(`/products/${product._id}/stock`, {
        quantityChange: -quantityToBuy, // Deduct the quantity purchased from stock
      });

      toast.success('Product purchase recorded!');
      refetch(); // Re-fetch the products list to reflect stock change

      if (generateReceipt) {
        // Generate and download the receipt as PDF
        generatePurchaseReceipt();
      }

      closeModal(); // Close the modal
    } catch (error) {
      toast.error('Error processing the purchase: ' + error.message);
    }
  };

  const generatePurchaseReceipt = () => {
    const doc = new jsPDF();

    // Add receipt content
    doc.setFontSize(16);
    doc.text("---- RECEIPT ----", 20, 20);

    doc.setFontSize(12);
    doc.text(`Buyer: ${buyerName}`, 20, 30);
    doc.text(`Email: ${buyerEmail}`, 20, 40);
    doc.text(`Product: ${product?.name || 'N/A'}`, 20, 50);
    doc.text(`Quantity: ${quantityToBuy}`, 20, 60);
    doc.text(`Total Price: ${totalPrice} Taka`, 20, 70);
    doc.text(`Payment Method: ${paymentMethod}`, 20, 80);
    doc.text(`Purchase Date: ${purchaseDate}`, 20, 90);

    if (isPartialPayment) {
      doc.text(`Amount Paid: ${paymentAmount} Taka`, 20, 100);
    }

    const remainingAmount = isPartialPayment ? totalPrice - paymentAmount : 0;
    doc.text(`Remaining Amount: ${remainingAmount} Taka`, 20, 110);

    doc.text("--------------------", 20, 120);

    // Save the PDF
    doc.save("purchase_receipt.pdf");

    toast.info("Receipt generated successfully! You can download it.");
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Buy Product</h2>
        
        {/* Buyer Information */}
        <input
          type="text"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          placeholder="Buyer Name"
          className="w-full p-3 border rounded-lg mb-4"
        />
        <input
          type="email"
          value={buyerEmail}
          onChange={(e) => setBuyerEmail(e.target.value)}
          placeholder="Buyer Email"
          className="w-full p-3 border rounded-lg mb-4"
        />
        
        {/* Product Quantity Selection */}
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantityToBuy}
            min="1"
            max={product?.quantity || 0} // Prevent buying more than the available stock
            onChange={(e) => setQuantityToBuy(Math.min(e.target.value, product?.quantity))}
            className="w-full p-3 border rounded-lg"
          />
          <span className="text-gray-500">Available stock: {product?.quantity || 0}</span>
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="block text-gray-700">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="Online Payment">Online Payment</option>
            <option value="Due">Due</option>
          </select>
        </div>

        {/* Partial Payment */}
        <div className="mb-4">
          <label className="block text-gray-700">Partial Payment</label>
          <input
            type="checkbox"
            checked={isPartialPayment}
            onChange={() => setIsPartialPayment(!isPartialPayment)}
            className="mr-2"
          />
          <span>If yes, enter the amount</span>
          {isPartialPayment && (
            <div className="mt-2">
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                placeholder={`Enter amount to pay (Max: ${totalPrice} Taka)`}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          )}
        </div>
        
        {/* Display remaining balance if partial payment */}
        {isPartialPayment && paymentAmount > 0 && (
          <div className="text-red-600 mb-4">
            Remaining balance: {totalPrice - paymentAmount} Taka
          </div>
        )}

        {/* Receipt Generation Option */}
        <div className="mb-4">
          <label className="block text-gray-700">Generate Receipt</label>
          <input
            type="checkbox"
            checked={generateReceipt}
            onChange={() => setGenerateReceipt(!generateReceipt)}
            className="mr-2"
          />
          <span>Check this box if you want a receipt</span>
        </div>

        {/* Submit */}
        <div className="flex justify-between">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyProductModal;
