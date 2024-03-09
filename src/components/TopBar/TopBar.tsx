'use client'
import React, { useEffect, useState } from 'react'
import './Topbar.scss'
import Link from 'next/link'

const TopBar = () => {

  const [data, setData] = useState<any>({})

  useEffect(() => {

    let userDataString;
    if (typeof window !== undefined) {
      userDataString = localStorage.getItem('user');
    }
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setData(userData?.user);
    }
  }, []);


  return (
    <div className='main-header z-[80] p-[20px] flex justify-between items-center'>
      <h2 className=''>
        Dashboard
      </h2>
      <div className='flex items-center gap-4'>
        {/* <Image height={40} width={40} className='rounded-[5px]' src={data.image} alt="profile" /> */}
        <Link href={`/dashboard/driverDetails/${data?._id}`}> <p>{data?.fullName}</p></Link>
      </div>

    </div>
  )
}

export default TopBar