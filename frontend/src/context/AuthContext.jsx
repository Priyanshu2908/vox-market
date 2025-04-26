import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [sellerToken, setSellerToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('seller-token');
    if (token) {
      setSellerToken(token);
    } else {
      router.push('/seller-login');
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ sellerToken, setSellerToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;