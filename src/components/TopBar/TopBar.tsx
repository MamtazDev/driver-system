import React from 'react'
import './Topbar.scss'
import Image from 'next/image'
import profile from '../../../public/assets/dashHeader.jpg';

const TopBar = () => {
  return (
    <div className='main-header z-[50] p-[20px] flex justify-between items-center'>
      <h2 className=' '>
        Dashboard
      </h2>
      <div className='flex items-center  gap-4'>


        <Image className='h-[40px] rounded-[5px] w-[40px]' src={profile} alt="profile" />
        <p>Nicolos</p>
      </div>

    </div>
  )
}

export default TopBar