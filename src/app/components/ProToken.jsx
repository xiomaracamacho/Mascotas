import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const proteger = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
  
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/'); 
        }
      }
    }, [router]);

    return typeof window !== 'undefined' && localStorage.getItem('token') ? <WrappedComponent {...props} /> : null;
  };
};




