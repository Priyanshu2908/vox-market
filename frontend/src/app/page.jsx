import Link from 'next/link';
import React from 'react'

const page = () => {
    return (

        <div className="min-h-screen flex flex-col items-center justify-center bg-white  p-6">
            <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6">Welcome to Our QuicKart</h1>
                <p className="text-gray-600 mb-8">Login as a User or a Seller to get started.</p>

                <div className="space-y-4">
                    <Link href="/login" className="block w-full bg-blue-500 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-600 transition">User Login</Link>
                    <Link href="/seller-login" className="block w-full bg-green-500 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-600 transition">Seller Login</Link>
                    <Link href="/admin/adminlogin" className="block w-full bg-blue-500 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-600 transition">Admin Login</Link>
                </div>
            </div>
        </div>
    );
}




export default page