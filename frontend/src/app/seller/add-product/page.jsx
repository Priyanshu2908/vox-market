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
  const [preview, setPreview] = React.useState('');

  const upload = (e) => {

    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'PRIYANSHU CHAUBEY')
    fd.append('cloud_name', 'dyiomyslq')

    axios.post('https://api.cloudinary.com/v1_1/dyiomyslq/image/upload', fd)
        .then((result) => {
            toast.success('file upload successfully');
            console.log(result.data);
            setPreview(result.data.url);
            formik.setFieldValue('image', result.data.url);
        }).catch((err) => {
            console.log(err);
            toast.error('failed to upload file');

        });



}

  const token = typeof window !== 'undefined' ? localStorage.getItem('seller-token') : '';

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      image: ''
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);

      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/add`, values, {
        headers: {
          'x-auth-token': token
        }
      })
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
          <label  className="block text-gray-700">Image</label>
          <input
          id='imageUrl'
            type="file"
            name="image"
            className="w-full px-3 py-2 border rounded-lg"
            onChange={upload}
          />
        </div>
          {preview && <img src={preview} alt="preview" className="w-32 h-32 object-cover mt-2" />}
          
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Add Product
        </button>
      </form>
    </div>
  );
};


export default AddProduct;