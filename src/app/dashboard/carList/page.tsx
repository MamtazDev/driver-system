'use client'
import car from "../../../../public/assets/car.jpg";
import star from "../../../../public/assets/star.png";
import Image from "next/image";
import { Dropdown } from "flowbite-react";
import { useState } from "react";
import Link from "next/link";
const carList = () => {


    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const [selectedValue, setSelectedValue] = useState("")

    const handleSelectChange = (event: any) => {
        setSelectedValue(event.target.value);
    };
    console.log(selectedValue)


    return (
        <>
            <div className="searchResults">
                <div className="container mx-[50px] w-full">
                    <div className="grid grid-cols-4 gap-4">

                        <div className="card">
                            <div className='card_header flex items-center  justify-end gap-2'>
                                {/* <div className='ratings'>
                                    <Image className='' src={star} alt="star" />
                                    <span>4.8</span>
                                    <span>(109)</span>
                                </div> */}
                                {/* <p>Available Now</p> */}

                                <select name="status" onChange={handleSelectChange}>
                                    {/* <option value="select">select</option> */}
                                    <option value="Available">Available</option>
                                    <option value="Authorized">Authorized</option>
                                </select>
                                {/* <p>Selected value: {selectedValue}</p> */}

                            </div>
                            <Image src={car} alt="" />
                            <div className="card_body">
                                <p>FORD FOCUS</p>
                                <div className='flex justify-between items-center  car_title'>
                                    <h5 className="pb-[20px]">1.5 EcoBlue MT Titenium X</h5>
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
                                        <p className="text-black">Driver name: Nicolos</p></div>

                                }

                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </>
    );
};

export default carList;
