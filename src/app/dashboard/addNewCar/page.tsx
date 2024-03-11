"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import profile from "../../../../public/assets/selectImage.png";

import instance from '@/hooks/instance';
import useImageUpload from '@/hooks/fileUpload';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const AddNewCars = () => {
  const navigate = useRouter();

  const { imageFileInputRef, selectedImage, handleImageClick, handleImageFileChange, imageFiles }: any = useImageUpload();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const [managerData, setManagerData] = useState<any>([]);
  const [selectedManagerId, setSelectedManagerId] = useState("");

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

  useEffect(() => {
    if (data._id) {
      const fetchUsers = async () => {
        try {
          const response = await instance.get(`api/user/getRoleUsers?role=Manager&ownerId=${data._id}`);
          setManagerData(response.data.data);
        } catch (error: any) {
          console.error('Error fetching users:', error.message);
        }
      };
      fetchUsers();
    }
  }, [data._id]);

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

  const handleFormSubmit = async (e: any) => {

    setIsLoading(true);
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    try {
      const imageUrl = await uploadImageToBackend(imageFiles);

      const formData = new FormData();

      formData.append('company', form.company.value);
      formData.append('brand', form.brand.value);
      formData.append('model', form.model.value);
      formData.append('licensePlate', form.licensePlate.value);
      formData.append('vinNumber', form.vinNumber.value);
      formData.append('year', form.year.value);
      formData.append('ownerId', data._id);
      formData.append('managerId', selectedManagerId);
      formData.append('image', imageUrl);

      const response = await instance.post('/api/truck/addNewTrucks', formData);
      console.log(response)

      setIsLoading(false);

      Swal.fire({
        text: "Truck added successfully",
        icon: "success"
      });
      navigate.push('/dashboard/carList');
      form.reset();

    } catch (error: any) {
      setIsLoading(false);
      toast.error('Error', error?.message);
    }
  };

  const handleManagerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedManagerId(e.target.value); // Update selectedManagerId state
  };
  return (

    <>
      <div className='container m-auto'>
        <div className="shadow-card p-[30px]  w-[100%] lg:w-[60%] m-auto">
          <h1 className='text-center mb-[20px]'>Add a new Truck</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-12 gap-5 add_driver">
              <div className='relative col-span-12'>
                <label htmlFor="">Select Truck Photo</label>
                <div className='border h-[150px] rounded-[5px] cursor-pointer' >
                  <div className='absolute right-[35%] top-[45%] text-center my-auto ' >
                    <div className='underline text-[#7155E1] cursor-pointer '
                      onClick={handleImageClick}>
                      <p className='text-[14px]'>Brows photo</p></div>
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
                    name='image'
                    id='image'
                    style={{ display: 'none' }}
                    accept="image/jpg, image/png, image/jpeg"

                  />
                </div>

              </div>
              <div className='col-span-6'>
                <label htmlFor="">Company</label>
                <input
                  required
                  type="text"
                  className=''
                  placeholder='Enter company name'
                  name='company'
                  id='company'
                  value={data.companyName}
                />
              </div>
              {/* <div className='col-span-6'>
                <label htmlFor="">Manager</label>
                <input
                  required
                  type="text"
                  className=''
                  placeholder='Enter company name'
                  name='company'
                  id='company'
                  value={data.companyName}
                />
              </div> */}
              <div className='col-span-6'>
                <label htmlFor="">Brand</label>
                <input
                  required
                  type="text"
                  className=''
                  placeholder='Enter brand name'
                  name='brand'
                  id='brand'
                />
              </div>
              <div className='col-span-6'>
                <label htmlFor="">Model</label>
                <input
                  required
                  type="text"
                  className=''
                  placeholder='Enter car model'
                  name='model'
                  id='model'
                />
              </div>

              <div className='col-span-6'>
                <label htmlFor="">License Plate </label>
                <input
                  required
                  type="text"
                  className=''
                  placeholder='Enter license plate number'
                  name='licensePlate'
                  id='licensePlate'
                />
              </div>
              <div className='col-span-6'>
                <label htmlFor="">Year </label>
                <input
                  required
                  type="number"
                  className=''
                  placeholder='Enter year'
                  name='year'
                  id='year'
                />
              </div>
              <div className='col-span-6'>
                <label htmlFor="">VIN Number </label>
                <input
                  required
                  type="number"
                  className=''
                  placeholder='Enter VIN Number'
                  name='vinNumber'
                  id='vinNumber'
                />
              </div>
              <div className='col-span-12'>
                <label htmlFor="">Select Manager </label>
                <select required id="manager" className="border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" onChange={handleManagerSelect}>
                  <option value="">Choose</option>
                  {managerData.map((manager: any) => (
                    <option key={manager._id} value={manager._id}>
                      {manager.fullName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-center mt-[15px]">
              <button type='submit' className="common_button">
                {isLoading ? (
                  <>
                    Loading...
                  </>
                ) : (
                  <>
                    Add a new Truck
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>

  )
}

export default AddNewCars