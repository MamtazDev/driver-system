'use client'
const numRows: number = 5;
const numCols: number = 10;
import Image from "next/image";
import profile from "../../../../../public/assets/profile.png";
import { FiCamera } from "react-icons/fi";
import useImageUpload from "@/hooks/fileUpload";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import instance from "@/hooks/instance";
import ProtectedRoute from "@/routes/ProtectedRoute";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const EditDriverProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useRouter();
    const { imageFileInputRef, selectedImage, handleImageClick, handleImageFileChange, selectedFiles, imageFiles }: any = useImageUpload();
    // console.log(imageFiles)



    const [userData, setUserData] = useState<any>({
        fullName: "",
        email: "",
        address: "",
        phoneNumber: "",
        dob: "",
        about: "",
        drivingLicenseExpirationDate: ""
    });

    const router = useParams();

    const id = router.slug;
    console.log(id)

    const getUserById = async (userId: any) => {
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
        setUserData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

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

    const handleSubmit = async (e: any) => {
        setIsLoading(true)
        e.preventDefault();
        const formData: any = new FormData();
        const imageUrl = await uploadImageToBackend(imageFiles);


        formData.append('image', imageUrl);
        formData.append("fullName", userData.fullName);
        formData.append("email", userData.email);
        formData.append("address", userData.address);
        formData.append("phoneNumber", userData.phoneNumber);
        formData.append("dob", userData.dob);
        formData.append("about", userData.about);
        formData.append("drivingLicenseExpirationDate", userData.drivingLicenseExpirationDate);


        try {
            const response = await instance.put(`/api/user/updateUserProfile/${id}`, formData);
            setIsLoading(false)
            Swal.fire({
                text: "Profile update successfully!",
                icon: "success"
            });
            navigate.push(`/dashboard/driverDetails/${id}`)

            setUserData({
                fullName: "",
                email: "",
                address: "",
                phoneNumber: "",
                dob: "",
                about: "",
                drivingLicenseExpirationDate: ""
            });

        } catch (error: any) {
            setIsLoading(false)
            Swal.fire({
                title: "Error",
                text: `Profile update failed! ${error.message}`,
                icon: "error"
            });
        }
    };

    return (
        <ProtectedRoute>
            <>
                <div className="w-full">

                    <form onSubmit={handleSubmit} className="container mx-auto my-[50px]  round-[16px] p-[50px]  shadow-[0 0 20px rgba(89, 102, 122, .05)] ">

                        <input
                            required
                            type="file"
                            ref={imageFileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageFileChange}
                            name="image"
                            id="image"
                        />

                        <div className="m-auto mb-[20px]" style={{ position: 'relative', width: '150px', height: '150px' }}>

                            <Image
                                src={selectedImage ? selectedImage : (userData?.image ? userData?.image : profile)}
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
                                        required
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
                                        required
                                        type="text"
                                        className="w-full border "
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
                                        required
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
                                        className="w-full border "
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
                                        required
                                        type="number"
                                        className="w-full border "
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
                                        className="w-full border "
                                        id="dob"
                                        placeholder="Enter your phone number"
                                        name="dob"
                                        value={userData?.dob}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>


                        </div>
                        <div className="w-full add_driver">
                            <div className="mb-3">
                                <label htmlFor="" className="">
                                    License Expiration Date
                                </label>
                                <input
                                    required
                                    type={`${userData?.drivingLicenseExpirationDate ? "text" : "date"}`}
                                    className="w-full border "
                                    id="drivingLicenseExpirationDate"
                                    placeholder="Enter your city"
                                    defaultValue={userData?.drivingLicenseExpirationDate ? userData.drivingLicenseExpirationDate : '10/20/5'}
                                    name="drivingLicenseExpirationDate"
                                />
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
        </ProtectedRoute>

    )
}

export default EditDriverProfile


const useSecondImageUpload = () => {
    const imageFileInputRef2 = useRef<HTMLInputElement>(null); // Specify the type as HTMLInputElement
    const [selectedImage2, setSelectedImage2] = useState<any>(null); // Assuming selectedImage2 is a string
    const [selectedFiles2, setSelectedFiles2] = useState<any>(null); // Assuming selectedFiles2 is a FileList

    const handleImageClick2 = () => {
        imageFileInputRef2.current?.click();
    };

    const handleImageFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => { // Use React.ChangeEvent<HTMLInputElement> for the event type
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFiles2(files);
            const selectedFile = files[0];
            const imageUrl: string = URL.createObjectURL(selectedFile); // Specify the type as string
            setSelectedImage2(imageUrl);
        }
    };

    return {
        imageFileInputRef2,
        selectedImage2,
        handleImageClick2,
        handleImageFileChange2,
        selectedFiles2
    };
};
