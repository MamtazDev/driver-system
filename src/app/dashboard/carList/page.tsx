'use client'
import car from "../../../../public/assets/car.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import instance from "@/hooks/instance";

const carList = () => {

    const [selectedValue, setSelectedValue] = useState("")

    const handleSelectChange = (event: any) => {
        setSelectedValue(event.target.value);
    };
    // console.log(selectedValue);

    const [data, setData] = useState([])

    async function fetchData() {
        try {
            const response = await instance.get('/api/truck/getAllTrucks');
            // console.log(response.data.data);
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    console.log(data, "data")
    const apiUrl = process.env.VITE_LOCAL_API_URL || 'http://localhost:4000/';


    return (
        <>
            <div className="searchResults">
                <div className="container mx-[50px] w-full">
                    <div className="grid grid-cols-12 gap-4 lg:grid-cols-4">
                        {data.map((details) => (
                            <div className="card border border-[red] rounded-[10px]">

                                <div className='flex items-center justify-end gap-2 card_header'>

                                    <select name="status" onChange={handleSelectChange}>
                                        <option value="Choose">Choose</option>
                                        <option value="Available">Available</option>
                                        <option value="Authorized">Authorized</option>

                                    </select>
                                </div>

                                <Image height={200} width={200} src={
                                    details && details?.image
                                        ? `http://localhost:4000/api/uploads/${details?.image}`
                                        // ? `${apiUrl}/api/uploads/${details?.image}`
                                        : car
                                } alt="car" />
                           
                                <div className="card_body">
                                    <p>{details?.brand}</p>
                                    <div className='flex items-center justify-between car_title'>
                                        <h5 className="">Model: {details?.model} </h5>
                                        <p>VIN Number: <span>{details.vinNumber}</span></p>
                                    </div>
                                    {
                                        selectedValue === 'Available' &&
                                        <Link href={`/dashboard/authorizationRequest/${details._id}`}><button>Authorized Now</button></Link>
                                    }

                                    {
                                        selectedValue === 'Authorized' &&
                                        <div className="flex justify-between items-center mt-[14px]">
                                            <p className="text-black">Company: {details?.company}</p>
                                            <Link href="/dashboard/driverDetails"><p className="text-black">Driver name: Nicolos</p></Link>
                                        </div>
                                    }

                                </div>
                            </div>
                        ))}

                    </div>


                </div>

            </div>
        </>
    );
};

export default carList;
