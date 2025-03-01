import Link from 'next/link';
import React from 'react'

const NotFound = () => {
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className='text-center space-y-4'>
                <h1 className='text-9xl font-bold'>404</h1>
                <h3 className='text-4xl font-bold'>Not Found</h3>
                <Link
                    href="/"
                    className='block bg-black p-3 rounded-xl text-white'
                >
                    Back To Home
                </Link>
            </div>
        </div>
    )
}

export default NotFound;