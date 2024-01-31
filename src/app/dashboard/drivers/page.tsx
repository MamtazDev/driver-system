"use client";
import driver1 from "../../../../public/assets/driver.jpg";
import Image from "next/image";
import { FaFilePdf } from "react-icons/fa6";

import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import instance from "@/app/hooks/Instance";

const Drivers = () => {



  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instance.get('/getAllUser');
        const allUsers = response.data.data;
        const driverUsers = allUsers.filter((user) => user.role.includes('Driver'));
        setUsers(driverUsers);

      } catch (error) {

        console.error('Error fetching users:', error.message);
      }
    };
    fetchUsers();

  }, []);

  console.log(users);

  return (

    <>
      <div className="w-full driver_list_wrapper">
        <div className="container mx-auto">
          <h2 className="py-5 text-xl" >All driver list</h2>
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
                    <th>Assigned To</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map(user => (
                      <tr className="border-b border-dashed bg-grey-400 dark:border-gray-700">
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <div className="flex items-center gap-[8px]">
                            <Image
                              className="w-[40px] h-[40px]  rounded-full "
                              src={driver1}
                              alt="driver1"
                            />
                            <Link href="/dashboard/driverDetails" >  <p className="fw-bold ">

                              Nicolos</p></Link>
                          </div>
                        </td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4">nicolos@gmail.com</td>
                        <td className="px-6 py-4">01856416846</td>
                        <td>
                          <div className="p-2 border rounded-lg w-fit ">
                            <button className="flex items-center gap-2 "> <FaFilePdf className="text-[14px] h-[10px]" />pdf</button>
                          </div>
                        </td>
                        <td className="py-4 ">Ferrari (Model-10)</td>

                        <td className="">
                          <div className="flex items-center gap-2">
                            <Link href="/dashboard/editDriverProfile"><button>
                              <CiEdit className="text-[24px]" />
                            </button></Link>

                            <button>
                              <MdDelete className="text-[24px]" />
                            </button>
                          </div>
                        </td>
                      </tr>

                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Drivers;
