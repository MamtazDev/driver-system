'use client'

import Image from "next/image";
import profile from "../../../public/assets/profile.png";

import { ChangeEvent, useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";

const EditDriverProfile = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageClick = () => {
        // Trigger the hidden file input when the image is clicked
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Access the file input value using useRef
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            // Display the selected image
            const imageUrl = URL.createObjectURL(selectedFile);
            setSelectedImage(imageUrl);
        }
    };

    return (
        <>
            <div className="w-full">

                <div className="container mx-auto my-[50px]  round-[16px] p-[50px]  shadow-[0 0 20px rgba(89, 102, 122, .05)] ">

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <div className="m-auto mb-[20px]" style={{ position: 'relative', width: '150px', height: '150px' }}>
                        <Image
                            src={selectedImage || profile} // Use a placeholder or default image URL
                            alt="Selected"
                            layout="fill"
                            objectFit="cover"
                            onClick={handleImageClick}
                            style={{ borderRadius: "50%" }}
                        />
                        {
                            !selectedImage && <div onClick={handleImageClick} className="absolute right-[22px] bottom-[28px] ">
                                <FiCamera />
                            </div>
                        }
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="add_driver">
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
                        <div className="add_driver">
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
                        <div className="add_driver">
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
                        <div className="add_driver">
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
                        <div className="add_driver">
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
                        <div className="add_driver">
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

                        <div className="add_driver">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    License Expiration Date
                                </label>
                                <input
                                    type="date"
                                    className="border border-[] w-full "
                                    id=""
                                    placeholder="Enter your city"
                                />
                            </div>
                        </div>

                        <div className="add_driver">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    License Expiration Date
                                </label>
                                <input
                                    type="date"
                                    className="border border-[] w-full "
                                    id=""
                                    placeholder="Enter your city"
                                />
                            </div>
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

export default EditDriverProfile