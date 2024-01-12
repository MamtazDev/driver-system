"use client";
import { MdOutlineEmail } from "react-icons/md";
import { TbBrandTelegram } from "react-icons/tb";
import AuthTitle from "@/components/authTitle/authTitle";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import Image from "next/image";
import Link from "next/link";
import login from "../../../public/assets/login.jpg";
import '../../app/globals.scss'

const verifyEmail = () => {
  return (
    <div className="w-full mt-[100px] mx-auto">
      <div className="grid grid-cols-2 w-full items-center w-[]  my-auto">
        <div className="text-center">
          <Image src={login} alt="login" />
        </div>
        <div className=" shadow-card w-[65%] px-[30px] email_verify  pb-5 lg:pb-28 pt-10 lg:pt-p_153 max-w-authWidth mx-auto">
          <AuthTitle>Verify Email</AuthTitle>
          <p className="text-secondary text-base font-normal mt-3 mb-5 lg:mb-10">
            Enter the 6-digit code we just sent to{" "}
            <span className="text-black">name@example.com</span>{" "}
          </p>
          <div className="flex items-center gap-4 mb-5">
            <div className="icon h-8 w-8 flex-shrink-0">
              <MdOutlineEmail />
            </div>
            <p className="text-slate-950 font-medium text-sm">Change Email</p>
          </div>
          <div className="flex items-center gap-4 mb-5 lg:mb-10">
            <div className="icon h-8 w-8 flex-shrink-0">
              <TbBrandTelegram />{" "}
            </div>
            <p className="text-slate-950 font-medium text-sm">
              Wait 1:57 seconds before requesting a new code.
            </p>
          </div>
          <form>
            <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-5">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <input
                  style={{ padding: "10px" }}
                  key={index}
                  type="text"
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                />
              ))}
            </div>
            <p className="text-secondary font-medium text-base mb-5 lg:mb-10">
              Can't find the code? Please check your spam folder.
            </p>
            <Link href="/verifiedSuccess">
              <PrimaryBtn>Verify Email</PrimaryBtn>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default verifyEmail;
