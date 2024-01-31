'use client'

const numRows: number = 5;
const numCols: number = 10;

import Image from "next/image";
import profile from "../../../public/assets/profile.png";
import { FiCamera } from "react-icons/fi";
import { useFileUpload, useImageUpload } from "@/hooks/fileUpload";

const AddDriver = () => {

  const { fileInputRef, selectedFile, handleFileChange } = useFileUpload();
  const { imageFileInputRef, selectedImage, handleImageClick, handleImageFileChange } = useImageUpload();

  

  return (

    <div className="w-full">
      <div className="container mx-auto my-[50px]  round-[16px] p-[50px]  shadow-[0 0 20px rgba(89, 102, 122, .05)] ">
        <input
          type="file"
          ref={imageFileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageFileChange}
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
          {
            !selectedImage && <div onClick={handleImageClick} className="absolute right-[22px] bottom-[28px] ">
              <FiCamera />
            </div>
          }
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 add_driver">
            <div className="mb-3">
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
          </div>
          <div className="col-span-6 add_driver">
            <div className="mb-3">
              <label htmlFor="" className="">
                Address
              </label>
              <input
                type="text"
                className="w-full border "
                id=""
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
                className="w-full border "
                id=""
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
                className="w-full border "
                id=""
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
                type="text"
                className="w-full border "
                id=""
                placeholder="Enter your address"
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
                className="w-full border "
                id=""
                placeholder="Enter your city"
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
          <div className="col-span-6 add_driver">
            <div className="mb-3">
              <label htmlFor="" className="">
                License Expiration Date
              </label>
              <input
                type="date"
                className="w-full border "
                id=""
                placeholder="Enter your city"
              />
            </div>
          </div>
          <div className="w-full col-span-12 add_driver">
            <textarea className="w-full  border rounded-[5px] border-[#dee2e6]" name="" placeholder="About...." id="" cols={numCols} rows={numRows}></textarea>
          </div>
        </div>

        <div className="text-center mt-[15px]">
          <button className="common_button">Add New Driver</button>
        </div>
      </div>
    </div>
  );
};

export default AddDriver;
