'use client'

import Image from "next/image";
import profile from "../../../public/assets/profile.png";

import { ChangeEvent, useRef, useState } from "react";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

const EditManagerProfile = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageClick = () => {
        // Trigger the hidden file input when the image is clicked
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setSelectedImage(imageUrl);
        }
    };
    const numRows: number = 5;
    const numCols: number = 10;

    return (
        <>
            <div className="w-full">

                <div className="container mx-auto my-[50px]  round-[16px] p-[50px]  shadow-[0 0 20px rgba(89, 102, 122, .05)] ">
                    <BreadCrumb title1="manager" title2="edit manager profile" />

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <div className="m-auto mb-[20px]" style={{ position: 'relative', width: '150px', height: '150px' }}>
                        <Image
                            src={selectedImage || profile}
                            alt="Selected"
                            layout="fill"
                            objectFit="cover"
                            onClick={handleImageClick}
                            style={{ borderRadius: "50%" }}
                        />
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="add_driver col-span-6">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    First Name
                                </label>
                                <input
                                    type="email"
                                    className="border border-[] w-full "
                                    id=""
                                    placeholder="Enter your first name"
                                />
                            </div>
                        </div>
                        <div className="add_driver col-span-6">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="border border-[] w-full "
                                    id=""
                                    placeholder="Enter your last name"
                                />
                            </div>
                        </div>
                        <div className="add_driver col-span-6">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="border border-[] w-full "
                                    id=""
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                        <div className="add_driver col-span-6">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="border border-[] w-full "
                                    id=""
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>
                        <div className="add_driver col-span-6">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="border border-[] w-full "
                                    id=""
                                    placeholder="Enter your address"
                                />
                            </div>
                        </div>
                        <div className="add_driver col-span-6">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    Phone Number
                                </label>
                                <input
                                    type="number"
                                    className="border border-[] w-full "
                                    id=""
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 add_driver w-full">
                            <textarea className="w-full  border rounded-[5px] border-[#dee2e6]" name="" placeholder="About...." id="" cols={numCols} rows={numRows}></textarea>
                        </div>
                    </div>

                    <div className="text-center mt-[15px]">
                        <button className="common_button">Edit Profile</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditManagerProfile