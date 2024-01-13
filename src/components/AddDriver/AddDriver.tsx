'use client'

import Image from "next/image";
import profile from "../../../public/assets/profile.png";
import { ChangeEvent, useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";

const AddDriver = () => {

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = () => {
    const file: File | undefined = fileInputRef.current?.files?.[0];

    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a PDF file.');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // img upload
  const imageFileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = () => {
    imageFileInputRef.current?.click();
  };

  const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }
  };

  const numRows: number = 5;
  const numCols: number = 10;
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
                placeholder="Enter your city"
              />
            </div>
          </div>
          <div className="add_driver col-span-6">
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
          <div className="add_driver col-span-6">
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
          <div className="col-span-12 add_driver  w-full">
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
