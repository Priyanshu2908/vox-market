'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders'); // Adjust URL if needed
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching orders');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Update the order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}`, { orderStatus: newStatus });
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (error) {
      alert('Error updating order status');
    }
  };

  // Delete an order
  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
    } catch (error) {
      alert('Error deleting order');
    }
  };

  // Show loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Order ID</th>
            <th className="px-4 py-2 text-left">Customer</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Total</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td className="px-4 py-2">{order._id}</td>
              <td className="px-4 py-2">{order.user?.name}</td>
              <td className="px-4 py-2">
                <select
                  value={order.orderStatus}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="bg-gray-100 rounded-md p-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
              <td className="px-4 py-2">${order.totalAmount.toFixed(2)}</td>
              <td className="px-4 py-2">
                <Link to={`/orders/${order._id}`} className="text-blue-500 hover:underline">
                  View Details
                </Link>
                <button
                  onClick={() => handleDelete(order._id)}
                  className="ml-2 text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
