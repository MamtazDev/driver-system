'use client'
import { useDriverContext } from "@/hooks/driverContext";
import { useFileUpload } from "@/hooks/fileUpload";
import instance from "@/hooks/instance";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthorizationRequest = () => {
    
    const { fileInputRef, selectedFile, handleFileChange } = useFileUpload();
    const driverContext = useDriverContext();

    const [driverDataList, setDriverDataList] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(null);

    useEffect(() => {
        if (driverContext && driverContext.data) {
            const driverData = driverContext.data.filter((data) => data.role.includes("Driver"));
            setDriverDataList(driverData);
        }
    }, [driverContext]);

    
    const handleDriverSelect = (selectedValue) => {
        const selectedDriverData = driverDataList.find((data) => data.fullName === selectedValue);
        setSelectedDriver(selectedDriverData);
    };

    // console.log("selectedDriver", selectedDriver?._id);
    const router = useParams();

    const id = router.slug;
    // console.log(id)


    const selectedDriverId = selectedDriver?._id

    //  authorization state

    const [authorizationState, setAuthorizationState] = useState("")

    const data = {
        user: selectedDriverId,
        trucks: id,
        authorizationState: authorizationState
    }
    
    console.log(data)

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
                                />
                            </div>

                            <div className='col-span-6'>
                                <label htmlFor="">Model</label>
                                <input
                                    type="text"
                                    placeholder='Enter Truck model'
                                />
                            </div>

                            <div className='col-span-6'>
                                <label htmlFor="">License Plate </label>
                                <input
                                    type="text"
                                    placeholder='Enter license plate number'
                                />
                            </div>

                            <div className='col-span-6'>
                                <label htmlFor="">VIN Number </label>
                                <input
                                    type="number"
                                    placeholder='Enter VIN Number'
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
                                <div className="add_driver">
                                    <div className="mb-3">
                                        <label htmlFor="" className="">
                                            Driving License
                                        </label>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                            accept=".pdf"
                                            id="fileInput"
                                        />
                                        <input
                                            type="text"
                                            className="cursor-pointer form-control ps-5"
                                            id="customFileInput"
                                            name="customFileInput"
                                            placeholder="Select a PDF file"
                                            onClick={() => fileInputRef?.current?.click()}
                                            value={selectedFile ? selectedFile.name : ''}
                                            readOnly
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