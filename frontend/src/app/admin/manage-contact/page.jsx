'use client';
import {IconSquareRoundedCheck, IconSquareRoundedCheckFilled, IconTrash } from '@tabler/icons-react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Managecontact = () => {


    const [contactList, setcontactList,] = useState([]);

    const fetchcontactData = async () => {
        const res = await axios.get('http://localhost:5000/contact/getall');
        console.table(res.data);
        setcontactList(res.data);
    }

    useEffect(() => {
        fetchcontactData();
    }, []);

    const deletecontact = async (id) => {
        console.log(id);
        const res = await axios.delete(`http://localhost:5000/contact/delete/${id}`);
        console.log(res.data);
        toast.success('contact deleted');
        fetchcontactData();
    }
    const updatestatus = (index) => {
        const temp = contactList;

        temp[index].completed = !temp[index].completed;
        setcontactList([...temp]);
    }

    return (
        <div>
            <div className='max-w-[80%] mx-auto h-screen mt-8'>
                <h1 className='text-3xl font-bold text-center'>Manage contact</h1>

                <table className='w-full mt-10 border-2 border-blue-300'>
                    <thead className='bg-blue-600 text-white'>
                        <tr>
                            <th>S.No</th>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>Message</th>
                            <th>DATE</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contactList.map((contact, index) => {
                                return (
                                        
                                    <tr key={contact._id}
                                        className={`border-2 border-blue-300 ${index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'}`}>
                                        <td className='p-3'>{index + 1}</td>
                                        <td className='p-3'>{contact._id}</td>
                                        <td className='p-3'>{contact.name}</td>
                                        <td className='p-3'>{contact.email}</td>
                                        <td className='p-3'>{contact.message}</td>
                                        <td className='p-3'>{new Date(contact.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <button onClick={() => { deletecontact(contact._id) }}
                                                className='rounded bg-red-500 text-white px-3 py-1'>
                                                <IconTrash />
                                            </button>
                                        </td>
                                        <td>
                                            <button className='bg-white p-2 rounded' onClick={() => { updatestatus(index) }}>
                                                {
                                                    contact.completed ?
                                                        <IconSquareRoundedCheckFilled className='text-green-700' size={24} /> :
                                                        <IconSquareRoundedCheck className='text-green-700' size={24} />
                                                }
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Managecontact;