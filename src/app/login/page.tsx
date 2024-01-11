"use client";
import '../../app/globals.scss'
import { useState } from "react";
import Divider from "@/components/divider/divider";
import Image from "next/image";
import Link from "next/link";
import SocialBtn from "@/components/socialBtn/SocialBtn";
import AuthTitle from "@/components/authTitle/authTitle";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import eye from "../../../public/assets/passwortd_eye.png";
import login from "../../../public/assets/login.jpg";

const Login = () => {
  const [isChecked, setChecked] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };
  

  return (
    <div className="w-full mt-[100px] mx-auto">
      <div className="grid grid-cols-2 w-full items-center   my-auto">
        <div className="">
          <Image  src={login}  alt="login" />
        </div>
        <div className="shadow-card pt-10 px-[30px] pb-5 lg:pb-28 lg:pt-p_153  mx-auto">
          <AuthTitle>Login to Your Account</AuthTitle>
          <SocialBtn />
          <Divider />
          <form className=" auth_layout ">

            <div className="mb-5">
              <label htmlFor="email">
                Email <span>(Required)</span>{" "}
              </label>
              <input type="email" id="email" />
            </div>

            <div className="mb-6">
              <label htmlFor="password">
                Password <span>(Required)</span>{" "}
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

            <div className="flex justify-between items-center gap-1 lg:gap-3 mb-5 lg:mb-10">
              <label className="flex items-center gap-4 mb-0">
                <input
                  className="hidden"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span
                  className={`${
                    isChecked && "bg-slate-200"
                  } border  border-slate-200 rounded-sm h-[18px] w-[18px] flex items-center justify-center`}
                >
                  {isChecked ? "✔" : ""}
                </span>
                Stay signed in
              </label>

              <Link
                href="/forget-password"
                className="text-primary font-semibold text-sm"
              >
                I forgot my password
              </Link>
            </div>
            <Link href="/verify-email">
              <PrimaryBtn>Login</PrimaryBtn>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
