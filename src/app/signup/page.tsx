"use client";
import { useState } from "react";
import "../../app/globals.scss";
import Image from "next/image";
import AuthTitle from "@/components/authTitle/authTitle";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import eye from "../../../public/assets/passwortd_eye.png";
import login from "../../../public/assets/login.jpg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import instance from "@/hooks/instance";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useRouter();
  const [passwordShow, setPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState({
    fullName: "",
    role: "Owner",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    companyName: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    setIsLoading(true)
    e.preventDefault();
    try {
      const response = await instance.post("/api/user/signup", userData);
      setIsLoading(false)
      
      setUserData({
        fullName: "",
        role: "",
        email: "",
        password: "",
        address: "",
        phoneNumber: "",
        companyName: "Owner"
      });
      localStorage.setItem('user', JSON.stringify(response.data.user))


      toast.success('Signup Successfull!')

      navigate.push('/dashboard')

    } catch (error: any) {
      setIsLoading(false)
      toast.success("Registration failed: ", error.message)
    }
  };


  return (
    <div className="w-full mt-[100px] mx-auto">
      <div className="grid items-center w-full grid-cols-2 my-auto">
        <div className="">
          <Image src={login} alt="login" />
        </div>
        <div className="shadow-card px-[30px] pb-5 lg:pb-28 pt-10 lg:pt-p_153 max-w-authWidth mx-auto">
          <AuthTitle>Create Account</AuthTitle>
          <form onSubmit={handleSubmit} className="auth_layout mt-[24px] ">
            <div className="grid grid-cols-2 gap-[20px]">
              <div className="mb-5">
                <label htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  required

                  id="name"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="name">
                  Role
                </label> <br />

                <input
                  required
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={userData.role}
                  onChange={handleInputChange} />
              </div>

              <div className="mb-5">
                <label htmlFor="email">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange} />
              </div>

              <div className="mb-5">
                <label htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    required
                    type={passwordShow ? "text" : "password"}
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                  />
                  <Image
                    onClick={() => setPasswordShow(!passwordShow)}
                    className="absolute right-4 top-[25px] cursor-pointer"
                    src={eye}
                    alt=""
                  />
                </div>
              </div>

              <div className="mb-[20px]">
                <label htmlFor="name">
                  Address
                </label>
                <input
                  required
                  type="text" name="address"
                  value={userData.address}
                  onChange={handleInputChange} />
              </div>

              <div className="mb-[10px]">
                <label htmlFor="name">
                  Phone Number
                </label>
                <input
                  required
                  type="text"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mb-[10px]">
              <label htmlFor="name">
                Company Name
              </label>
              <input
                required
                type="text"
                name="companyName"
                value={userData.companyName}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-end justify-end gap-4 mb-[10px] ">
              Already have an account? <Link href="/" className='font-bold'>Login.</Link>
            </div>
            <PrimaryBtn> {isLoading ? (
              <>
                Loading...
              </>
            ) : (
              <>
                Create Account
              </>
            )}</PrimaryBtn>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
