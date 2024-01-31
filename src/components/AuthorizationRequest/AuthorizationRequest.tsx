'use client'
import { useFileUpload } from "@/app/hooks/fileUpload";

const AuthorizationRequest = () => {

    const { fileInputRef, selectedFile, handleFileChange } = useFileUpload();

    return (
        <>
            <div className='container m-auto'>
                <div className="shadow-card p-[30px]  w-[70%] m-auto">
                    <button>select</button>
                    <h1 className='text-center mb-[20px]'>Request For Authorization</h1>
                    <form action="">
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
                                <select id="countries" className="border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                                    <option selected>Choose</option>
                                    <option value="Authorized">Nicolos</option>
                                    <option value="reject"> John weak</option>
                                    <option value="exam">Shah Rukh </option>
                                    <option value="Authorized">Nicolos</option>
                                    <option value="reject"> John weak</option>
                                    <option value="exam">Shah Rukh </option>
                                    <option value="Authorized">Nicolos</option>
                                    <option value="reject"> John weak</option>
                                    <option value="exam">Shah Rukh </option>
                                </select>
                            </div>
                            <div className='col-span-6'>
                                <label htmlFor="">Driver Email</label>
                                <input
                                    type="email"
                                    value="nicolos@gmail.com"
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
                                <label htmlFor="">Phone Number</label>
                                <input
                                    type="number"
                                    value="018253659656"
                                />
                            </div>
                            <div className='col-span-6'>
                                <label htmlFor="">Address</label>
                                <input
                                    type="text"
                                    value="mirpur-1 dhaka-1216"
                                />
                            </div>
                            <div className='col-span-6'>
                                <label htmlFor="">License Expiration Date</label>
                                <input
                                    type="text"
                                    value="1/30/24"
                                />
                            </div>
                            <div className='col-span-6'>
                                <label htmlFor="">Authorization State</label>

                                <select id="countries" className="border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                                    <option selected>Choose</option>
                                    <option value="Authorized">Request</option>
                                    <option value="reject">Practice</option>
                                    <option value="exam">Authorized</option>
                                </select>
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