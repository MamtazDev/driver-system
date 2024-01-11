"use client"
import './liveCarStatus.scss'
import Image from 'next/image'
import Notifications from '../../../public/assets/Notifications.svg'
import Search from '../../../public/assets/Search.svg'
import Table from '../table/Table'
import LiveCarStatsData from './liveCarStatsData.json'

const LiveCarStatus = () => {
  return (
    <div className='live-car-status'>
      <div className="header">
        <Image src={Notifications} alt='Icon' className='notifications' />
        <div className="search-bar">
          <input type="text" placeholder='Search here' />
          <Image src={Search} alt='Icon' className='search-icon' />
        </div>
      </div>
      <Table
        tableTitle="Live Car Stats"
        data={LiveCarStatsData}
        colTitle1= "No."
        colTitle2= "Car No."
        colTitle3= "Driver"
        colTitle4= "Status"
        colTitle5= "Earning"
        colTitle6= ''
      />
    </div>
  )
}

export default LiveCarStatus