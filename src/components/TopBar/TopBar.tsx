'use client'
import React from 'react'
import './Topbar.scss'

const TopBar = () => {
  // get logged in user from  localstorage
  const userData: any = JSON.parse(localStorage.getItem('user') || 'null');
  const { fullName } = userData?.user || {};

  return (
    <div className='main-header z-[50] p-[20px] flex justify-between items-center'>
      <h2 className=''>
        Dashboard
      </h2>
      <div className='flex items-center gap-4'>
        {/* <Image className='h-[40px] rounded-[5px] w-[40px]' src={profile} alt="profile" /> */}
        <p>{fullName}</p>
      </div>

    </div>
  )
}

export default TopBar