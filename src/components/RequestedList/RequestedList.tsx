import React from 'react'
import './RequestedList.scss'
import driver1 from "../../../public/assets/driver.jpg";
import Image from "next/image";
import { FaFilePdf } from "react-icons/fa6";

import Link from "next/link";

import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const RequestedList = () => {
    return (
        <div>
            <div className="driver_list_wrapper w-full">
                <div className="container mx-auto">
                    <h2 className="text-xl  py-5" >Requested List</h2>
                    <div className="shadow-card">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="border-b text-xs text-gray-700 uppercase ">
                                    <tr>
                                        <th scope="col" className="px-6 py-[15px]">
                                            Car
                                        </th>
                                        <th scope="col" className="px-6 py-[15px]"></th>
                                        <th scope="col" className="px-6 py-[15px]">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-[15px]">
                                            Phone Number
                                        </th>
                                        <th>License</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-grey-400 border-b border-dashed">
                                        <td
                                            scope="row"
                                            className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            <div className="flex items-center gap-[8px]">
                                                <p> 	Volkswagen - Golf TSI 2017</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4"></td>
                                        <td className="px-6 py-4">nicolos@gmail.com</td>
                                        <td className="px-6 py-4">01856416846</td>
                                        <td>
                                            <div className="border  w-fit  p-2 rounded-lg ">
                                                <button className="flex gap-2 items-center  "> <FaFilePdf className="text-[14px] h-[10px]" />pdf</button>
                                            </div>
                                        </td>

                                        <td className="">
                                            <div className="flex gap-2 items-center">
                                                <button>
                                                    <CiEdit className="text-[24px]" />
                                                </button>
                                                <button>

                                                    <MdDelete className="text-[24px]" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="bg-grey-400 border-b border-dashed">
                                        <td
                                            scope="row"
                                            className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            <div className="flex items-center gap-[8px]">
                                                <p> 	Volkswagen - Golf TSI 2017</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4"></td>
                                        <td className="px-6 py-4">nicolos@gmail.com</td>
                                        <td className="px-6 py-4">01856416846</td>
                                        <td>
                                            <div className="border  w-fit  p-2 rounded-lg ">
                                                <button className="flex gap-2 items-center  "> <FaFilePdf className="text-[14px] h-[10px]" />pdf</button>
                                            </div>
                                        </td>

                                        <td className="">
                                            <div className="flex gap-2 items-center">
                                                <button>
                                                    <CiEdit className="text-[24px]" />
                                                </button>
                                                <button>

                                                    <MdDelete className="text-[24px]" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="bg-grey-400 border-b border-dashed">
                                        <td
                                            scope="row"
                                            className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            <div className="flex items-center gap-[8px]">
                                                <p> 	Volkswagen - Golf TSI 2017</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4"></td>
                                        <td className="px-6 py-4">nicolos@gmail.com</td>
                                        <td className="px-6 py-4">01856416846</td>
                                        <td>
                                            <div className="border  w-fit  p-2 rounded-lg ">
                                                <button className="flex gap-2 items-center  "> <FaFilePdf className="text-[14px] h-[10px]" />pdf</button>
                                            </div>
                                        </td>

                                        <td className="">
                                            <div className="flex gap-2 items-center">
                                                <button>
                                                    <CiEdit className="text-[24px]" />
                                                </button>
                                                <button>

                                                    <MdDelete className="text-[24px]" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RequestedList