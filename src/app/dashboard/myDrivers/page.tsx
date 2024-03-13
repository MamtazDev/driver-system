
'use client'

import Loader from '@/components/Loader/Loader'
import NoDataFound from '@/components/NoDataFound/NoDataFound'
import instance from '@/hooks/instance'
import ProtectedRoute from '@/routes/ProtectedRoute'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import Swal from 'sweetalert2'

const MyDrivers = () => {

  const [userData, setUserData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

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



  const fetchUsers = async (data: any) => {
    let mangerId = data?._id

    setIsLoading(true)
    try {
      const response = await instance.get('/api/user/getAllUser');
      const allUsers = response.data.data;
      if (allUsers) {
        setIsLoading(false)
      }
      const drivers = allUsers.filter((i: any) => i.ownerId === mangerId && i.role.includes('Driver'))
      setUserData(drivers);

    } catch (error) {

      setIsLoading(false)

      console.error('Error fetching users:', error);

    }
  };

  console.log(userData, "userData")

  useEffect(() => {
    fetchUsers(data)
  }, [data])

  const downloadImage = (imageUrl: any) => {
    const link = document.createElement('a');
    link.target = 'blank';
    link.href = imageUrl;
    link.download = 'driver_image';
    link.click();
  };

  const handleDelete = async (userId: any) => {
    try {
      const confirmDelete = await Swal.fire({
        title: 'Confirm Deletion',
        text: 'Are you sure you want to delete this user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });

      if (!confirmDelete.isConfirmed) {
        return;
      }

      const response = await instance.delete(`api/user/deleteAUser/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error(`Failed to delete user: ${response.statusText}`);
      }

      // Remove the deleted user from the users array
      setUserData((prevUsers: any) => prevUsers.filter((user: any) => user._id !== userId));

      Swal.fire({
        title: 'Deleted!',
        text: 'User has been deleted.',
        icon: 'success',
      });

    } catch (error: any) {
      console.error(error.message);
      Swal.fire({
        title: 'Error',
        text: `Failed to delete user: ${error.message}`,
        icon: 'error',
      });
    }
  };

  return (

    <ProtectedRoute>
      <>
        <div className="w-full driver_list_wrapper">
          <div className="container mx-auto">
            <h2 className="py-5 text-xl" >My driver list</h2>
            <div className="shadow-card">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right ">
                  <thead className="text-xs text-gray-700 uppercase bg-slate-200 ">
                    <tr>
                      <th scope="col" className="px-6 py-[15px]">
                        Profile
                      </th>
                      <th scope="col" className="px-6 py-[15px]"></th>
                      <th scope="col" className="px-6 py-[15px]">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-[15px]">
                        Phone Number
                      </th>
                      <th>License</th>
                      <th>License Expiration Date</th>
                      <th>Assigned To</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {
                      isLoading ?
                        <tr>
                          <td colSpan={6}>
                            <Loader />
                          </td>
                        </tr>
                        : userData.length === 0 ?
                          <tr className="text-center ">
                            <td colSpan={6} >
                              <NoDataFound />
                            </td>
                          </tr>
                          :
                          <>
                            {
                              userData.map((user: any) =>
                              (
                                <tr key={user._id} className="border-b border-dashed bg-grey-400 dark:border-gray-700">
                                  <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    <div className="flex items-center gap-[8px]">
                                      <Image
                                        className="w-[40px] h-[40px]  rounded-full"
                                        src={user?.image}
                                        width={50}
                                        height={50}
                                        alt="driver1"
                                      />
                                      <Link href={`/dashboard/driverDetails/${user._id}`} >  <p className="fw-bold ">
                                        {user?.fullName}</p></Link>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4"></td>
                                  <td className="px-6 py-4">{user?.email}</td>
                                  <td className="px-6 py-4">{user?.phoneNumber}</td>
                                  <td>
                                    <div className="p-2 border rounded-lg w-fit ">
                                      <button className="flex items-center gap-2" onClick={() => downloadImage(`${user?.drivingLicense}`)}>
                                        <Image
                                          className="w-[40px] h-[40px] rounded-full"
                                          src={user?.drivingLicense}
                                          width={50}
                                          height={50}
                                          alt="driver1"
                                        />
                                      </button>
                                    </div>
                                  </td>
                                  <td>
                                    {user?.drivingLicenseExpirationDate ? user.drivingLicenseExpirationDate : "N/A"}
                                  </td>
                                  <td className="py-4 "><Link href={`/dashboard/truckDetails/${user?.assignedTo?.trucks?._id}`}>
                                    {user.assignedTo ? user?.assignedTo?.trucks?.brand : "N/A"}</Link></td>
                                  <td className="">
                                    <div className="flex items-center gap-2">
                                      <Link href={`/dashboard/editDriverProfile/${user?._id}`}><button>
                                        <CiEdit className="text-[24px]" />
                                      </button></Link>

                                      <button onClick={() => handleDelete(user?._id)}>
                                        <MdDelete className="text-[24px]" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>

                              ))
                            }

                          </>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    </ProtectedRoute>
  )
}

export default MyDrivers