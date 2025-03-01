import React from 'react'

const Contact = () => {


    return (

        <div className='border-2 my-10 mx-36 p-10 rounded-lg shadow-lg bg-white mt-20 grid grid-cols-2 justify-center gap-10'> 
            <div >
               
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Contact Us</h2>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo tenetur incidunt explicabo doloribus placeat. Cupiditate similique molestias quod pariatur at.</p>



            </div>

            <div className="max-w-md mx-[50] p-6 bg-white rounded-2xl shadow-lg border-auto border-gray-200 ">
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-600 font-medium">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium">Message</label>
                        <textarea
                            placeholder="Type your message here"
                            rows="4"
                            className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>

        </div>
    )
};

export default Contact;