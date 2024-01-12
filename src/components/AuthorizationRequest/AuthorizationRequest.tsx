'use client'
import { useRef, useState } from "react";
const AuthorizationRequest = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = () => {
        const file: File | undefined = fileInputRef.current?.files?.[0];

        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            // Add additional logic if needed
        } else {
            // Handle invalid file type
            alert('Please select a PDF file.');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <>
            <div className='container m-auto'>
                <div className="shadow-card p-[30px]  w-[70%] m-auto">
                    <h1 className='text-center mb-[20px]'>Request For Authorization</h1>
                    <form action="">
                        <div className=" add_driver grid grid-cols-12  gap-5 ">

                            <div className='col-span-6'>
                                <label htmlFor="">Car</label>
                                <input
                                    type="text"
                                    className=''
                                    placeholder='Enter company name'
                                />
                            </div>

                            <div className='col-span-6'>
                                <label htmlFor="">Model</label>
                                <input
                                    type="text"
                                    className=''
                                    placeholder='Enter car model'
                                />
                            </div>

                            <div className='col-span-6'>
                                <label htmlFor="">License Plate </label>
                                <input
                                    type="text"
                                    className=''
                                    placeholder='Enter license plate number'
                                />
                            </div>

                            <div className='col-span-6'>
                                <label htmlFor="">VIN Number </label>
                                <input
                                    type="number"
                                    className=''
                                    placeholder='Enter VIN Number'
                                />
                            </div>
                            <div className='col-span-6'>
                                <label htmlFor="">Driver Name </label>
                                <input
                                    type="text"
                                    className=''
                                    placeholder='Enter driver name'
                                />
                            </div>
                            <div className='col-span-6'>
                                <label htmlFor="">Driver Email</label>
                                <input
                                    type="email"
                                    className=''
                                    placeholder='Enter email'
                                />
                            </div>
                            <div className='col-span-6'>
                                <label htmlFor="">Phone Number</label>
                                <input
                                    type="number"
                                    className=''
                                    placeholder='Enter email'
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
                                            accept=".pdf" // Specify accepted file types (PDF in this case)
                                            id="fileInput"
                                        />
                                        <input
                                            type="text"
                                            className="form-control ps-5 cursor-pointer"
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
                                <label htmlFor="">Authorization State</label>
                                {/* <input
                                    type="number"
                                    className=''
                                    placeholder='Enter email'
                                /> */}
                                 <select id="countries" className="w-[50%] border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                                                <option selected>Choose</option>
                                                <option value="Authorized">Request</option>
                                                <option value="reject">Practice</option>
                                                <option value="exam">Authorized</option>
                                            </select>
                            </div>
                            <div className='col-span-6'>
                                <label htmlFor="">Phone Number</label>
                                <input
                                    type="number"
                                    className=''
                                    placeholder='Enter email'
                                />
                            </div>


                        </div>
                        <div className="text-center mt-[15px]">
                            <button type='button' className="common_button">Send Request</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AuthorizationRequest