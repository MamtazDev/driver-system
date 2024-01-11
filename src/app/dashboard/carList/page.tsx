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

                                <select name="" id="">
                                    <option value="Available" selected>Available</option>
                                    <option value="Assigned">Assigned</option>
                                </select>
                            </div>
                            <Image src={car} alt="" />
                            <div className="card_body">
                                <p>FORD FOCUS</p>
                                <div className='flex justify-between items-center  car_title'>
                                    <h5 >1.5 EcoBlue MT Titenium X</h5>
                                    <p>$24.59 <span>/hour</span></p>
                                </div>
                                <Link href="/dashboard/authorizationRequest"><button>Authorized Now</button></Link>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </>
    );
};

export default carList;
