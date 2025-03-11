'use client'
import { IconLoader3, IconSend2 } from '@tabler/icons-react';
import axios from 'axios';
import { useFormik } from 'formik'; 
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Naam nhi hai kya?'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().required('Required'),
});

const contact = () => {

  // initializing formik
  const contactForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },


onSubmit: (value, {resetForm,setSubmitting}) => {
  console.log(value);

  // send values to backend
  // send a post request to backend
  axios.post('http://localhost:5000/contact/add', value)
  .then((result) => {
    toast.success('Form submitted successfully');
    resetForm();
  }).catch((err) => {
    console.log(err);
    toast.error('Something went wrong');
    setSubmitting(false);
  });
},
validationSchema: contactSchema
});



return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={contactForm.handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={contactForm.handleChange}
                    onBlur={contactForm.handleBlur}
                    value={contactForm.values.name}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {contactForm.touched.name && contactForm.errors.name ? (
                    <div className="text-red-500 text-sm mt-1">{contactForm.errors.name}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={contactForm.handleChange}
                    onBlur={contactForm.handleBlur}
                    value={contactForm.values.email}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {contactForm.touched.email && contactForm.errors.email ? (
                    <div className="text-red-500 text-sm mt-1">{contactForm.errors.email}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                    id="message"
                    name="message"
                    onChange={contactForm.handleChange}
                    onBlur={contactForm.handleBlur}
                    value={contactForm.values.message}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {contactForm.touched.message && contactForm.errors.message ? (
                    <div className="text-red-500 text-sm mt-1">{contactForm.errors.message}</div>
                ) : null}
            </div>
            <button
                type="submit"
                disabled={contactForm.isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {contactForm.isSubmitting ? <IconLoader3 className="animate-spin" /> : <IconSend2 />}
                Submit
            </button>
        </form>
    </div>
)
}

export default contact;