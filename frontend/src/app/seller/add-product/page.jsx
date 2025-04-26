'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';

const AddProduct = () => {
  const router = useRouter();
  const [preview, setPreview] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        productForm.setFieldValue('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const productSchema = Yup.object().shape({
    name: Yup.string()
      .required('Product name is required')
      .min(2, 'Name must be at least 2 characters'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be positive')
      .max(1000000, 'Price cannot exceed 1,000,000'),
    description: Yup.string()
      .required('Description is required')
      .min(10, 'Description must be at least 10 characters'),
    
    category: Yup.string()
      .required('Category is required')
      .oneOf(['electronics', 'clothing', 'books', 'home', 'toys'], 'Invalid category'),
    stock: Yup.number()
      .required('Stock is required')
      .integer('Stock must be a whole number')
      .min(0, 'Stock cannot be negative')
      .max(10000, 'Stock cannot exceed 10,000'),
  });

  const productForm = useFormik({
    initialValues: {
      name: '',
      price: '',
      description: '',
      image: '',
      category: '',
      stock: '',
    },
    validationSchema: productSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const token = localStorage.getItem('seller-token');
        if (!token) {
          toast.error('Please login first');
          router.push('/seller-login');
          return;
        }

        await axios.post('http://localhost:5000/product/add', values, {
          headers: {
            'x-auth-token': token
          }
        });

        toast.success('Product added successfully');
        resetForm();
        router.push('/seller/manage-product');
      } catch (error) {
        console.error('Error adding product:', error);
        toast.error(error.response?.data?.message || 'Failed to add product. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="p-4 ml-72 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Product</h1>

        <form onSubmit={productForm.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              onChange={productForm.handleChange}
              onBlur={productForm.handleBlur}
              value={productForm.values.name}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product name"
            />
            {productForm.touched.name && productForm.errors.name && (
              <p className="text-red-500 text-xs mt-1">{productForm.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">₹</span>
              <input
                type="number"
                name="price"
                onChange={productForm.handleChange}
                onBlur={productForm.handleBlur}
                value={productForm.values.price}
                className="w-full p-2 pl-7 border rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
                step="0.01"
              />
            </div>
            {productForm.touched.price && productForm.errors.price && (
              <p className="text-red-500 text-xs mt-1">{productForm.errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              onChange={productForm.handleChange}
              onBlur={productForm.handleBlur}
              value={productForm.values.description}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 h-32"
              placeholder="Describe your product..."
            />
            {productForm.touched.description && productForm.errors.description && (
              <p className="text-red-500 text-xs mt-1">{productForm.errors.description}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Image Upload</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 border rounded-lg"
              onChange={handleFileUpload}
            />
            {productForm.touched.image && productForm.errors.image && (
              <p className="text-red-500 text-sm">{productForm.errors.image}</p>
            )}
            {preview && (
              <img src={preview} alt="preview" className="w-32 h-32 object-cover mt-2 rounded-lg" />
            )}
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              onChange={productForm.handleChange}
              onBlur={productForm.handleBlur}
              value={productForm.values.category}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="home">Home & Garden</option>
              <option value="toys">Toys & Games</option>
            </select>
            {productForm.touched.category && productForm.errors.category && (
              <p className="text-red-500 text-xs mt-1">{productForm.errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              onChange={productForm.handleChange}
              onBlur={productForm.handleBlur}
              value={productForm.values.stock}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Number of items in stock"
            />
            {productForm.touched.stock && productForm.errors.stock && (
              <p className="text-red-500 text-xs mt-1">{productForm.errors.stock}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push('/seller/manage-product')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={productForm.isSubmitting}
              className="w-32 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {productForm.isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding...
                </>
              ) : (
                'Add Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;