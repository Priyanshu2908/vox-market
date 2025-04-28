'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalSales: 0,
    reach: 0,
    recentProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('seller-token');
        if (!token) {
          toast.error('Please login first');
          router.push('/seller-login');
          return;
        }

        setLoading(true);
        const response = await axios.get('http://localhost:5000/seller/dashboard', {
          headers: {
            'x-auth-token': token
          }
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        if (error.response?.status === 401) {
          toast.error('Session expired. Please login again');
          router.push('/seller-login');
        } else {
          toast.error(error.response?.data?.message || 'Failed to load dashboard data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (loading) {
    return (
      <main className="ml-72">
        <div className="p-4 flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="ml-72">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Seller Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Total Products</h2>
            <p className="text-3xl font-bold text-blue-600">{dashboardData.totalProducts}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Total Sales</h2>
            <p className="text-3xl font-bold text-green-600">₹{dashboardData.totalSales.toLocaleString()}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Total Reach</h2>
            <p className="text-3xl font-bold text-purple-600">{dashboardData.reach.toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Recent Products</h2>
          {dashboardData.recentProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products added yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardData.recentProducts.map((product) => (
                <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.image || '/placeholder-product.png'} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                      onError={(e) => {
                        e.target.src = '/placeholder-product.png';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600">₹{product.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-2">Stock: {product.stock}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;