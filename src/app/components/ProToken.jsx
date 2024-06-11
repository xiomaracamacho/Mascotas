import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const protectRoutes = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      // Verificar si estamos en el entorno del navegador antes de acceder a localStorage
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/'); // Redirigir a la página de inicio de sesión si no hay token
        }
      }
    }, [router]);

    // Mientras verificamos la autenticación
    // También debes verificar si localStorage está definido antes de intentar acceder a él
    return typeof window !== 'undefined' && localStorage.getItem('token') ? <WrappedComponent {...props} /> : null;
  };
};




