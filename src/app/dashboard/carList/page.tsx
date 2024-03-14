/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import car from "../../../../public/assets/car.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import instance from "@/hooks/instance";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import ProtectedRoute from "@/routes/ProtectedRoute";
import Loader from "@/components/Loader/Loader";

const carList = () => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [userDatas, setUserDatas] = useState<any>({})

    useEffect(() => {

        let userDataString;
        if (typeof window !== undefined) {
            userDataString = localStorage.getItem('user');
        }
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUserDatas(userData?.user);
        }
    }, []);

    async function fetchData() {
        setIsLoading(true)
        try {
            if (userDatas._id) {
                const managerIds = userDatas._id;
                const response = await instance.get(`/api/truck/getAllTrucks`);
                setData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, [userDatas]);


    return (

        <ProtectedRoute>
            <>
                <div className="searchResults">
                    <div className="container mx-[50px] w-full">
                        {
                            isLoading ? <Loader /> :
                                <div className="grid grid-cols-12 gap-4 lg:grid-cols-4">
                                    {data.length == 0 ? <NoDataFound /> : data.map((details: any) => (
                                        <CarDetails key={details._id} details={details} />
                                    ))}

                                </div>
                        }




                    </div>
                </div>
            </>
        </ProtectedRoute>
    );
};

export default carList;

function CarDetails({ details }: any) {
    const [role, setRole] = useState<any>();
    const [user, setUser] = useState<any>({});

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userData: any = JSON.parse(localStorage.getItem('user') || 'null');
            console.log("userData", userData)
            const role = userData?.user?.role[0]
            setRole(role)
            setUser(userData?.user)
        }
    }, [])

    return (
        <>
            <div className="card border border-[red] rounded-[10px]">

                <div className='flex items-center justify-end gap-2 card_header'>
                    {details?.status && <button className="bg-black border rounded-[8px] text-white p-[10px]">

                        {details?.status?.authorizationState[0]}

                    </button>}
                </div>

                {/* <Link href={`/dashboard/truckDetails/${details?._id}`}> */}
                    <Image height={400} width={500} className="my-[40px]" src={details?.image
                    } alt="car" />
                {/* </Link> */}

                <div className="card_body">
                    <p>{details?.brand}</p>
                    <div className='flex items-center justify-between car_title'>
                        <h5 className="">Model: {details?.model} </h5>
                        <p>VIN Number: <span>{details.vinNumber}</span></p>
                    </div>

                    {!details?.status ?
                        <>
                            {role === "Manager" && <Link href={`/dashboard/authorizationRequest/${details._id}`}><button>Authorized Now</button></Link>

                            }

                        </>

                        :
                        <div className="flex justify-between items-center mt-[14px]">
                            <p className="text-black">Company: {details?.company}</p>
                            <Link href={`/dashboard/driverDetails/${details?.status?.user?._id}`}><p className="font-bold text-black">Driver name: {details?.status?.user?.fullName}</p></Link>
                        </div>
                    }
                </div>
            </div >
        </>
    )
}