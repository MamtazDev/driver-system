/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import instance from '@/hooks/instance';
import ProtectedRoute from '@/routes/ProtectedRoute';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const TruckDetails = () => {
    const [trucks, setTrucks] = useState<any>()
    const [truck, setTruck] = useState<any>()
    const router = useParams();
    const id = router.slug


    const fetchTrucks = async () => {
        try {
            const response = await instance.get(`api/new-auth`);
            const allRequest = response?.data?.data
            const filteredTrucks = allRequest.filter((i: any) =>
                i.trucks._id === id)
            setTrucks(filteredTrucks)
            console.log(filteredTrucks, "filtered Trucks details")

        } catch (error: any) {
            toast.error('Error fetching users:', error.message);
        }
    };

    useEffect(() => {
        fetchTrucks();
    }, [id]);

    return (
        <ProtectedRoute>
            <>
                <h1>Truck details </h1>
                <div className="flex  items-center gap-[70px] mt-[50px]">
                    <Image height={200} width={200} src={
                        trucks && trucks[0].trucks.image
                    } alt="car" />
                    <div className="">
                        <p>{trucks?.brand}</p>
                        <div className='  '>
                            <h5 className="my-[10px] "> <span className='font-bold'>Model : </span> {trucks && trucks[0].trucks.model} </h5>
                            <p className='my-[10px]'> <span className='font-bold'>VIN Number : </span> <span>{trucks && trucks[0].trucks?.vinNumber}</span></p>
                            <p className='my-[10px]'> <span className='font-bold'>company : </span> <span>{trucks && trucks[0].trucks?.company}</span></p>
                            <p className='my-[10px]'> <span className='font-bold'>  LicensePlate : </span> <span>{trucks && trucks[0].trucks?.licensePlate}</span></p>
                        </div>
                        <div className="table-responsive text-nowrap">
                            <table className="table w-full mb-0 align-middle qd-table">
                                <tbody>
                                    {
                                        trucks?.map((truck: any, index: number) => (
                                            <React.Fragment key={truck?._id}>

                                                <tr className="w-full border-b border-dashed ">
                                                    <td>
                                                        <span className="text-[#9499A1]">Driver: {index + 1}</span>
                                                    </td>
                                                    <td>
                                                        <Link href={`/dashboard/driverDetails/${truck?.user?._id}`} className=''> <strong className="text-heading">{truck.user.fullName}</strong></Link>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </>
        </ProtectedRoute>
    )
}

export default TruckDetails