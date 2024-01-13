import React from "react";
import "./DriverDetails.scss";
import profile from "../../../public/assets/detailsprofile.jpg";
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";


const DriverDetails = () => {
  return (
    <>
      <div className="driver_details_wrapper">
        <div className="bg-[#7155E1] h-[100px] rounded-[8px] relative z-30 flex items-center justify-end mt-[50px]">
          <div>
            <button className=" p-[8px] text-white rounded-[8px] border border-[white]  m-[15px]">Already Assigned </button>
          </div>
        </div>
        <div className="bg-[#fff] absolute me-[50px] z-40 w-[79%]">
          <div className="flex border pb-5 ">
            <Image className="w-[180px] mt-[-60px] rounded-[14px] ms-[35px]" src={profile} alt="" />
            <div className="px-5 py-5 fw-bold">
              <p className=" text-[24px]">Nicolos</p>
              <div className="flex gap-5">
                <p className=" flex items-center gap-2  mt-2  text-[16px]"><IoLocationOutline />
                  <span>Florida</span>
                </p>
                <p className=" flex items-center  gap-2 mt-2  text-[16px]">
                  <MdOutlineEmail />
                  <span>nicolos@gmail.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-[180px]">
          <div className="col-span-4 w-full p-[2rem] shadow-card ">
            <h1>Information</h1>
            <div className="table-responsive text-nowrap">
              <table className="table qd-table align-middle mb0 w-full">
                <tbody>
                  <tr className="border-b border-dashed w-full ">
                    <td>
                      <span className="text-[#9499A1]">Full Name</span>
                    </td>
                    <td>
                      <strong className="text-heading">Barry Tone</strong>
                    </td>
                  </tr>
                  <tr className="border-b border-dashed w-full " >
                    <td>
                      <span className="text-[#9499A1]">Mobile</span>
                    </td>
                    <td>
                      <div className="flex items-center justify-start">
                        <strong className="text-heading me3">+1-202-555-0116</strong>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-dashed w-full ">
                    <td>
                      <span className="text-[#9499A1]">Email</span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center justify-content-start">
                        <strong className="me3"><a href="#" className="text-decoration-none text-heading hover-primary">barry@domain.com</a></strong>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-dashed w-full ">
                    <td>
                      <span className="text-[#9499A1]">Location</span>
                    </td>
                    <td>
                      <strong className="text-heading">Florida, United States</strong>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className="text-[#9499A1]">Company</span>
                    </td>
                    <td>
                      <strong className="text-heading">Tempload Themes</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-span-8 w-full p-[2rem] shadow-card ">
            <div className="">
              <h1>About</h1>
              <p className="common_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus explicabo architecto repellendus magnam corporis ad minima nam aspernatur veritatis repellat eum, quidem quisquam corrupti laborum velit minus iure sunt, exercitationem ratione magni. Dolores, aliquam. Sed facere itaque, voluptatibus, velit provident quibusdam molestias minus, ea facilis nostrum molestiae cumque nesciunt.
              </p>
              <p className="mt-3 common_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus explicabo architecto repellendus magnam corporis ad minima nam aspernatur veritatis repellat eum, quidem quisquam corrupti laborum velit minus iure sunt, exercitationem ratione magni. Dolores, aliquam. Sed facere itaque, voluptatibus, velit provident quibusdam molestias minus, ea facilis nostrum molestiae cumque nesciunt.
              </p>
            </div>

          </div>
        </div>

        <div className="assigned-to mt-[20px] shadow-card p-[2rem]">
          <h2>Assigned to </h2>
          <div className="table-responsive text-nowrap">
            <table className="table qd-table align-middle mb-0 w-full">
              <tbody>
                <tr className="border-b border-dashed w-full ">
                  <td>
                    <span className="text-[#9499A1]">Company</span>
                  </td>
                  <td>
                    <strong className="text-heading">Nicolos pvt</strong>
                  </td>
                </tr>
                <tr className="border-b border-dashed w-full " >
                  <td>
                    <span className="text-[#9499A1]">License Plate</span>
                  </td>
                  <td>
                    <div className="flex items-center justify-start">
                      <strong className="text-heading me3">+1-202-555-0116</strong>
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-dashed w-full ">
                  <td>
                    <span className="text-[#9499A1]">Location</span>
                  </td>
                  <td>
                    <strong className="text-heading">Florida, United States</strong>
                  </td>
                </tr>
                <tr className="border-b border-dashed w-full ">
                  <td>
                    <span className="text-[#9499A1]">VIN Number</span>
                  </td>
                  <td>
                    <strong><a href="#" className="">325654789465</a></strong>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverDetails;
