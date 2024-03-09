'use client'

import NoDataFound from '@/components/NoDataFound/NoDataFound';
import instance from '@/hooks/instance';
import ProtectedRoute from '@/routes/ProtectedRoute';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const AssignedDriverCars = () => {
  const router = useParams();
  const id = router.slug

  const [truckData, setTruckData] = useState({})

  useEffect(() => {

    const fetchUsers = async () => {

      try {
        const response = await instance.get(`/api/user/getUserById/${id}`);
        setTruckData(response?.data?.data?.assignedTo?.trucks)

        // console.log(response?.data?.data?.assignedTo)

        // setTruckData(user?.assignedTo?.trucks)

      } catch (error: any) {
        console.error('Error fetching users:', error.message);
      }
    };
    fetchUsers();
  }, [id]);

  console.log(truckData, "  user data get driver ")

  return (
    <>
      <ProtectedRoute>
        <>
          <div className="searchResults">
            <div className="container mx-[50px] w-full">
              <div className="grid grid-cols-12 gap-4 lg:grid-cols-4">
                <CarDetails key={truckData} details={truckData} />
              </div>
            </div>
          </div>
        </>
      </ProtectedRoute>

    </>
  )
}

export default AssignedDriverCars

function CarDetails({ details }: any) {

  return (
    <>
      <div className="card border border-[red] rounded-[10px]">
        <Link href={`/dashboard/truckDetails/${details?._id}`}>
          <Image height={400} width={500} className="my-[40px]" src={details?.image
          } alt="car" />
        </Link>

        <div className="card_body">
          <p>{details?.brand}</p>
          <div className='flex items-center justify-between car_title'>
            <h5 className="">Model: {details?.model} </h5>
            <p>VIN Number: <span>{details.vinNumber}</span></p>
          </div>
        </div>
      </div >
    </>
  )
}