import { Toaster } from "react-hot-toast";
import Sidebar from "./sidebar";
export default function SellerLayout({ children }) {
  return (
    <html lang="en" className="">
      <body>
        
        <Toaster position="top-right" />
        {children}
      <Sidebar />
      </body>
    </html>
  );
}
