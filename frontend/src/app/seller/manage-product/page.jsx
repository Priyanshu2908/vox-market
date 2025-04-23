'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconTrash, IconPlus } from '@tabler/icons-react';
import toast from 'react-hot-toast';

const ManageProduct = () => {
  const [productList, setProductList] = useState([]);

  const fetchProductData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/product/getall');
      setProductList(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/product/delete/${id}`);
      toast.success('Product deleted successfully');
      fetchProductData();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const addProduct = () => {
    // Redirect to add product page or open a modal for adding a product
    window.location.href = '/seller/add-product';
  };

  return (
    <div className="p-4 ml-72  text-center bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <p>Here you can view, add, and delete your products.</p>

      <div className="flex justify-end mb-4">
        <button
          onClick={addProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        >
          <IconPlus className="mr-2" /> Add Product
        </button>
      </div>

      <table className="w-full border-2 border-blue-300 bg-white shadow-lg rounded-lg ">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th>S.No</th>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => (
            <tr
              key={product._id}
              className={`border-2 border-blue-300 ${index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'}`}
            >
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{product._id}</td>
              <td className="p-3">{product.name}</td>
              <td className="p-3">${product.price}</td>
              <td className="p-3">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="rounded bg-red-500 text-white px-3 py-1"
                >
                  <IconTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProduct;