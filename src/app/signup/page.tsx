"use client";
import { useState } from "react";
import "../../app/globals.scss";
import Image from "next/image";
import Link from "next/link";
import AuthTitle from "@/components/authTitle/authTitle";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import eye from "../../../public/assets/passwortd_eye.png";
import login from "../../../public/assets/login.jpg";

const signUp = () => {

  const [passwordShow, setPasswordShow] = useState(false);

const [userData,setUserData]=useState({
  
})


  return (
    <div className="w-full mt-[100px] mx-auto">
      <div className="grid grid-cols-2 w-full items-center   my-auto">
        <div className="">
          <Image src={login} alt="login" />
        </div>
        <div className="shadow-card px-[30px] pb-5 lg:pb-28 pt-10 lg:pt-p_153 max-w-authWidth mx-auto">
          <AuthTitle>Create Account</AuthTitle>
          <form className="auth_layout mt-[24px] ">
            <div className="grid grid-cols-2 gap-[20px]">

              <div className="mb-5">
                <label htmlFor="name">
                  Full Name
                </label>
                <input type="text" id="name" />
              </div>
              <div className="mb-5">
                <label htmlFor="name">
                  Role
                </label> <br />
                <select name="" id="">
                  <option value="Owner">Owner</option>
                  <option value="Manager">Manager</option>
                  <option value="Driver">Driver</option>
                </select>
              </div>

              <div className="mb-5">
                <label htmlFor="email">
                  Email
                </label>
                <input type="email" id="email" />
              </div>

              <div className="mb-5">
                <label htmlFor="password">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={passwordShow ? "text" : "password"}
                    id="password"
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
                <input type="text" id="name" />
              </div>
              <div className="mb-10">
                <label htmlFor="name">
                  Phone Number
                </label>
                <input type="text" id="name" />
              </div>
            </div>
            <Link href="/verifyEmail">
              <PrimaryBtn>Create Account</PrimaryBtn>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default signUp;
