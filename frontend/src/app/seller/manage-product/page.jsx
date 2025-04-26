'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconTrash, IconPlus } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const ManageProduct = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchProductData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('seller-token');
      const res = await axios.get('http://localhost:5000/product/getall', {
        headers: {
          'x-auth-token': token
        }
      });
      setProductList(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.');
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('seller-token');
      await axios.delete(`http://localhost:5000/product/delete/${id}`, {
        headers: {
          'x-auth-token': token
        }
      });
      toast.success('Product deleted successfully');
      fetchProductData();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="p-4 ml-72 text-center bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <p className="text-gray-600 mb-6">Here you can view, add, and delete your products.</p>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push('/seller/add-product')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center transition-colors"
        >
          <IconPlus className="mr-2" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={fetchProductData}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : productList.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No products found. Add some products to get started!</p>
            <button
              onClick={() => router.push('/seller/add-product')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-blue-300">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3">S.No</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, index) => (
                  <tr
                    key={product._id}
                    className={`border-2 border-blue-300 ${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}`}
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">₹{product.price}</td>
                    <td className="p-3 capitalize">{product.category}</td>
                    <td className="p-3">{product.stock || 'N/A'}</td>
                    <td className="p-3">
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="rounded bg-red-500 text-white px-3 py-1 hover:bg-red-600 transition-colors"
                        title="Delete Product"
                      >
                        <IconTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProduct;