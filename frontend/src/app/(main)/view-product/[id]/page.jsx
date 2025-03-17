'use client';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const ViewProduct = () => {

    const [productData, setProductData] = useState(null);
    const { id } = useParams();


    if(productData === null){
        return <div>Loading...</div>
    }

    return (
        <div>ViewProduct</div>
    )
}

export default ViewProduct;