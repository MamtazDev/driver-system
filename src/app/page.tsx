
'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react';

const Homepage = () => {

    

    useEffect(() => {
        redirect('/dashboard')
    }, [])

    return (
        <>
            <div className='w-[100px] h-[100px] flex justify-center' style={{ width: "50px", height: "50px" }}>
                <h1>Loading...</h1>
            </div>
        </>
    );
};

export default Homepage;
