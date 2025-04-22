'use client';
import axios from 'axios';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';

// Validation schema for product form
const ProductSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required'),
  description: Yup.string().min(2, 'Too Short!').max(150, 'Too Long!').required('Description is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive').integer('Price must be an integer'),
  image: Yup.string().required('Image is required'),
});

const AddProduct = () => {
  const [preview, setPreview] = React.useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('seller-token') : '';

  const upload = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'PRIYANSHU CHAUBEY');
    fd.append('cloud_name', 'dyiomyslq');

    axios.post('https://api.cloudinary.com/v1_1/dyiomyslq/image/upload', fd)
      .then((result) => {
        toast.success('File uploaded successfully');
        setPreview(result.data.url);
        formik.setFieldValue('image', result.data.url);
      })
      .catch(() => {
        toast.error('Failed to upload file');
      });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      image: '',
    },
    validationSchema: ProductSchema,
    onSubmit: (values, { setSubmitting }) => {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/add`, values, {
        headers: {
          'x-auth-token': token,
        },
      })
        .then(() => {
          toast.success('Product added successfully');
          setSubmitting(false);
        })
        .catch(() => {
          toast.error('Something went wrong');
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            name="name"
            className="w-full px-3 py-2 border rounded-lg"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}
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
          {formik.touched.description && formik.errors.description && <p className="text-red-500 text-sm">{formik.errors.description}</p>}
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
          />
          {formik.touched.price && formik.errors.price && <p className="text-red-500 text-sm">{formik.errors.price}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            className="w-full px-3 py-2 border rounded-lg"
            onChange={upload}
          />
          {formik.touched.image && formik.errors.image && <p className="text-red-500 text-sm">{formik.errors.image}</p>}
        </div>
        {preview && <img src={preview} alt="preview" className="w-32 h-32 object-cover mt-2" />}

        <button
          disabled={!formik.values.image}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-500/50"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;