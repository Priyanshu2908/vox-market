import { Toaster } from "react-hot-toast";
export default function SellerLayout({ children }) {
  return (
    <html lang="en" className="">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <Toaster position="top-right" />
        {children}
      
      </body>
    </html>
  );
}
