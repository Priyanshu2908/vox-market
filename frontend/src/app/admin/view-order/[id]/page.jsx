'use client'; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${id}`);
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching order details');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <p><strong>Order ID:</strong> {order && order._id}</p>
        <p><strong>Customer:</strong> {order && order.user && order.user.name}</p>
        <p><strong>Status:</strong> {order && order.orderStatus}</p>
        <p><strong>Total Amount:</strong> {order && order.totalAmount && `$${order.totalAmount.toFixed(2)}`}</p>
        <h2 className="mt-4 text-xl">Items</h2>
        <ul className="list-disc pl-5">
          {order && order.items && order.items.map((item, index) => (
            <li key={index}>{item.product.name} x {item.quantity} - ${item.product.price}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetails;
