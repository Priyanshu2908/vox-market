'use client';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Link from 'next/link';

const Manageuser = () => {


    const [userList, setuserList] = useState([]);

    const fetchuserData = async () => {
        const res = await axios.get('http://localhost:5000/user/getall');
        console.table(res.data);
        setuserList(res.data);
    }

    useEffect(() => {
        fetchuserData();
    }, []);

    const deleteuser = (id) => {
        axios.delete(`http://localhost:5000/user/delete/ ${id}`)
            .then((result) => {
                toast.success('user deleted successfully');
                fetchuserData();
            }).catch((err) => {
                console.log(err);
                toast.error('Falied to delete user');

            });
    }

    return (
        <div>
            <div className='max-w-[80%] mx-auto h-screen mt-8'>
                <h1 className='text-3xl font-bold text-center'>Manage user</h1>

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
                            userList.map((user, index) => {
                                return <tr key={user._id}
                                    className={`border-2 border-blue-300 ${index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'}`}>
                                    {/* className={'border-2 border-blue-300 ' + (index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200')}> */}
                                    <td className='p-3'>{index + 1}</td>
                                    <td className='p-3'>{user._id}</td>
                                    <td className='p-3'>{user.name}</td>
                                    <td className='p-3'>{user.email}</td>
                                    <td className='p-3'>{user.city}</td>
                                    <td className='p-3'>{new Date(user.createdAt).toLocaleDateString()}</td>

                                    <td>
                                        <button onClick={() => { deleteuser(user._id) }}
                                            className='rounded bg-red-500 text-white px-3 py-1'>
                                            <IconTrash />
                                        </button>
                                    </td>

                                    <td>
                                        <Link href={`/update-user/${user._id}`}
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

export default Manageuser;