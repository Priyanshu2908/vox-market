'use client';
import { Toaster } from "react-hot-toast";
import Sidebar from "./sidebar";
import SellerAuth from "@/components/SellerAuth";

export default function SellerLayout({ children }) {
  return (
    <SellerAuth>
      <html lang="en" className="">
        <body>
          <Toaster position="top-right" />
          <Sidebar />
          {children}
        </body>
      </html>
    </SellerAuth>
  );
}
