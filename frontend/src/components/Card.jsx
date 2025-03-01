import React from 'react'

const Card = ({ title, description, primaryText, secondaryText }) => {
    return (
        <div className='bg-white border border-gray-300 shadow-md rounded-md p-8'>
            <h1 className='text-3xl font-bold mb-5'>{title}</h1>

            <p className='mb-5'>{description}</p>

            <div className='flex gap-4'>
                <button className='bg-blue-500 px-3 py-1 text-white rounded-md'>
                    {primaryText}
                </button>
                <button className='border border-blue-500 px-3 py-1 text-blue-500 rounded-md'>
                    {secondaryText}
                </button>
            </div>

        </div>
    )
}

export default Card 