'use client';
import axios from 'axios';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';


// Validation schema for product form
const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Naam nhi hai kya?'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(150, 'Too Long!')
    .required(),
  price: Yup.number()
    .required()
    .positive()
    .integer(),
  image: Yup.string()
    .required()
});

const AddProduct = () => {
  
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      image: ''
    },
    
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);

      axios.post('http://localhost:5001/product/add', values)
        .then((result) => {
          toast.success('Product added successfully');
          setSubmitting(false);
        }).catch((err) => {
          toast.error('Something went wrong');
          setSubmitting(false);
        });
    }
  });

  

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border rounded-lg"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            className="w-full px-3 py-2 border rounded-lg"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            className="w-full px-3 py-2 border rounded-lg"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Product Image</label>
          <input
            type="file"
            name="image"
            onChange={(event) => {
              formik.setFieldValue("image", event.currentTarget.files[0]);
            }}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Add Product
        </button>
      </form>
    </div>
    );
};


export default AddProduct;