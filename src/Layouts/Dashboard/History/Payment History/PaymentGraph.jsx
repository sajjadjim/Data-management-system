import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PaymentGraph = () => {
  const [allPayments, setAllPayments] = useState([]);
  const [dateFilter, setDateFilter] = useState('All'); // Default to "All"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch payments data from the API (https://electronics-database-three.vercel.app/buy-products)
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://electronics-database-three.vercel.app/buy-products');
        // Ensure the response data is an array
        if (Array.isArray(response.data)) {
          setAllPayments(response.data);
        } else {
          setError('Error: Data fetched is not an array');
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Error fetching payment data');
        console.error(err);
      }
    };

    fetchPayments();
  }, []);

  // Filter the payments based on the selected date
  const filteredPayments = dateFilter === 'Today'
    ? allPayments.filter(payment => payment.purchaseDate === new Date().toLocaleDateString())
    : allPayments;

  // Count for Paid Full and Remaining Amount
  const paidFullCount = Array.isArray(filteredPayments)
    ? filteredPayments.filter(payment => payment.remainingAmount === 0).length
    : 0;

  const remainingCount = Array.isArray(filteredPayments)
    ? filteredPayments.filter(payment => payment.remainingAmount > 0).length
    : 0;

  // Data for the chart
  const data = {
    labels: ['Paid Full', 'Remaining'],
    datasets: [
      {
        label: 'Payment Status',
        data: [paidFullCount, remainingCount],
        backgroundColor: ['#42A5F5', '#FF7043'], // Beautiful colors: Blue for Paid Full, Orange for Remaining
        borderColor: ['#1E88E5', '#D32F2F'],
        borderWidth: 2,
        hoverBackgroundColor: ['#1E88E5', '#FF5722'],
        hoverBorderColor: ['#0D47A1', '#D50000'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 20,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: 'Payment Status Distribution',
        font: {
          size: 16,
          weight: 'bold',
        },
        color: '#1976D2',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#E0E0E0',
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    animation: {
      duration: 800, // Smooth animation on load
    },
  };

  // Loading, Error Handling
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-100 to-white shadow-xl rounded-xl mt-6">

      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Payment Status Graph</h1>

      {/* Date Filter */}
      <div className="mb-6 flex justify-center space-x-4">
        <label htmlFor="date-filter" className="text-lg font-semibold">Filter by Date: </label>
        <select
          id="date-filter"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-3 border rounded-lg shadow-md hover:border-blue-400 transition ease-in-out"
        >
          <option value="All">All</option>
          <option value="Today">Today</option>
        </select>
      </div>

      {/* Display the bar chart */}
      <div className="flex justify-center mb-6">
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PaymentGraph;
