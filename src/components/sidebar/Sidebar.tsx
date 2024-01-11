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

const Sidebar: React.FC = () => {
  const [activeLink, setActiveLink] = useState("/");
  const [isOpen, setIsOpen] = useState(false);
  const [dropDownManager, setDropDownManager] = useState(true);
  const [dropDownCars, setDropDownCars] = useState(true);
  const [dropDown, setDropDown] = useState(true);

  const toggleSidebar = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(!isOpen);
  };
  
  const toggleDropDown = () => {
    setDropDown(dropDown);
  };
  const toggleDropDownCars = () => {
    setDropDownCars(dropDownCars)
  };
  const toggleDropDownManager = () => {

    setDropDownManager(dropDownManager)
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
        {/* <Image src={Logo} alt="Logo" /> */}
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
            <div className="drivers_dropdown" onClick={toggleDropDownManager}>
              <MenuBtn
                icon={Car}
                text="Manager"
                isActive={activeLink === "/manager"}
                onClick={() => setActiveLink("/manager")}
              />

              <div className="dropdown_list">
                {dropDownManager && (
                  <ul style={{ marginLeft: "30px" }}>
                    <li className="">
                      <MenuBtn
                        link="/dashboard/managerProfile"
                        text="Manager Profile"
                        isActive={activeLink === "/dashboard/managerProfile"}
                        onClick={() => setActiveLink("/dashboard/managerProfile")}
                      />
                    </li>
                    <li className="">
                      <MenuBtn
                        link="/dashboard/carList"
                        text="Car Lists"
                        isActive={activeLink === "/dashboard/carList"}
                        onClick={() => setActiveLink("/dashboard/carList")}
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
                  <ul style={{ marginLeft: "30px" }}>
                    {/* <li className="">
                      <MenuBtn
                        link="/dashboard/profile"
                        text="Profile"
                        isActive={activeLink === "/dashboard/profile"}
                        onClick={() => setActiveLink("/dashboard/profile")}
                      />
                    </li> */}
                    <li className="">
                      <MenuBtn
                        link="/dashboard/drivers"
                        text="Drivers"
                        isActive={activeLink === "/dashboard/drivers"}
                        onClick={() => setActiveLink("/dashboard/drivers")}
                      />
                    </li>
                    <li className="">
                      <MenuBtn
                        link="/dashboard/addDriver"
                        text="Add Driver"
                        isActive={activeLink === "/dashboard/addDriver"}
                        onClick={() => setActiveLink("/dashboard/addDriver")}
                      />
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className="drivers_dropdown" onClick={toggleDropDown}>
              <MenuBtn
                icon={Car}
                text="Owners"
                isActive={activeLink === "/drivers"}
                onClick={() => setActiveLink("/drivers")}
              />

              <div className="dropdown_list">
                {dropDown && (
                  <ul style={{ marginLeft: "30px" }}>
                    <li className="">
                      <MenuBtn
                        link="/dashboard/carOwnerList"
                        text="Car Owners List"
                        isActive={activeLink === "/dashboard/carOwnerList"}
                        onClick={() => setActiveLink("/dashboard/carOwnerList")}
                      />
                    </li>
                    <li className="">
                      <MenuBtn
                        link="/dashboard/addNewCar"
                        text="Add New Car"
                        isActive={activeLink === "/dashboard/addNewCar"}
                        onClick={() => setActiveLink("/dashboard/addNewCar")}
                      />
                    </li>

                    <li className="">
                      <MenuBtn
                        link="/dashboard/carList"
                        text="Car Lists"
                        isActive={activeLink === "/dashboard/carList"}
                        onClick={() => setActiveLink("/dashboard/carList")}
                      />
                    </li>
                    <li className="">
                      <MenuBtn
                        link="/dashboard/requestedList"
                        text="Requested Lists"
                        isActive={activeLink === "/dashboard/requestedList"}
                        onClick={() => setActiveLink("/dashboard/requestedList")}
                      />
                    </li>

                  </ul>
                )}
              </div>
            </div>
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
          {/* <div className="divider"></div> */}
          {/* <div>
            <p>Report</p>
            <div className="sidebar-buttons">
              <MenuBtn
                icon={Payment}
                link="/payment"
                text="Payment"
                isActive={activeLink === "/payment"}
                onClick={() => setActiveLink("/payment")}
              />
              <MenuBtn
                icon={Transaction}
                link="/transaction"
                text="Transaction"
                isActive={activeLink === "/transaction"}
                onClick={() => setActiveLink("/transaction")}
              />
              <MenuBtn
                icon={Report}
                link="/car-report"
                text="Car Report"
                isActive={activeLink === "/car-report"}
                onClick={() => setActiveLink("/car-report")}
              />
            </div>
          </div> */}
        </div>
      </div>
      <div className="logout">
        <button>
          <Image className="logout-icon" src={Logout} alt="Logo" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
