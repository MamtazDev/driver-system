"use client";
import profile from "../../../public/assets/dashHeader.jpg";
import Image from "next/image";
import Link from "next/link";

const CarOwnerList = () => {
    return (
        <div> <div className="driver_list_wrapper w-full">
            <div className="container mx-auto">
                <h2 className="text-xl  py-5">Truck Owner list</h2>
                <div className="shadow-card">
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="bg-slate-200 text-xs text-gray-700 uppercase ">
                                <tr>
                                    <th scope="col" className="px-6 py-[15px]">
                                        Profile
                                    </th>
                                    <th scope="col" className="px-6 py-[15px]">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-[15px]">
                                        Phone Number
                                    </th>
                                    <th>Truck </th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-grey-400 border-b border-dashed  dark:border-gray-700">
                                    <td
                                        scope="row"
                                        className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <div className="flex items-center gap-[8px]">
                                            <Image
                                                className="w-[40px] h-[40px]  rounded-full "
                                                src={profile}
                                                alt="driver1"
                                            />
                                            <Link href="/dashboard/carList" >  <p className="fw-bold ">

                                                Nicolos</p></Link>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">nicolos@gmail.com</td>
                                    <td className="px-6 py-4">01856416846</td>
                                    <td>
                                        ferrary
                                    </td>
                                    <td className="">
                                        Available
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div></div>
    )
}

export default CarOwnerList