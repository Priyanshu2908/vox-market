'use client'
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const SellerProfilePage = () => {
  const seller = {
    name: "John Doe",
    avatar: "https://via.placeholder.com/150",
    rating: 4.5,
    totalSales: 1200,
    products: [
      { id: 1, name: "Product A", price: "$25", image: "https://via.placeholder.com/100" },
      { id: 2, name: "Product B", price: "$40", image: "https://via.placeholder.com/100" },
      { id: 3, name: "Product C", price: "$30", image: "https://via.placeholder.com/100" }
    ]
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader className="flex items-center gap-4">
          <Avatar className="w-20 h-20" src={seller.avatar} alt={seller.name} />
          <div>
            <CardTitle>{seller.name}</CardTitle>
            <p className="text-gray-500">Total Sales: {seller.totalSales}</p>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={16} /> <span>{seller.rating} / 5</span>
            </div>
          </div>
        </CardHeader>
      </Card>
      <h2 className="text-xl font-semibold mt-6">Products</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {seller.products.map((product) => (
          <Card key={product.id}>
            <CardContent className="flex flex-col items-center p-4">
              <img src={product.image} alt={product.name} className="w-24 h-24" />
              <p className="mt-2 font-medium">{product.name}</p>
              <p className="text-gray-500">{product.price}</p>
              <Button className="mt-2">View</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SellerProfilePage;
