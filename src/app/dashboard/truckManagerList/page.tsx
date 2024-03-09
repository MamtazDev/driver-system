"use client";
import { useEffect, useState } from "react";
import profile from "../../../../public/assets/dashHeader.jpg";
// import profile from "../../../public/assets/dashHeader.jpg";
import Image from "next/image";
import Link from "next/link";
import instance from "@/hooks/instance";

const TruckManagerList = () => {

    const [data, setData] = useState<any>({});
    const [userData, setUserData] = useState<any>([]);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`api/user/getRoleUsers?role=Manager&ownerId=${data._id}`);
                setUserData(response.data.data);
                // console.log(response.data.data, " data ");
            } catch (error: any) {
                console.error('Error fetching users:', error.message);
        }
        };
        if (data._id) {
            fetchData();
        }
    }, [data._id]);


    return (
        <> <div className="w-full driver_list_wrapper">
            <div className="container mx-auto">
                <h2 className="py-5 text-xl">Truck Manager list</h2>
                <div className="shadow-card">
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 rtl:text-right ">
                            <thead className="text-xs text-gray-700 uppercase bg-slate-200 ">
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
                                    <th>Address </th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData?.map((data: any) => (
                                    <>
                                        <tr className="border-b border-dashed bg-grey-400 dark:border-gray-700">
                                            <td
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                <div className="flex items-center gap-[8px]">
                                                    <Image
                                                        className="w-[40px] h-[40px]  rounded-full "
                                                        src={profile}
                                                        alt="driver1"
                                                    />
                                                    <Link href={`/dashboard/assignedCars/${data._id}`} >  <p className="fw-bold ">
                                                        {data.fullName}</p></Link>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{data.email}</td>
                                            <td className="px-6 py-4">{data.phoneNumber}</td>
                                            <td>
                                                {data.address}
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </>


    )
}

export default TruckManagerList