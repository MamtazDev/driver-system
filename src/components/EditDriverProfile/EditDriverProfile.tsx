'use client'
const numRows: number = 5;
const numCols: number = 10;
import Image from "next/image";
import profile from "../../../public/assets/profile.png";
import { FiCamera } from "react-icons/fi";
import { useFileUpload, useImageUpload } from "@/hooks/fileUpload";
import { useEffect, useState } from "react";
import instance from "@/hooks/Instance";
import { useParams } from "next/navigation";

const EditDriverProfile = () => {

    const { imageFileInputRef, selectedImage, handleImageClick, handleImageFileChange } = useImageUpload();
    const { fileInputRef, selectedFile, handleFileChange } = useFileUpload();
    const [userData, setUserData] = useState({
        fullName:"",
        email: "",
        password: "",
        address: "",
        phoneNumber: "",
        dob:"",
        about:"",
        drivingLicense:"",
        drivingLicenseExpirationDate:""
    });
    const router = useParams();

    const id = router.slug;

    const getUserById = async (userId: string | string[]) => {
        
        try {
            const response = await instance.get(`/api/user/getUserById/${userId}`);

            setUserData(response.data.data);
            
        } catch (error) {
            console.error('Error fetching user by ID:', error);
        }
    };

    useEffect(() => {
        getUserById(id);
    }, [id]);
    
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        
        console.log(name,value)
        
        setUserData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      
 
      const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(userData);
        try {
          const response = await instance.put(`/api/user/updateUserProfile/${id}`, userData);
          console.log(response.data);
          setUserData(
            {
                fullName:"",
                email: "",
                password: "",
                address: "",
                phoneNumber: "",
                dob:"",
                about:"",
                drivingLicense:"",
                drivingLicenseExpirationDate:""
            }
          )
        //   navigate.push('/login')
    
        } catch (error: any) {
          console.error("Registration failed:", error.message);
        }
      };
    console.log(userData);
   
    return (
        <>
            <div className="w-full">

                <form onSubmit={handleSubmit} className="container mx-auto my-[50px]  round-[16px] p-[50px]  shadow-[0 0 20px rgba(89, 102, 122, .05)] ">
                <input
                        type="file"
                        ref={imageFileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageFileChange}
                        name="image"
                        id="image"
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
                    <div className="grid grid-cols-2 gap-4">
                        <div className="add_driver">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full border "
                                    id="fullName"
                                    placeholder="Enter your first name"
                                    value={userData?.fullName}
                                    onChange={handleInputChange}
                                    name="fullName"

                                />
                            </div>
                        </div>
                        <div className="add_driver">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="border border-[] w-full "

                                    placeholder="Enter your address"
                                    value={userData?.address}
                                    name="address"
                                    id="address"
                                      onChange={handleInputChange}

                                />
                            </div>
                        </div>
                        <div className="add_driver">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full border "
                                    placeholder="Enter your email"
                                    value={userData?.email}
                                    id="email"
                                    name="email"
                                      onChange={handleInputChange}

                                />
                            </div>
                        </div>
                        <div className="add_driver">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="border border-[] w-full "
                                    name="password"
                                    placeholder="Enter your password"
                                      onChange={handleInputChange}


                                />
                            </div>
                        </div>

                        <div className="add_driver">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    Phone Number
                                </label>
                                <input
                                    type="number"
                                    className="border border-[] w-full "
                                    id="phoneNumber"
                                    placeholder="Enter your phone number"
                                    value={userData?.phoneNumber}
                                    name="phoneNumber"
                                      onChange={handleInputChange}

                                />
                            </div>
                        </div>
                        <div className="add_driver">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    className="border border-[] w-full "
                                    id="dob"
                                    placeholder="Enter your phone number"
                                    name="dob"
                                    value={userData?.dob}
                                      onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="add_driver">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    License Expiration Date
                                </label>
                                <input
                                    type="text"
                                    className="border border-[] w-full "
                                    id="drivingLicenseExpirationDate"
                                    placeholder="Enter your city"
                                    value={userData?.drivingLicenseExpirationDate ? drivingLicenseExpirationDate : '10/20/5'}

                                    name="drivingLicenseExpirationDate"

                                />
                            </div>
                        </div>
                        <div className=" add_driver">
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
                                    id="drivingLicense"
                                    name="drivingLicense"
                                />
                                <input
                                    type="text"
                                    className="cursor-pointer form-control ps-5"
                                    id="drivingLicense"
                                    name="drivingLicense"
                                    placeholder="Select a PDF file"
                                    onClick={() => fileInputRef?.current?.click()}
                                    value={selectedFile ? selectedFile.name : ''}
                                    readOnly
                                      onChange={handleInputChange}

                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-[100%] add_driver mt-3">
                        <label htmlFor="" className="">
                            About
                        </label>
                        <textarea
                            value={userData?.about}
                              onChange={handleInputChange}

                            className="w-full  border rounded-[5px] border-[#dee2e6]" placeholder="About...." id="" cols={numCols} rows={numRows} name="about"></textarea>
                    </div>

                    <div className="text-center mt-[15px]">
                        <button type="submit" className="common_button">Edit Profile</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditDriverProfile
// 'use client'
// const numRows: number = 5;
// const numCols: number = 10;
// import Image from "next/image";
// import profile from "../../../public/assets/profile.png";
// import { FiCamera } from "react-icons/fi";
// import { useFileUpload, useImageUpload } from "@/hooks/fileUpload";
// import { useEffect, useState } from "react";
// import instance from "@/hooks/Instance";
// import { useParams } from "next/navigation";

// const EditDriverProfile = () => {

//     const { imageFileInputRef, selectedImage, handleImageClick, handleImageFileChange } = useImageUpload();
//     const { fileInputRef, selectedFile, handleFileChange } = useFileUpload();
//     const [userData, setUserData] = useState(null);

//     const router = useParams();

//     const id = router.slug;

//     const getUserById = async (userId: string | string[]) => {
//         try {
//             const response = await instance.get(`/api/user/getUserById/${userId}`);

//             setUserData(response.data.data);
//         } catch (error) {
//             console.error('Error fetching user by ID:', error);
//         }
//     };

//     useEffect(() => {
//         getUserById(id);
//     }, [id]);

//     const handleEditDetails = async (e) => {

//         e.preventDefault()
//         // if (imageFileInputRef.current) {
//         const form = e.target;
//         // const image = imageFileInputRef.current.files[0];

//         const fullName = form.fullName.value;
//         const email = form.email.value;
//         const password = form.password.value;
//         const address = form.address.value;
//         const phoneNumber = form.phoneNumber.value;
//         const dob = form.dob.value;
//         const about = form.about.value;
//         const drivingLicense = form.drivingLicense.value;
//         const drivingLicenseExpirationDate = form.drivingLicenseExpirationDate.value;

//         // Create FormData and append values
//         const formData = new FormData();

//         // formData.append('image', image);
//         formData.append('fullName', fullName);
//         formData.append('email', email);
//         formData.append('password', password);
//         formData.append('address', address);
//         formData.append('phoneNumber', phoneNumber);
//         formData.append('dob', dob);
//         formData.append('about', about);
//         formData.append('drivingLicense', drivingLicense);
//         formData.append('drivingLicenseExpirationDate', drivingLicenseExpirationDate);

//         console.log('formData', formData);

//         try {
//             const response = await instance.put(`/api/user/updateUserProfile/${id}`, formData );
          
//             console.log(response.data);
            
//         } catch (error) {
//             console.error('Error submitting form:', error.message);
//         }
//     }

//     console.log(userData);

//     return (
//         <>
//             <div className="w-full">

//                 <form onSubmit={handleEditDetails} className="container mx-auto my-[50px]  round-[16px] p-[50px]  shadow-[0 0 20px rgba(89, 102, 122, .05)] ">
//                     <input
//                         type="file"
//                         ref={imageFileInputRef}
//                         style={{ display: 'none' }}
//                         onChange={handleImageFileChange}
//                         name="image"
//                         id="image"
//                     />
//                     <div className="m-auto mb-[20px]" style={{ position: 'relative', width: '150px', height: '150px' }}>
//                         <Image
//                             src={selectedImage || profile}
//                             alt="Selected"
//                             layout="fill"
//                             objectFit="cover"
//                             onClick={handleImageClick}
//                             style={{ borderRadius: "50%" }}
//                         />
//                         {
//                             !selectedImage && <div onClick={handleImageClick} className="absolute right-[22px] bottom-[28px] ">
//                                 <FiCamera />
//                             </div>
//                         }
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="add_driver">
//                             <div className="mb-3">
//                                 <label htmlFor="" className="">
//                                     Full Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     className="w-full border "
//                                     id="fullName"
//                                     placeholder="Enter your first name"
//                                     value={userData?.fullName}
//                                     name="fullName"

//                                 />
//                             </div>
//                         </div>
//                         <div className="add_driver">
//                             <div className="mb-3">
//                                 <label htmlFor="" className="">
//                                     Address
//                                 </label>
//                                 <input
//                                     type="text"
//                                     className="border border-[] w-full "

//                                     placeholder="Enter your address"
//                                     value={userData?.address}
//                                     name="address"
//                                     id="address"

//                                 />
//                             </div>
//                         </div>
//                         <div className="add_driver">
//                             <div className="mb-3">
//                                 <label htmlFor="" className="">
//                                     Email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     className="w-full border "
//                                     placeholder="Enter your email"
//                                     value={userData?.email}
//                                     id="email"
//                                     name="email"

//                                 />
//                             </div>
//                         </div>
//                         <div className="add_driver">
//                             <div className="mb-3">
//                                 <label htmlFor="" className="">
//                                     Password
//                                 </label>
//                                 <input
//                                     type="password"
//                                     className="border border-[] w-full "
//                                     name="password"
//                                     placeholder="Enter your password"


//                                 />
//                             </div>
//                         </div>

//                         <div className="add_driver">
//                             <div className="mb-3">
//                                 <label htmlFor="" className="">
//                                     Phone Number
//                                 </label>
//                                 <input
//                                     type="number"
//                                     className="border border-[] w-full "
//                                     id="phoneNumber"
//                                     placeholder="Enter your phone number"
//                                     value={userData?.phoneNumber}
//                                     name="phoneNumber"

//                                 />
//                             </div>
//                         </div>
//                         <div className="add_driver">
//                             <div className="mb-3">
//                                 <label htmlFor="" className="">
//                                     Date of Birth
//                                 </label>
//                                 <input
//                                     type="date"
//                                     className="border border-[] w-full "
//                                     id="dob"
//                                     placeholder="Enter your phone number"
//                                     name="dob"
//                                     value={userData?.dob}
//                                 />
//                             </div>
//                         </div>

//                         <div className="add_driver">
//                             <div className="mb-3">
//                                 <label htmlFor="" className="">
//                                     License Expiration Date
//                                 </label>
//                                 <input
//                                     type="text"
//                                     className="border border-[] w-full "
//                                     id="drivingLicenseExpirationDate"
//                                     placeholder="Enter your city"
//                                     value={userData?.drivingLicenseExpirationDate ? drivingLicenseExpirationDate : '10/20/5'}

//                                     name="drivingLicenseExpirationDate"

//                                 />
//                             </div>
//                         </div>
//                         <div className=" add_driver">
//                             <div className="mb-3">
//                                 <label htmlFor="" className="">
//                                     Driving License
//                                 </label>
//                                 <input
//                                     type="file"
//                                     ref={fileInputRef}
//                                     onChange={handleFileChange}
//                                     style={{ display: 'none' }}
//                                     accept=".pdf"
//                                     id="drivingLicense"
//                                     name="drivingLicense"
//                                 />
//                                 <input
//                                     type="text"
//                                     className="cursor-pointer form-control ps-5"
//                                     id="drivingLicense"
//                                     name="drivingLicense"
//                                     placeholder="Select a PDF file"
//                                     onClick={() => fileInputRef?.current?.click()}
//                                     value={selectedFile ? selectedFile.name : ''}
//                                     readOnly

//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="w-[100%] add_driver mt-3">
//                         <label htmlFor="" className="">
//                             About
//                         </label>
//                         <textarea
//                             value={userData?.about}

//                             className="w-full  border rounded-[5px] border-[#dee2e6]" placeholder="About...." id="" cols={numCols} rows={numRows} name="about"></textarea>
//                     </div>

//                     <div className="text-center mt-[15px]">
//                         <button type="submit" className="common_button">Edit Profile</button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default EditDriverProfile