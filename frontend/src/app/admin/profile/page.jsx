'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BrowserRouter as Router, } from 'react-router-dom';

const AdminProfilePage = () => {
    
        const router = useRouter();

        const resetForm = () => {
            // Add form reset logic here
            console.log('Form reset');
        };
    const handleClick = (e) => {
        e.preventDefault();
        resetForm(); // reset form
        router.push('/admin/manage-user'); // redirect to dashboard
    }
    const handleManageSellersClick = (e) => {
        e.preventDefault();
        resetForm(); // reset form
        router.push('/admin/manage-seller'); // redirect to manage sellers
    }
    
    return (
       
            <div className=" h-full bg-white  ">
              <div className="container  flex justify-center     mx-auto relative md:px-0 px-4 md:my-10 bg-[#111111]  rounded-none md:rounded-xl overflow-hidden">
                {/* Nav */}
                
              </div>
              <div
                className="items-center mt-10 md:mt-5 w-10/12 grid-cols-2 mx-auto overflow-x-hidden lg:grid md:py-14 lg:py-24 xl:py-14 lg:mt-3 xl:mt-5"
                data-aos="fade-right"
                data-aos-duration={800}
              >
                <div className="pr-2 md:mb-14 py-14 md:py-0">
                  <h1 className="text-3xl font-semibold text-blue-900 xl:text-5xl lg:text-3xl">
                    Hello Admin
                  </h1>
                  <p className="py-4 text-lg text-gray-500 2xl:py-8 md:py-6 2xl:pr-5">
                    Welcome to the admin dashboard. You can manage users, sellers and orders. You can also view products.
                  </p>
                 <div className="grid grid-cols-4 ">
                    <div className="">
                        <a href="/admin/manage-user"className="px-3 py-3 text-lg tracking-wider text-white bg-blue-500 rounded-lg hover:bg-blue-600 group">
                            <span>Manage User</span>{" "}
                        </a>
                    </div>
                    <div className="">
                        <a href="/admin/manage-seller"className="px-3 py-3 text-lg tracking-wider text-white bg-blue-500 rounded-lg  hover:bg-blue-600 group">
                            <span>Manage Seller</span>{" "}
                        </a>
                    </div>
                    <div className="">
                        <a href="/admin/manage-order"className="px-3 py-3 text-lg tracking-wider text-white bg-blue-500 rounded-lg  hover:bg-blue-600 group">
                            <span>Manage Order</span>{" "}
                        </a>
                    </div>
                    <div className="">
                        <a href="/admin/view-order/id"className="px-3 py-3 text-lg tracking-wider text-white bg-blue-500 rounded-lg hover:bg-blue-600 group">
                            <span>View Orders</span>{" "}
                        </a>
                    </div>
                 </div>
                </div>
                <div className="pb-10 overflow-hidden md:p-10 lg:p-0 sm:pb-0">
                  <img
                    id="heroImg1"
                    className="transition-all duration-300 ease-in-out hover:scale-105 lg:w-full sm:mx-auto sm:w-4/6 sm:pb-12 lg:pb-0"
                    src="https://bootstrapmade.com/demo/templates/FlexStart/assets/img/hero-img.png"
                    alt="Awesome hero page image"
                    width={500}
                    height={488}
                  />
                </div>
              </div>
            </div>
    );
}
   


    

export default AdminProfilePage;