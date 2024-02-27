'use client'
import { useDriverContext } from "@/hooks/driverContext";
import { useFileUpload } from "@/hooks/fileUpload";
import instance from "@/hooks/instance";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthorizationRequest = () => {

    const { imageFileInputRef2, selectedImage2, handleImageClick2, handleImageFileChange2, selectedFiles2 } = useSecondImageUpload();

    const driverContext = useDriverContext();

    const [driverDataList, setDriverDataList] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [authorizationState, setAuthorizationState] = useState("")


    useEffect(() => {
        if (driverContext && driverContext.data) {
            const driverData = driverContext.data.filter((data) => data.role.includes("Driver"));
            setDriverDataList(driverData);
        }
    }, [driverContext]);


    const handleDriverSelect = (selectedValue: string) => {
        const selectedDriverData = driverDataList.find((data) => data.fullName === selectedValue);
        setSelectedDriver(selectedDriverData);
    };
    const router = useParams();

    // car id 
    const id = router.slug;

    console.log(id)

    const selectedDriverId = selectedDriver?._id

    //  authorization state

    const data = {
        user: selectedDriverId,
        trucks: id,
        authorizationState: authorizationState
    }

    const [truck, setTruck] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await instance.get(`/api/truck/getTruckById/${id}`);
                setTruck(response.data.data)
                console.log(response)

            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await instance.post("/api/authorization/addNewRequest", data);

            if (response.data.success) {
                toast.success('Request added successfully');
            } else {
                toast.error('Failed to add a new request');
            }

        } catch (error: any) {
            toast.error(`Request failed: ${error.message}`);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className='container m-auto'>
                <div className="shadow-card p-[30px]  w-[70%] m-auto">
                    <button>select</button>
                    <h1 className='text-center mb-[20px]'>Request For Authorization</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-12 gap-5 add_driver">

                            <div className='col-span-6'>
                                <label htmlFor="">Truck</label>
                                <input
                                    type="text"
                                    placeholder='Enter company name'
                                    value={truck?.company}
                                />
                            </div>

                            <div className='col-span-6'>
                                <label htmlFor="">Model</label>
                                <input
                                    type="text"
                                    placeholder='Enter Truck model'
                                    value={truck?.model}
                                />
                            </div>

                            <div className='col-span-6'>
                                <label htmlFor="">License Plate </label>
                                <input
                                    type="text"
                                    placeholder='Enter license plate number'
                                    value={truck?.licensePlate} />
                            </div>

                            <div className='col-span-6'>
                                <label htmlFor="">VIN Number </label>
                                <input
                                    type="number"
                                    placeholder='Enter VIN Number'
                                    value={truck.vinNumber}
                                />
                            </div>
                            <div className='col-span-6'>
                                <label htmlFor="">Select Driver </label>
                                <select onChange={(e) => handleDriverSelect(e.target.value)} id="countries" className="border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                                    <option selected>Choose</option>
                                    {driverDataList.map((data) => (
                                        <option key={data._id} value={data.fullName}>
                                            {data.fullName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-span-6'>
                                <label htmlFor="">Driver Email</label>
                                <input
                                    type="email"
                                    value={selectedDriver ? selectedDriver.email : ""}

                                />
                            </div>
                            <div className='col-span-6'>
                                <label htmlFor="">Phone Number</label>
                                <input
                                    type="number"
                                    value="018254564456456"
                                />
                            </div>
                            <div className='col-span-6'>
                                <div className=" add_driver">
                                    <div className="mb-3">
                                        <label htmlFor="" className="">
                                            Driving License
                                        </label>
                                        <input
                                            type="file"
                                            ref={imageFileInputRef2}
                                            style={{ display: 'none' }}
                                            onChange={handleImageFileChange2}
                                            name="drivingLicense"
                                            id="drivingLicense"
                                        />

                                        <input
                                            type="text"
                                            className="cursor-pointer form-control ps-5"
                                            id="drivingLicense"
                                            name="drivingLicense"
                                            placeholder="Select a PDF file"
                                            onClick={handleImageClick2}
                                            value={selectedFiles2 ? selectedFiles2[0]?.name : ''}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className='col-span-6'>
                                <label htmlFor="">Date of Birth</label>
                                <input
                                    type="text"
                                    value={selectedDriver ? selectedDriver.dob : ""}
                                />
                            </div>
                            <div className='col-span-6'>
                                <label htmlFor="">Address</label>
                                <input
                                    type="text"
                                    value={selectedDriver ? selectedDriver.address : ""}
                                />
                            </div>
                            <div className='col-span-6'>
                                <label htmlFor="">License Expiration Date</label>
                                <input
                                    type="text"
                                    value={selectedDriver ? selectedDriver.dob : ""}
                                />
                            </div>
                            <div className='col-span-6'>
                                <label htmlFor="">Authorization State</label>

                                <select id="countries" onChange={(e) => setAuthorizationState(e.target.value)} className="border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                                    <option selected>Choose</option>
                                    <option value="Request">Request</option>
                                    <option value="Practice">Practice</option>
                                    <option value="Authorized">Authorized</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-center mt-[15px]">
                            <button type='submit' className="common_button">Send Request</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AuthorizationRequest



const useSecondImageUpload = () => {
    const imageFileInputRef2 = useRef(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [selectedFiles2, setSelectedFiles2] = useState(null);

    const handleImageClick2 = () => {
        imageFileInputRef2.current?.click();
    };

    const handleImageFileChange2 = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFiles2(files);
            const selectedFile = files[0];
            const imageUrl = URL.createObjectURL(selectedFile);
            setSelectedImage2(imageUrl);
        }
    };

    return {
        imageFileInputRef2,
        selectedImage2,
        handleImageClick2,
        handleImageFileChange2,
        selectedFiles2
    };
};