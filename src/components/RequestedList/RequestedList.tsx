"use client"
import { useEffect, useState } from 'react'
import './RequestedList.scss'
import { FaFilePdf } from "react-icons/fa6";
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";


const customStyles = {
    content: {
        width: "600px",
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const RequestedList = () => {

    const [modalIsOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }


    const [selectedValue, setSelectedValue] = useState("")

    const handleSelectChange = (event: any) => {
        setSelectedValue(event.target.value);
    };

    useEffect(() => {
        if (selectedValue === 'In practice') {
            setIsOpen(true);
        }
    }, [selectedValue]);
    return (
        <div>
            <div className="driver_list_wrapper w-full">

                <div className="container mx-auto">
                    <h2 className="text-xl  py-5" >Requested List</h2>
                    <div className="shadow-card">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="border-b text-xs text-gray-700 uppercase ">
                                    <tr>
                                        <th scope="col" className="px-6 py-[15px]">
                                            Car
                                        </th>
                                        <th scope="col" className="px-6 py-[15px]">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-[15px]">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-[15px]">
                                            Phone Number
                                        </th>
                                        <th>License</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-grey-400 border-b border-dashed">
                                        <td
                                            scope="row"
                                            className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            <div className="flex items-center gap-[8px]">
                                                <p>Volkswagen - Golf TSI 2017</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">nicolos</td>
                                        <td className="px-6 py-4">nicolos@gmail.com</td>
                                        <td className="px-6 py-4">01856416846</td>
                                        <td>
                                            <div className="border  w-fit  p-2 rounded-lg ">
                                                <button className="flex gap-2 items-center  "> <FaFilePdf className="text-[14px] h-[10px]" />pdf</button>
                                            </div>
                                        </td>

                                        <td className="w-[130px]">
                                            <select
                                                className="w-[50%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                                onChange={handleSelectChange}
                                            >
                                                <option value="choose">Choose</option>
                                                <option value="requested">Requested</option>
                                                <option value="Request approved">Request approved</option>
                                                <option value="In practice">In practice</option>
                                                <option value="Exam requested">Exam requested</option>
                                                <option value="Authorized">Authorized</option>
                                            </select>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal">

                <div className='text-right mb-[10px]'>
                    <button onClick={closeModal}><IoMdClose /></button>
                </div>

                <div className="flex  flex-col">
                    <label htmlFor="" className='mb-[8px] fw-[900]'>Hours Of Practice</label>
                    <input className='rounded-[8px] bg-[#F8FAFC] mt-[10px]' type="number" placeholder='Hours of Practice' />
                    <div className="text-center">
                        <button className='common_button'>Save</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default RequestedList