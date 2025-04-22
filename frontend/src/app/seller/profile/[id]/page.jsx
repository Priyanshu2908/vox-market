'use client'
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios"; // Import axios for API calls
import { Avatar } from "@radix-ui/react-avatar";

const SellerProfilePage = () => {

  const [seller, setSeller] = useState([]);

   const fetchSellerData = async () => {
       try {
           const res = await axios.get('http://localhost:5000/seller/getall');
           setSeller(res.data);
           console.table(res.data);
           // Uncomment or define setContactList if needed
           // setContactList(res.data);
       } catch (error) {
           console.error("Error fetching seller data:", error);
       }
   };

  useEffect(() => {
       fetchSellerData();
   },[]);
   
   
  // const seller = {
  //   name: " ",
  //   avatar: "",
  //   rating: "",  
  //   totalSales: "",
  //   products: [
  //     {
  //       id: 1,
  //       name: "",
  //       image: "",
  //       price: "",
  //     },
  //   ],
  // };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader className="flex items-center gap-4">
          {/* <Avatar  className="w-20 h-20" src={seller.avatar} alt={seller.name} /> */}
        </CardHeader>
        {/* <div className="flex items-center gap-4 p-4">
          <img className="w-20 h-20 rounded-full" src={seller.avatar} alt={seller.name} />
          <div>
            <h3 className="text-lg font-semibold">{seller.name}</h3>
            <p className="text-gray-500">Total Sales: {seller.totalSales}</p>
            <div className="flex items-center gap-1 text-yellow-500">
              <span className="text-sm">⭐ {seller.rating} / 5</span>
            </div>
          </div>
        </div> */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {seller.map((product,index) => (
            <Card key={index}>
              <CardContent className="flex flex-col items-center p-4">
                <img src={product.image} alt={product.name} className="w-24 h-24" />
                <p className="mt-2 font-medium">{product.name}</p>
                <p className="text-gray-500">{product.price}</p>
                <Button className="mt-2">View</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );

}
export default SellerProfilePage;
