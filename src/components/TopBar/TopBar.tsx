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
      <h2>
        Dashboard
      </h2>
      <div  className='profile-name flex items-center gap-4 border px-[10px] py-[10px] rounded-[8px]'>
        <Link href={`/dashboard/driverDetails/${data?._id}`}> <p>{data?.fullName}</p></Link>
      </div>

    </div>
  )
}

export default TopBar