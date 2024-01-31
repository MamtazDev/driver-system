"use client";
import '../../app/globals.scss'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthTitle from "@/components/authTitle/authTitle";
import eye from "../../../public/assets/passwortd_eye.png";
import login from "../../../public/assets/login.jpg";
import instance from '../hooks/Instance';
import { useRouter } from 'next/navigation';

const Login = () => {

  const router = useRouter()

  const [isChecked, setChecked] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post('/login', formData);
      console.log(response.data);
      localStorage.setItem('user', JSON.stringify(response.data))
      router.push('/dashboard')
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="w-full mt-[100px] mx-auto">
      <div className="grid items-center w-full grid-cols-2 my-auto ">
        <div className="">
          <Image src={login} alt="login" />
        </div>
        <div className="auth_layout shadow-card pt-10 px-[30px] pb-5 lg:pb-28 lg:pt-p_153  mx-auto">
          <AuthTitle className="text-center">Login</AuthTitle>
          <form onSubmit={handleLogin} className=" mt-[24px] ">
            <div className="mb-5">
              <label htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordShow ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
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

            <div className="flex items-center justify-between gap-1 mb-5 lg:gap-3 lg:mb-10">
              <label className="flex items-center gap-4 mb-0">
                <input
                  className="hidden"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span
                  className={`${isChecked && "bg-slate-200"
                    } border  border-slate-200 rounded-sm h-[18px] w-[18px] flex items-center justify-center`}
                >
                  {isChecked ? "✔" : ""}
                </span>
                Stay signed in
              </label>

              <Link
                href="/forgetPass"
                className="text-sm font-semibold text-primary"
              >
                I forgot my password
              </Link>
            </div>
            {/* <Link href="/verifyEmail"> */}
            {/* <PrimaryBtn>Login</PrimaryBtn> */}
            <button
              type="submit"
              className="w-full px-8 py-3 text-base font-bold text-white transition ease-in-out bg-black rounded-3xl duration-600 hover:bg-primary-dark ">
              Login
            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
