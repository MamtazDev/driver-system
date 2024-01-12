

'use client'
import Image from 'next/image';
import React, { ChangeEvent, useRef, useState } from 'react'
import profile from "../../../public/assets/selectImage.png";
const AddNewCar = () => {

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }
  };


  return (
    <>
      <div className='container m-auto'>
        <div className="shadow-card p-[30px]  w-[100%] lg:w-[60%] m-auto">
          <h1 className='text-center mb-[20px]'>Add a new car</h1>
          <form action="">
            <div className=" add_driver grid grid-cols-12  gap-5 ">
              <div className='col-span-12 relative'>
                <label htmlFor="">Select Car Photo</label>
                {/* <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  accept="image/*"
                  id="fileInput"
                  className=''
                /> */}
                <div className='border h-[150px] rounded-[5px] cursor-pointer' >
                  <div className='absolute right-[35%] top-[45%] text-center my-auto ' >
                    <div className='underline text-[#7155E1] cursor-pointer ' onClick={handleImageClick}>   <p className='text-[14px]'>Brows photo</p></div>
                    <p>Supports: *.png, *.jpg and *.jpeg</p>
                  </div>

                  <div className="m-auto mb-[20px] left-[2%] top-[32%]" style={{ position: 'absolute', width: '100px', height: '100px' }}>
                    <Image
                      src={selectedImage || profile}
                      alt="Selected"
                      layout="fill"
                      objectFit="cover"
                      onClick={handleImageClick}
                      style={{ borderRadius: "5px" }}
                    />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept="image/jpg, image/png"
                  />
                </div>

              </div>
              <div className='col-span-6'>
                <label htmlFor="">Company</label>
                <input
                  type="text"
                  className=''
                  placeholder='Enter company name'
                />
              </div>
              <div className='col-span-6'>
                <label htmlFor="">Brand</label>
                <input
                  type="text"
                  className=''
                  placeholder='Enter brand name'
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
                <label htmlFor="">Year </label>
                <input
                  type="number"
                  className=''
                  placeholder='Enter year'
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
            </div>
            <div className="text-center mt-[15px]">
              <button className="common_button">Add a new car</button>
            </div>
          </form>
        </div>


      </div>
    </>
  )
}

export default AddNewCar