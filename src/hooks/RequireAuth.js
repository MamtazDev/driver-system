// components/RequireAuth.js
'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuth from './auth';

const RequireAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [loading, user, router]);

    return <>{user ? <WrappedComponent {...props} /> : null}</>;
  };

  return Wrapper;
};

export default RequireAuth;
