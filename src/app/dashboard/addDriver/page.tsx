'use client'

const numRows: number = 5;
const numCols: number = 10;

import Loader from "@/components/Loader/Loader";
import useImageUpload from "@/hooks/fileUpload";
import instance from "@/hooks/instance";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const AddDrivers = () => {

  const { imageFileInputRef, selectedImage, handleImageClick, handleImageFileChange, selectedFiles, imageFiles }: any = useImageUpload();

  const [data, setData] = useState<any>({})

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useRouter();

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
        console.log("imageData.data.url:", imageData.data.url)
        return imageData.data.url;
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      throw new Error('Image upload failed');
    }
  };

  const handleSubmit = async (e: any) => {
    setIsLoading(true)
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const about = form.about.value;
    const password = form.password.value;
    const address = form.address.value;
    const dob = form.dob.value || '';
    const phoneNumber = form.phoneNumber.value;
    const drivingLicenseExpirationDate = form.drivingLicenseExpirationDate?.value || '';
    const imageUrl = await uploadImageToBackend(imageFiles);
    const formData: any = new FormData();

    formData.append('drivingLicense', imageUrl);
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('address', address);
    formData.append('dob', dob);
    formData.append('phoneNumber', phoneNumber);
    formData.append('drivingLicenseExpirationDate', drivingLicenseExpirationDate);
    formData.append('about', about)
    formData.append('ownerId', data._id);

    try {
      const response = await instance.post('api/user/createNewDriver', formData);

      setIsLoading(false)

      Swal.fire({
        text: "Driver added successfully!",
        icon: "success"
      });
      navigate.push('/dashboard/myDrivers');

      form.reset();

    } catch (error: any) {
      setIsLoading(false)
      Swal.fire({
        title: "Error",
        text: `Failed to add new driver ! ${error.message}`,
        icon: "error"
      });
    }
  };

  return (
    <ProtectedRoute>
      <>
        <div className="w-full">
          <form onSubmit={handleSubmit} className="container mx-auto my-[50px]  round-[16px] p-[50px]  shadow-[0 0 20px rgba(89, 102, 122, .05)] ">
            <h2 className="font-bold text-center text-[40px] my-[20px]">Add a new Driver</h2>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6 add_driver">
                <div className="mb-3">
                  <label htmlFor="" className="">
                    FullName
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full border "
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div className="col-span-6 add_driver">
                <div className="mb-3">
                  <label htmlFor="" className="">
                    Address
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full border "
                    id="address"
                    name="address"
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
                    required
                    type="email"
                    className="w-full border "
                    id="email"
                    name="email"
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
                    required
                    type="password"
                    className="w-full border "
                    id="password"
                    name="password"
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
                    required
                    type="date"
                    className="w-full border "
                    id="dob"
                    name="dob"
                    placeholder="Enter your date of birth"
                  />
                </div>
              </div>
              <div className="col-span-6 add_driver">
                <div className="mb-3">
                  <label htmlFor="" className="">
                    Phone Number
                  </label>
                  <input
                    required
                    type="number"
                    className="w-full border "
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter your phone number"

                  />
                </div>
              </div>
              <div className="col-span-6 add_driver">
                <div className="mb-3">
                  <label htmlFor="" className="">
                    Driving License
                  </label>
                  <input
                    required
                    type="file"
                    ref={imageFileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageFileChange}
                    name="drivingLicense"
                    id="drivingLicense"
                  />

                  <input
                    required
                    type="text"
                    className="cursor-pointer form-control ps-5"
                    id="drivingLicense"
                    name="drivingLicense"
                    placeholder="Select a file"
                    onClick={handleImageClick}
                    value={selectedFiles ? selectedFiles[0]?.name : ''}
                  />
                </div>
              </div>
              <div className="col-span-6 add_driver">
                <div className="mb-3">
                  <label htmlFor="" className="">
                    License Expiration Date
                  </label>
                  <input
                    required
                    type="date"
                    className="w-full border "
                    id="drivingLicenseExpirationDate"
                    name="drivingLicenseExpirationDate"
                    placeholder="Enter your license expiration date"
                  />
                </div>
              </div>
              <div className="w-full col-span-12 add_driver">
                <textarea className="w-full  border rounded-[5px] border-[#dee2e6]" name="about" id="about" placeholder="About...." cols={numCols} rows={numRows}
                ></textarea>
              </div>
            </div>

            <div className="text-center mt-[15px]">
              <button type="submit" className="common_button">
                {
                  isLoading ?
                    <>
                      Loading...
                    </> :
                    <>
                      Add New Driver
                    </>
                }

              </button>
            </div>
          </form>
        </div>
      </>
    </ProtectedRoute>
  )
}

export default AddDrivers