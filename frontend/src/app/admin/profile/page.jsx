import React from 'react';

const AdminProfile = () => {
    const admin = {
        name: 'Admin User',
        email: 'admin123@gmail.com',
        role: 'Administrator',
        password: 'admin123',

    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <p className="text-gray-900">{admin.name}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <p className="text-gray-900">{admin.email}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Role:</label>
                    <p className="text-gray-900">{admin.role}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <p className="text-gray-900">{admin.password}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;