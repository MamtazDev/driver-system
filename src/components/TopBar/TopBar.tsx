'use client'
import React, { useEffect, useState } from 'react'
import './Topbar.scss'
import Link from 'next/link'

const TopBar = () => {
  // get logged in user from  localstorage
  const [data, setData] = useState<any>({})

  useEffect(() => {

    let userDataString;
    if (typeof window !== undefined) {
      userDataString = localStorage.getItem('user');
    }
    // const userDataString : any = {};
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      // console.log('userData',userData)
      setData(userData?.user);
    }
  }, []);


  return (
    <div className='main-header z-[80] p-[20px] flex justify-between items-center'>
      <h2 className=''>
        Dashboard
      </h2>
      <div className='flex items-center gap-4'>
        {/* <Image className='h-[40px] rounded-[5px] w-[40px]' src={profile} alt="profile" /> */}
        <Link href={`/dashboard/driverDetails/${data?._id}`}> <p>{data?.fullName}</p></Link>
      </div>

    </div>
  )
}

export default TopBar