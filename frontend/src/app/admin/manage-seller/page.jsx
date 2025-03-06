'use client';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Link from 'next/link';

const ManageSeller = () => {


    const [sellerList, setsellerList] = useState([]);

    const fetchsellerData = async () => {
        const res = await axios.get('http://localhost:5000/seller/getall');
        console.table(res.data);
        setsellerList(res.data);
    }

    useEffect(() => {
        fetchsellerData();
    }, []);

    const deleteseller = (id) => {
        axios.delete(`http://localhost:5000/seller/delete/ ${id}`)
            .then((result) => {
                toast.success('seller deleted successfully');
                fetchsellerData();
            }).catch((err) => {
                console.log(err);
                toast.error('Falied to delete seller');

            });
    }

    return (
        <div>
            <div className='max-w-[80%] mx-auto h-screen mt-8'>
                <h1 className='text-3xl font-bold text-center'>Manage Seller</h1>

                <table className='w-full mt-10 border-2 border-blue-300'>
                    <thead className='bg-blue-600 text-white'>
                        <tr>
                            <th>S.No</th>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>CITY</th>
                            <th>DATE</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellerList.map((seller, index) => {
                                return <tr key={seller._id}
                                    className={`border-2 border-blue-300 ${index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'}`}>
                                    {/* className={'border-2 border-blue-300 ' + (index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200')}> */}
                                    <td className='p-3'>{index + 1}</td>
                                    <td className='p-3'>{seller._id}</td>
                                    <td className='p-3'>{seller.name}</td>
                                    <td className='p-3'>{seller.email}</td>
                                    <td className='p-3'>{seller.city}</td>
                                    <td className='p-3'>{new Date(seller.createdAt).toLocaleDateString()}</td>

                                    <td>
                                        <button onClick={() => { deleteseller(seller._id) }}
                                            className='rounded bg-red-500 text-white px-3 py-1'>
                                            <IconTrash />
                                        </button>
                                    </td>

                                    <td>
                                        <Link href={`/update-seller/${seller._id}`}
                                            className='block w-fit mx-auto rounded bg-blue-500 text-white px-3 py-1'>
                                            <IconPencil />
                                        </Link>
                                        
                                        
                                    </td>

                                </tr>
                            })
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default ManageSeller;