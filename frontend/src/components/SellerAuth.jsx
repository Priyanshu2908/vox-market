import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const SellerAuth = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('seller-token');
    if (!token) {
      toast.error('Please login first');
      router.push('/seller-login');
    }
  }, [router]);

  return children;
};

export default SellerAuth;