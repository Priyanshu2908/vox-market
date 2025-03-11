'use client';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';


const browseproduct = () => {
    
    const [products, setproductList,] = useState([]);
    
        const fetchproductData = async () => {
            const res = await axios.get('http://localhost:5000/product/getall');
            console.table(res.data);
            setproductList(res.data);
        }
    
        useEffect(() => {
            fetchproductData();
        }, []);
    
       

       
        // Add more products as needed
    

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Browse Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                    <div key={product.id} className="border p-4 rounded-lg shadow-lg">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-700 mb-2">{product.price}</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default browseproduct;