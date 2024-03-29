"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Bell from "../../../public/assets/Bell.svg";
import Car from "../../../public/assets/Car.svg";
import Dashboard from "../../../public/assets/Dashboard.svg";
import Logout from "../../../public/assets/Logout.svg";
import MenuBtn from "../menuBtn/MenuBtn";
import "./sidebar.scss";
import Swal from "sweetalert2";

const Sidebar: React.FC = () => {

  const router = useRouter();

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
    setDropDownCars(false);
    setDropDownManager(false);
  };

  const toggleDropDownCars = () => {
    setDropDown(false);
    setDropDownCars(!dropDownCars);
    setDropDownManager(false);
  };

  const toggleDropDownManager = () => {
    setDropDownManager(!dropDownManager);
    setDropDownCars(false);
    setDropDown(false);
  };

  // get the user
  const [role, setRole] = useState<any>();
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData: any = JSON.parse(localStorage.getItem("user") || "null");
      const role = userData?.user?.role[0];
      setRole(role);
      setUser(userData?.user);
    }
  }, []);

  const handleLoggedOut = (e: any) => {
    e.preventDefault();
    localStorage.removeItem("user");
    Swal.fire({
      text: "successfully Logged out ! ",
      icon: "success"
    });

    router.push("/");
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
        <h2 className="text-center text-white">{role}</h2>
        <div className="sidebar-nav">
          <div className="sidebar-buttons">
            <MenuBtn
              icon={Dashboard}
              link="/dashboard"
              text="Dashboard"
              isActive={activeLink === "/"}
              onClick={() => setActiveLink("/")}
            />

            {role === "Owner" && (
              <>
                <div className="drivers_dropdown" onClick={toggleDropDown}>
                  <div className="relative ">
                    <MenuBtn
                      icon={Car}
                      text="Owners"
                      isActive={activeLink === "/Owners"}
                      onClick={() => setActiveLink("/Owners")}
                    />

                    {dropDown ? (
                      <div className="absolute top-[18px] right-[18px]  text-white">
                        <IoIosArrowUp />
                      </div>
                    ) : (
                      <div className="absolute top-[18px] right-[18px]  text-white">
                        <IoIosArrowDown />
                      </div>
                    )}
                  </div>

                  <div className="dropdown_list">
                    {dropDown && (
                      <ul
                        className="list-disc text-[#fff]"
                        style={{ marginLeft: "50px" }}
                      >
                        <li>
                          <MenuBtn
                            link="/dashboard/addNewCar"
                            text="Add New Truck"
                            isActive={activeLink === "/dashboard/addNewCar"}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveLink("/dashboard/addNewCar");
                            }}
                          />
                        </li>
                        <li>
                          <MenuBtn
                            link="/dashboard/addNewManager"
                            text="Add New Manger"
                            isActive={activeLink === "/dashboard/addNewManager"}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveLink("/dashboard/addNewManager");
                            }}
                          />
                        </li>

                        <li>
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
                        <li>
                          <MenuBtn
                            link="/dashboard/truckManagerList"
                            text="Truck Manager List"
                            isActive={
                              activeLink === "/dashboard/truckManagerList"
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveLink("/dashboard/truckManagerList");
                            }}
                          />
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </>
            )}
            {role !== "Driver" && (
              <div className="drivers_dropdown" onClick={toggleDropDownCars}>
                <div className="relative ">
                  <MenuBtn
                    icon={Car}
                    text="Drivers"
                    isActive={activeLink === "/driver"}
                    onClick={() => setActiveLink("/driver")}
                  />
                  {dropDownCars ? (
                    <div className="absolute top-[18px] right-[18px]  text-white">
                      <IoIosArrowUp />
                    </div>
                  ) : (
                    <div className="absolute top-[18px] right-[18px]  text-white">
                      <IoIosArrowDown />
                    </div>
                  )}
                </div>
                <div className="dropdown_list">
                  {dropDownCars && (
                    <ul
                      className="list-disc text-[#fff]"
                      style={{ marginLeft: "50px" }}
                    >
                      <li>
                        <MenuBtn
                          link="/dashboard/drivers"
                          text="All Drivers"
                          isActive={activeLink === "/dashboard/drivers"}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveLink("/dashboard/drivers");
                          }}
                        />
                      </li>

                      {(role === "Manager") &&
                        <li>
                          <MenuBtn
                            link="/dashboard/myDrivers"
                            text="My Drivers"
                            isActive={activeLink === "/dashboard/myDrivers"}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveLink("/dashboard/myDrivers");
                            }}
                          />
                        </li>
                        
                      }
                      {role !== "Owner" && (
                        <li>
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
                      )}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {role === "Manager" && (
              <div className="drivers_dropdown" onClick={toggleDropDownManager}>
                <div className="relative ">
                  <MenuBtn
                    icon={Car}
                    text="Manager"
                    isActive={activeLink === "/manager"}
                    onClick={() => setActiveLink("/manager")}
                  />

                  {dropDownManager ? (
                    <div className="absolute top-[18px] right-[18px]  text-white">
                      <IoIosArrowUp />
                    </div>
                  ) : (
                    <div className="absolute top-[18px] right-[18px]  text-white">
                      <IoIosArrowDown />
                    </div>
                  )}
                </div>
                <div className="dropdown_list">
                  {dropDownManager && (
                    <ul
                      className="list-disc text-[#fff]"
                      style={{ marginLeft: "50px" }}
                    >
                      <li>
                        <MenuBtn
                          link={`/dashboard/assignedCars/${user._id}`}
                          text="Assigned Cars"
                          isActive={
                            activeLink === `/dashboard/assignedCars/${user._id}`
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveLink(
                              `/dashboard/assignedCars/${user._id}`
                            );
                          }}
                        />
                      </li>
                      {/* <li>
                      <MenuBtn
                        link="/dashboard/assignedDriver"
                        text="Assigned Drivers"
                        isActive={activeLink === "/dashboard/assignedDriver"}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLink("/dashboard/assignedDriver");
                        }}
                      />
                    </li> */}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {role === "Owner" && (
              <MenuBtn
                icon={Car}
                link="/dashboard/carList"
                text="Truck Lists"
                isActive={activeLink === "/dashboard/carList"}
                onClick={() => setActiveLink("/dashboard/carList")}
              />
            )}

            {role === "Driver" && (
              <MenuBtn
                icon={Bell}
                link="/dashboard/notification"
                text="Notifications"
                isActive={activeLink === "/notifications"}
                onClick={() => setActiveLink("/notifications")}
              />
            )}
            {role === "Driver" && (
              <MenuBtn
                icon={Car}
                link={`/dashboard/assignedDriverCars/${user?._id}`}
                text="Assigned Cars"
                isActive={
                  activeLink === `/dashboard/assignedDriverCars/${user?._id}`
                }
                onClick={() =>
                  setActiveLink(`/dashboard/assignedDriverCars/${user?._id}`)
                }
              />
            )}
            <MenuBtn
              icon={Bell}
              link={`/dashboard/driverDetails/${user?._id}`}
              text="My Profile"
              isActive={activeLink === `/dashboard/driverDetails/${user?._id}`}
              onClick={() =>
                setActiveLink(`/dashboard/driverDetails/${user?._id}`)
              }
            />
          </div>
        </div>
      </div>


      <div className="logout">
        <button onClick={handleLoggedOut}>
          <Image className="logout-icon" src={Logout} alt="Logo" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
