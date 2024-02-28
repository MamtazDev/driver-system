
'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuth from '../hooks/auth';
import RequireAuth from '../hooks/RequireAuth';

const Homepage = () => {
    const router = useRouter();
    const { user, loading } = useAuth();


    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [loading, user, router]);


    return (
        <>
            <div className='w-[100px] h-[100px] flex justify-center' style={{ width: "50px", height: "50px" }}>
                <h1>Loading...</h1>
            </div>
        </>
    );
};

export default RequireAuth(Homepage);
