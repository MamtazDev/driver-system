"use client";

import { useState } from "react";
import "../../app/globals.scss";
import Divider from "@/components/divider/divider";
import Image from "next/image";
import Link from "next/link";
import SocialBtn from "@/components/socialBtn/SocialBtn";
import AuthTitle from "@/components/authTitle/authTitle";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import eye from "../../../public/assets/passwortd_eye.png";
import login from "../../../public/assets/login.jpg";

const signUp = () => {
  const [isChecked, setChecked] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };
  return (
    <div className="w-full mt-[100px] mx-auto">
      <div className="grid grid-cols-2 w-full items-center   my-auto">
        <div className="">
          <Image src={login} alt="login" />
        </div>
        <div className="shadow-card px-[30px] pb-5 lg:pb-28 pt-10 lg:pt-p_153 max-w-authWidth mx-auto">
          <AuthTitle>Create Account</AuthTitle>
          <SocialBtn />
          <Divider />

          <form className="auth_layout">
            <div className="mb-5">
              <label htmlFor="name">
                Full Name <span>(Required)</span>{" "}
              </label>
              <input type="text" id="name" />
            </div>
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

            <div className="flex gap-3 items-center mb-5 lg:mb-10">
              <label className="flex items-center gap-4">
                <input
                  className="hidden"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span
                  className={`${
                    isChecked && "bg-slate-200"
                  } border  border-black rounded-sm h-[18px] w-[18px] flex items-center justify-center flex-shrink-0`}
                >
                  {isChecked ? "✔" : ""}
                </span>
                <p className="">
                  By providing your email, you agreeing to our{" "}
                  <Link className="underline" href="#">
                    Terms of Service
                  </Link>{" "}
                  .
                </p>
              </label>
            </div>
            <Link href="/verify-email">
              <PrimaryBtn>Create Account</PrimaryBtn>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default signUp;
