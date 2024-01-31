

'use client'
import Image from 'next/image';
import profile from "../../../public/assets/selectImage.png";
import { useImageUpload } from '@/app/hooks/fileUpload';

const AddNewCar = () => {

  const { imageFileInputRef, selectedImage, handleImageClick, handleImageFileChange } = useImageUpload();

  return (
    <>
      <div className='container m-auto'>
        <div className="shadow-card p-[30px]  w-[100%] lg:w-[60%] m-auto">
          <h1 className='text-center mb-[20px]'>Add a new Truck</h1>
          <form action="">
            <div className="grid grid-cols-12 gap-5 add_driver">
              <div className='relative col-span-12'>
                <label htmlFor="">Select Truck Photo</label>

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
                    ref={imageFileInputRef}
                    onChange={handleImageFileChange}
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
              <button className="common_button">Add a new Truck</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddNewCar