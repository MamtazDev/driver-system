/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import profile from "../../../../public/assets/detailsprofile.jpg";
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProtectedRoute from "../../../routes/ProtectedRoute";

const ManagerProfile = () => {
  
  const [user, setUser] = useState<any>([]);

  useEffect(() => {
    let userData: any = null
    if (typeof window !== 'undefined') {
      userData = JSON.parse(localStorage.getItem('user') || 'null');
      setUser(userData?.user)
    }
  }, [])

  return (
    <ProtectedRoute>
      <div className="p-[50px]">
        <div className="driver_details_wrapper">
          <div className="bg-[#7155E1] h-[100px] rounded-[8px] relative z-40 flex items-center justify-end mt-[50px]">
            <Link href={`/dashboard/driverDetails/${user?._id}`}>
              <button className=" p-[8px] text-white rounded-[8px] border border-[white]  m-[15px]"> Edit Profile </button>
            </Link>
          </div>
          <div className="bg-[#fff] absolute me-[50px] z-50 w-[79%]  ">
            <div className="flex pb-5 border ">
              <Image className="w-[180px] mt-[-60px] rounded-[14px] ms-[35px]" src={profile} alt="" />
              <div className="px-5 py-5 fw-bold">
                <p className=" text-[24px]">{user?.fullName}</p>
                <div className="flex gap-5">
                  <p className=" flex items-center gap-2  mt-2  text-[16px]"><IoLocationOutline />
                    <span>{user?.address}</span>
                  </p>
                  <p className=" flex items-center  gap-2 mt-2  text-[16px]">
                    <MdOutlineEmail />
                    <span>{user?.email}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 mt-[180px]">
            <div className="col-span-4 w-full p-[2rem] shadow-card ">
              <h1>Information</h1>
              <div className="table-responsive text-nowrap">
                <table className="table w-full align-middle qd-table mb0">
                  <tbody>
                    <tr className="w-full border-b border-dashed ">
                      <td>
                        <span className="text-[#9499A1]">Full Name</span>
                      </td>
                      <td>
                        <strong className="text-heading">{user?.fullName}</strong>
                      </td>
                    </tr>
                    <tr className="w-full border-b border-dashed" >
                      <td>
                        <span className="text-[#9499A1]">Mobile</span>
                      </td>
                      <td>
                        <div className="flex items-center justify-start">
                          <strong className="text-heading me3">{user?.phoneNumber}</strong>
                        </div>
                      </td>
                    </tr>
                    <tr className="w-full border-b border-dashed ">
                      <td>
                        <span className="text-[#9499A1]">Email</span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-start">
                          <strong className="me3"><a href="#" className="text-decoration-none text-heading hover-primary">{user?.email}</a></strong>
                        </div>
                      </td>
                    </tr>
                    <tr className="w-full border-b border-dashed ">
                      <td>
                        <span className="text-[#9499A1]">Location</span>
                      </td>
                      <td>
                        <strong className="text-heading">{user?.address}</strong>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <span className="text-[#9499A1]">Company</span>
                      </td>
                      <td>
                        <strong className="text-heading">{user?.company ? user.company : "N/A"}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-span-8 w-full p-[2rem] shadow-card ">
              <div className="">
                <h1>About</h1>
                <p className="common_text">{
                  user?.about
                }
                </p>

              </div>
            </div>

          </div>
          <div className="assigned-to mt-[20px] shadow-card p-[2rem]">
            <h2> Details of the company </h2>
            <div className="table-responsive text-nowrap">
              <table className="table w-full mb-0 align-middle qd-table">
                <tbody>
                  <tr className="w-full border-b border-dashed ">
                    <td>
                      <span className="text-[#9499A1]">Company</span>
                    </td>
                    <td>
                      <strong className="text-heading">{user?.assignedTo ? user?.assignedTo?.trucks?.model : "N/A"}</strong>
                    </td>
                  </tr>
                  <tr className="w-full border-b border-dashed " >
                    <td>
                      <span className="text-[#9499A1]"> Total cars</span>
                    </td>
                    <td>
                      <div className="flex items-center justify-start">
                        <strong className="text-heading me3">{user?.assignedTo ? user?.assignedTo?.trucks?.licensePlate : "N/A"}</strong>
                      </div>
                    </td>
                  </tr>

                  <tr className="w-full border-b border-dashed ">
                    <td>
                      <span className="text-[#9499A1]">Total Drivers</span>
                    </td>
                    <td>
                      <strong className="text-heading">{user?.assignedTo ? user?.assignedTo?.trucks?.model : "N/A"}</strong>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default ManagerProfile