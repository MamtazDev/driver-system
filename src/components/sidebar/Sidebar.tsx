"use client";
import Image from "next/image";
import { useState } from "react";
import Bell from "../../../public/assets/Bell.svg";
import Car from "../../../public/assets/Car.svg";
import Dashboard from "../../../public/assets/Dashboard.svg";
import Logout from "../../../public/assets/Logout.svg";
import Settings from "../../../public/assets/Settings.svg";
import MenuBtn from "../menuBtn/MenuBtn";
import "./sidebar.scss";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

const Sidebar: React.FC = () => {
  const [activeLink, setActiveLink] = useState("/");
  const [isOpen, setIsOpen] = useState(false);
  const [dropDownManager, setDropDownManager] = useState(false);
  const [dropDownCars, setDropDownCars] = useState(false);
  const [dropDown, setDropDown] = useState(true);

  const toggleSidebar = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(!isOpen);
  };

  const toggleDropDown = () => {
    setDropDown(!dropDown);
    setDropDownCars(false)
    setDropDownManager(false)
  };
  const toggleDropDownCars = () => {
    setDropDown(false);
    setDropDownCars(!dropDownCars)
    setDropDownManager(false)
  };
  const toggleDropDownManager = () => {
    setDropDownManager(!dropDownManager)
    setDropDownCars(false)
    setDropDown(false);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <label className="sidebar-toggle" htmlFor="check">
        <input type="checkbox" id="check" />
        <div onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </label>
      <div className="upper">
        <h2 className="text-white text-center">Car Authorization System</h2>
        <div className="sidebar-nav">
          <div className="sidebar-buttons">
            <MenuBtn
              icon={Dashboard}
              link="/dashboard"
              text="Dashboard"
              isActive={activeLink === "/"}
              onClick={() => setActiveLink("/")}
            />

            <div className="drivers_dropdown" onClick={toggleDropDown}>

              <div className="">
                <MenuBtn
                  icon={Car}
                  text="Owners"
                  isActive={activeLink === "/Owners"}
                  onClick={() => setActiveLink("/Owners")}
                />

                {/* {
                  dropDown ?
                    <div className="text-white">
                      <IoIosArrowDown />
                    </div> : ""
                } */}


              </div>
              <div className="dropdown_list">
                {dropDown && (
                  <ul className="list-disc text-[#fff]" style={{ marginLeft: "50px" }}>
                    <li className="">
                      <MenuBtn
                        link="/dashboard/carOwnerList"
                        text="Car Owners List"
                        isActive={activeLink === "/dashboard/carOwnerList"}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLink("/dashboard/carOwnerList");
                        }}
                      />
                    </li>
                    <li className="">
                      <MenuBtn
                        link="/dashboard/addNewCar"
                        text="Add New Car"
                        isActive={activeLink === "/dashboard/addNewCar"}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLink("/dashboard/addNewCar");
                        }}
                      />
                    </li>

                    <li className="">
                      <MenuBtn
                        link="/dashboard/requestedList"
                        text="Requested Lists"
                        isActive={activeLink === "/dashboard/requestedList"}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLink("/dashboard/requestedList");
                        }}
                      />
                    </li>

                  </ul>
                )}
              </div>
            </div>

            <div className="drivers_dropdown" onClick={toggleDropDownManager}>
              <MenuBtn
                icon={Car}
                text="Manager"
                isActive={activeLink === "/manager"}
                onClick={() => setActiveLink("/manager")}
              />

              <div className="dropdown_list">

                {dropDownManager && (
                  <ul className="list-disc text-[#fff]" style={{ marginLeft: "50px" }}>
                    <li>
                      <MenuBtn
                        link="/dashboard/managerProfile"
                        text="Manager Profile"
                        isActive={activeLink === "/dashboard/managerProfile"}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLink("/dashboard/managerProfile");
                        }}
                      />
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className="drivers_dropdown" onClick={toggleDropDownCars}>
              <MenuBtn
                icon={Car}
                text="Drivers"
                isActive={activeLink === "/driver"}
                onClick={() => setActiveLink("/driver")}
              />

              <div className="dropdown_list">
                {dropDownCars && (
                  <ul className="list-disc text-[#fff]" style={{ marginLeft: "50px" }}>

                    <li className="">
                      <MenuBtn
                        link="/dashboard/drivers"
                        text="Drivers"
                        isActive={activeLink === "/dashboard/drivers"}
                        // onClick={() => setActiveLink("/dashboard/drivers")}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLink("/dashboard/drivers");
                        }}
                      />
                    </li>
                    <li className="">
                      <MenuBtn
                        link="/dashboard/addDriver"
                        text="Add Driver"
                        isActive={activeLink === "/dashboard/addDriver"}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLink("/dashboard/addDriver");
                        }}
                      />
                    </li>
                  </ul>
                )}
              </div>
            </div>

            <MenuBtn icon={Car}
              link="/dashboard/carList"
              text="Car Lists"
              isActive={activeLink === "/dashboard/carList"}
              onClick={() => setActiveLink("/dashboard/carList")}
            />
            <MenuBtn
              icon={Bell}
              link="/dashboard/notification"
              text="Notifications"
              isActive={activeLink === "/notifications"}
              onClick={() => setActiveLink("/notifications")}
            />
            <MenuBtn
              icon={Settings}
              link="/dashboard/setting"
              text="Settings"
              isActive={activeLink === "/settings"}
              onClick={() => setActiveLink("/settings")}
            />
          </div>
        </div>
      </div>
      <div className="logout">
        <Link href="/login">
          <button>
            <Image className="logout-icon" src={Logout} alt="Logo" />
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
