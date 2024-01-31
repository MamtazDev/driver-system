"use client";
import { useState } from "react";
import "../../app/globals.scss";
import Image from "next/image";
import AuthTitle from "@/components/authTitle/authTitle";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import eye from "../../../public/assets/passwortd_eye.png";
import login from "../../../public/assets/login.jpg";
import instance from "../hooks/Instance";


const signUp = () => {
  
  const [passwordShow, setPasswordShow] = useState(false);
  
  const [userData, setUserData] = useState({
    fullName: "",
    role: "Owner",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(userData);
    try {
      const response = await instance.post("signup", userData);
      console.log(response.data);
      setUserData(
        {
          fullName: "",
          role: "",
          email: "",
          password: "",
          address: "",
          phoneNumber: "",
        }
      )
    } catch (error) {
      console.error("Registration failed:", error.message);
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
                <select
                  name="role"
                  id="role"
                  value={userData.role}
                  onChange={handleInputChange}
                >
                  <option value="Owner">Owner</option>
                  <option value="Manager">Manager</option>
                  <option value="Driver">Driver</option>
                </select>
              </div>

              <div className="mb-5">
                <label htmlFor="email">
                  Email
                </label>
                <input
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

              <div className="mb-10">
                <label htmlFor="name">
                  Address
                </label>
                <input type="text" name="address"
                  value={userData.address}
                  onChange={handleInputChange} />
              </div>

              <div className="mb-10">
                <label htmlFor="name">
                  Phone Number
                </label>
                <input type="text"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <PrimaryBtn>Create Account</PrimaryBtn>
          </form>
        </div>
      </div>
    </div>
  );
};

export default signUp;
