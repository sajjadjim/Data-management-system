import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosInstance from '../../../../Hook/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
  const useAxios = useAxiosInstance();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const { data: allPayments = [], isLoading, isFetching, refetch } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await useAxios.get('/buy-products');
      return res.data || [];
    },
  });

if (isLoading) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <svg
        className="animate-spin h-8 w-8 text-blue-600 mb-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <div>Loading...</div>
    </div>
  );
}
if (isFetching) return <div>Updating...</div>;

  const handlePayRemaining = (payment) => {
    setSelectedPayment(payment);
    setRemainingAmount(payment.remainingAmount);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async () => {
    if (paymentAmount <= 0 || paymentAmount > remainingAmount) {
      toast.error('Please enter a valid payment amount.');
      return;
    }

    try {
      // Make API call to process the remaining payment
      await useAxios.patch(`/buy-products/${selectedPayment._id}/pay-remaining`, {
        paymentAmount,
      });

      // Update the UI with the new remaining amount
      setRemainingAmount(remainingAmount - paymentAmount);
      toast.success('Remaining balance updated successfully!');

      // Refresh the data to reflect updated information
      refetch();

      // Close the modal after successful payment
      setShowPaymentModal(false);
    } catch (error) {
      toast.error('Error processing payment: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Payment History</h1>

      {/* Payment History Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full table-auto text-center">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 border">Buyer Name</th>
              <th className="px-6 py-3 border">Buyer Email</th>
              <th className="px-6 py-3 border">Payment Method</th>
              <th className="px-6 py-3 border">Purchase Date</th>
              <th className="px-6 py-3 border">Payment Amount</th>
              <th className="px-6 py-3 border">Remaining Amount</th>
              <th className="px-6 py-3 border">Quantity</th>
              <th className="px-6 py-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {allPayments.map((payment) => (
              <tr key={payment._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border">{payment.buyerName}</td>
                <td className="px-6 py-4 border">{payment.buyerEmail}</td>
                <td className="px-6 py-4 border">{payment.paymentMethod}</td>
                <td className="px-6 py-4 border">{payment.purchaseDate}</td>
                <td className="px-6 py-4 border">{payment.paymentAmount} Taka</td>

                {/* Conditionally style the remaining amount */}
                <td
                  className={`px-6 py-4 border ${
                    payment.remainingAmount === 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {payment.remainingAmount === 0
                    ? 'Paid in Full'
                    : `${payment.remainingAmount} Taka`}
                </td>

                <td className="px-6 py-4 border">{payment.quantity}</td>

                {/* Show the option to pay remaining balance if not fully paid */}
                <td className="px-6 py-4 border">
                  {payment.remainingAmount > 0 && (
                    <button
                      onClick={() => handlePayRemaining(payment)}
                      className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-500 transition ease-in-out duration-300"
                    >
                      Pay Remaining
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Pay Remaining Amount</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Enter Payment Amount</label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                max={remainingAmount}
                className="w-full p-3 border rounded-lg"
                placeholder={`Max: ${remainingAmount} Taka`}
              />
            </div>

            <div className="flex justify-between">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
                onClick={handlePaymentSubmit}
              >
                Submit Payment
              </button>
              <button
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
                onClick={() => setShowPaymentModal(false)}
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

export default PaymentHistory;
