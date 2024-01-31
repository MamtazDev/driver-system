'use client'
import car from "../../../../public/assets/car.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import instance from "@/hooks/Instance";

const carList = () => {

    const [selectedValue, setSelectedValue] = useState("")

    const handleSelectChange = (event: any) => {
        setSelectedValue(event.target.value);
    };
    console.log(selectedValue)
    const [data, setData] = useState([])

    async function fetchData() {
        try {
            const response = await instance.get('/api/truck/getAllTrucks');
            console.log(response.data.data);
            setData(response.data.data[0]);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <div className="searchResults">
                <div className="container mx-[50px] w-full">
                    <div className="grid grid-cols-12 gap-4 lg:grid-cols-4">
                        <div className="card border border-[red] rounded-[10px]">
                            <div className='flex items-center justify-end gap-2 card_header'>
                                <select name="status" onChange={handleSelectChange}>
                                    <option value="Choose">Choose</option>
                                    <option value="Available">Available</option>
                                    <option value="Authorized">Authorized</option>
                                </select>

                            </div>
                            <Image src={car} alt="" />
                            <div className="card_body">
                                <p>FORD FOCUS</p>
                                <div className='flex items-center justify-between car_title'>
                                    <h5 className="">1.5 EcoBlue MT Titenium X</h5>
                                    <p>$24.59 <span>/hour</span></p>
                                </div>
                                {
                                    selectedValue === 'Available' &&
                                    <Link href="/dashboard/authorizationRequest"><button>Authorized Now</button></Link>
                                }

                                {
                                    selectedValue === 'Authorized' &&
                                    <div className="flex justify-between items-center mt-[14px]">

                                        <p className="text-black">Company: Ferrari</p>
                                        <Link href="/dashboard/driverDetails"><p className="text-black">Driver name: Nicolos</p></Link>
                                    </div>
                                }

                            </div>
                        </div>
                        {/* <div className="card border border-[red] rounded-[10px]">
                            <div className='flex items-center justify-end gap-2 card_header'>
                                <select name="status" onChange={handleSelectChange}>
                                    <option value="Choose">Choose</option>
                                    <option value="Available">Available</option>
                                    <option value="Authorized">Authorized</option>
                                </select>

                            </div>
                            <Image src={car} alt="" />
                            <div className="card_body">
                                <p>FORD FOCUS</p>
                                <div className='flex items-center justify-between car_title'>
                                    <h5 className="">1.5 EcoBlue MT Titenium X</h5>
                                    <p>$24.59 <span>/hour</span></p>
                                </div>
                                {
                                    selectedValue === 'Available' &&
                                    <Link href="/dashboard/authorizationRequest"><button>Authorized Now</button></Link>
                                }

                                {
                                    selectedValue === 'Authorized' &&
                                    <div className="flex justify-between items-center mt-[14px]">

                                        <p className="text-black">Company: Ferrari</p>
                                        <Link href="/dashboard/driverDetails"><p className="text-black">Driver name: Nicolos</p></Link>
                                    </div>
                                }

                            </div>
                        </div>
                        <div className="card border border-[red] rounded-[10px]">
                            <div className='flex items-center justify-end gap-2 card_header'>
                                <select name="status" onChange={handleSelectChange}>
                                    <option value="Choose">Choose</option>
                                    <option value="Available">Available</option>
                                    <option value="Authorized">Authorized</option>
                                </select>

                            </div>
                            <Image src={car} alt="" />
                            <div className="card_body">
                                <p>FORD FOCUS</p>
                                <div className='flex items-center justify-between car_title'>
                                    <h5 className="">1.5 EcoBlue MT Titenium X</h5>
                                    <p>$24.59 <span>/hour</span></p>
                                </div>
                                {
                                    selectedValue === 'Available' &&
                                    <Link href="/dashboard/authorizationRequest"><button>Authorized Now</button></Link>
                                }

                                {
                                    selectedValue === 'Authorized' &&
                                    <div className="flex justify-between items-center mt-[14px]">

                                        <p className="text-black">Company: Ferrari</p>
                                        <Link href="/dashboard/driverDetails"><p className="text-black">Driver name: Nicolos</p></Link>
                                    </div>
                                }

                            </div>
                        </div>
                        <div className="card border border-[red] rounded-[10px]">
                            <div className='flex items-center justify-end gap-2 card_header'>
                                <select name="status" onChange={handleSelectChange}>
                                    <option value="Choose">Choose</option>
                                    <option value="Available">Available</option>
                                    <option value="Authorized">Authorized</option>
                                </select>

                            </div>
                            <Image src={car} alt="" />
                            <div className="card_body">
                                <p>FORD FOCUS</p>
                                <div className='flex items-center justify-between car_title'>
                                    <h5 className="">1.5 EcoBlue MT Titenium X</h5>
                                    <p>$24.59 <span>/hour</span></p>
                                </div>
                                {
                                    selectedValue === 'Available' &&
                                    <Link href="/dashboard/authorizationRequest"><button>Authorized Now</button></Link>
                                }

                                {
                                    selectedValue === 'Authorized' &&
                                    <div className="flex justify-between items-center mt-[14px]">

                                        <p className="text-black">Company: Ferrari</p>
                                        <Link href="/dashboard/driverDetails"><p className="text-black">Driver name: Nicolos</p></Link>
                                    </div>
                                }

                            </div>
                        </div> */}
                    </div>


                </div>

            </div>
        </>
    );
};

export default carList;
