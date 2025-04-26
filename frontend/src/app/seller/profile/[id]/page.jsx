'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SellerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const profileSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contact: Yup.string().required('Contact number is required'),
    address: Yup.string().required('Address is required'),
  });

  const profileForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      contact: '',
      address: '',
    },
    validationSchema: profileSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const token = localStorage.getItem('seller-token');
        await axios.put('http://localhost:5000/seller/update', values, {
          headers: {
            'x-auth-token': token
          }
        });
        toast.success('Profile updated successfully');
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error(error.response?.data?.message || 'Failed to update profile');
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('seller-token');
        const response = await axios.get('http://localhost:5000/seller/profile', {
          headers: {
            'x-auth-token': token
          }
        });
        const profile = response.data;
        profileForm.setValues({
          name: profile.name || '',
          email: profile.email || '',
          contact: profile.contact || '',
          address: profile.address || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="p-4 ml-72 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Seller Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <form onSubmit={profileForm.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              disabled={!isEditing}
              onChange={profileForm.handleChange}
              value={profileForm.values.name}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
            {profileForm.touched.name && profileForm.errors.name && (
              <p className="text-red-500 text-xs mt-1">{profileForm.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              disabled={!isEditing}
              onChange={profileForm.handleChange}
              value={profileForm.values.email}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
            {profileForm.touched.email && profileForm.errors.email && (
              <p className="text-red-500 text-xs mt-1">{profileForm.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
            <input
              type="text"
              name="contact"
              disabled={!isEditing}
              onChange={profileForm.handleChange}
              value={profileForm.values.contact}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
            {profileForm.touched.contact && profileForm.errors.contact && (
              <p className="text-red-500 text-xs mt-1">{profileForm.errors.contact}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              disabled={!isEditing}
              onChange={profileForm.handleChange}
              value={profileForm.values.address}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 h-32 disabled:bg-gray-100"
            />
            {profileForm.touched.address && profileForm.errors.address && (
              <p className="text-red-500 text-xs mt-1">{profileForm.errors.address}</p>
            )}
          </div>

          {isEditing && (
            <button
              type="submit"
              disabled={profileForm.isSubmitting}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {profileForm.isSubmitting ? 'Updating...' : 'Update Profile'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SellerProfile;
