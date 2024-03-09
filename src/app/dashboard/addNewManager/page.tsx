'use client'

const numRows: number = 5;
const numCols: number = 10;

import useImageUpload from "@/hooks/fileUpload";
import instance from "@/hooks/instance";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const AddNewManager = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState<any>({})
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

    const { imageFileInputRef, handleImageClick, handleImageFileChange, selectedFiles, imageFiles }: any = useImageUpload();

    const uploadImageToBackend = async (image: any) => {
        const formData = new FormData();
        formData.append('image', imageFiles);
        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=498c13144329f4ea75fda2875c5782b9`, {
                method: 'POST',
                body: formData,
            });

            const imageData = await response.json();

            if (imageData.success) {
                return imageData.data.url;
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            throw new Error('Image upload failed');
        }
    };

    const handleSubmit = async (e: any) => {
        setIsLoading(true)
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const fullName = form.fullName.value;
        const email = form.email.value;
        const about = form.about.value;
        const password = form.password.value;
        const address = form.address.value;
        const dob = form.dob.value || '';
        const phoneNumber = form.phoneNumber.value;
        const drivingLicenseExpirationDate = form.drivingLicenseExpirationDate?.value || '';
        const imageUrl = await uploadImageToBackend(imageFiles);
        const formData: any = new FormData();

        formData.append('drivingLicense', imageUrl);
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('address', address);
        formData.append('dob', dob);
        formData.append('phoneNumber', phoneNumber);
        formData.append('drivingLicenseExpirationDate', drivingLicenseExpirationDate);
        formData.append('about', about);
        formData.append('ownerId', data._id);

        try {
            const response: any = await instance.post('api/user/createNewManager', formData);
            setIsLoading(false)
            toast.success('Truck added successfully')
            form.reset();

        } catch (error: any) {
            setIsLoading(false)
            toast.success('Error', error.response.data.message)
        }
    };

    return (

        <ProtectedRoute>
            <>
                <div className="w-full">
                    <form onSubmit={handleSubmit} className="container mx-auto my-[50px]  round-[16px] p-[50px]  shadow-[0 0 20px rgba(89, 102, 122, .05)] ">
                        <h2 className="font-bold text-center text-[40px] my-[20px]">Add a new Manager</h2>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-6 add_driver">
                                <div className="mb-3">
                                    <label htmlFor="" className="">
                                        FullName
                                    </label>
                                    <input
                                        type="text"
                                        required

                                        className="w-full border "
                                        id="fullName"
                                        name="fullName"
                                        placeholder="Enter your last name"
                                    />
                                </div>
                            </div>
                            <div className="col-span-6 add_driver">
                                <div className="mb-3">
                                    <label htmlFor="" className="">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        required

                                        className="w-full border "
                                        id="address"
                                        name="address"
                                        placeholder="Enter your last name"
                                    />
                                </div>
                            </div>
                            <div className="col-span-6 add_driver">
                                <div className="mb-3">
                                    <label htmlFor="" className="">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required

                                        className="w-full border "
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"

                                    />
                                </div>
                            </div>
                            <div className="col-span-6 add_driver">
                                <div className="mb-3">
                                    <label htmlFor="" className="">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        required

                                        className="w-full border "
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>
                            <div className="col-span-6 add_driver">
                                <div className="mb-3">
                                    <label htmlFor="" className="">
                                        Date of Birth
                                    </label>

                                    <input
                                        type="date"
                                        required

                                        className="w-full border "
                                        id="dob"
                                        name="dob"
                                        placeholder="Enter your date of birth"
                                    />
                                </div>
                            </div>
                            <div className="col-span-6 add_driver">
                                <div className="mb-3">
                                    <label htmlFor="" className="">
                                        Phone Number
                                    </label>
                                    <input
                                        type="number"
                                        required

                                        className="w-full border "
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        placeholder="Enter your phone number"

                                    />
                                </div>
                            </div>
                            <div className="col-span-6 add_driver">
                                <div className="mb-3">
                                    <label htmlFor="" className="">
                                        Driving License
                                    </label>
                                    <input
                                        type="file"
                                        ref={imageFileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleImageFileChange}
                                        name="drivingLicense"
                                        id="drivingLicense"
                                        accept="image/*"
                                    />

                                    <input
                                        type="text"
                                        className="cursor-pointer form-control ps-5"
                                        id="drivingLicense"
                                        name="drivingLicense"
                                        placeholder="Select a file"
                                        onClick={handleImageClick}
                                        value={selectedFiles ? selectedFiles[0]?.name : ''}
                                    />
                                </div>
                            </div>

                            <div className="col-span-6 add_driver">
                                <div className="mb-3">
                                    <label htmlFor="" className="">
                                        License Expiration Date
                                    </label>
                                    <input
                                        type="date"
                                        required

                                        className="w-full border "
                                        id="drivingLicenseExpirationDate"
                                        name="drivingLicenseExpirationDate"
                                        placeholder="Enter your license expiration date"
                                    />
                                </div>
                            </div>
                            <div className="w-full col-span-12 add_driver">
                                <textarea
                                    required
                                    className="w-full  border rounded-[5px] border-[#dee2e6]" name="about" id="about" placeholder="About...." cols={numCols} rows={numRows}
                                ></textarea>
                            </div>
                        </div>

                        <div className="text-center mt-[15px]">
                            <button type="submit" className="common_button">
                                {isLoading ? (
                                    <>
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        Add New Manager
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </>
        </ProtectedRoute>
    )
}

export default AddNewManager