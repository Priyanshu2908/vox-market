'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalSales: 0,
    reach: 0,
    recentProducts: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('seller-token');
        const response = await axios.get('http://localhost:5000/seller/dashboard', {
          headers: {
            'x-auth-token': token
          }
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-4 ml-36 text-center">
      <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Total Products</h2>
          <p className="text-3xl font-bold">{dashboardData.totalProducts}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Total Sales</h2>
          <p className="text-3xl font-bold">₹{dashboardData.totalSales}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Reach</h2>
          <p className="text-3xl font-bold">{dashboardData.reach}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardData.recentProducts.map((product) => (
            <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;