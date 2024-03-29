'use client'
import profile from "../../../../../public/assets/default-picture.png";
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import Link from "next/link";
import { useEffect, useState } from "react";
import instance from "@/hooks/instance";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/routes/ProtectedRoute";
import toast from "react-hot-toast";

const DriverDetails = () => {

  const [user, setUser] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [notification, setNotification] = useState<any>([]);

  const router = useParams();
  const id = router.slug

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instance.get(`api/new-auth`);

        const findUsersData = response?.data?.data

        const userData = findUsersData.find((data: any) => data.user && data.user._id === id);

        setData(userData);
        setUser(userData.user)

      } catch (error: any) {
        toast.error('Error fetching users:', error.message);
      }
    };
    fetchUsers();
  }, [id]);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await instance.get(`/api/notifications/getByUser/${id}`);
        setNotification(response?.data)
      } catch (error: any) {
        console.error('Error fetching users:', error.message);
      }
    };
    fetchNotification();

  }, [id]);

  return (
    <ProtectedRoute>
      <div className="p-[50px]">
        <div className="driver_details_wrapper">
          <div>
            <div className="bg-[#7155E1] h-[100px] rounded-[8px] relative z-40 flex items-center justify-end mt-[50px]">
              <div>
                <Link href={`/dashboard/editDriverProfile/${user?._id}`}>
                  <button className=" p-[8px] text-white rounded-[8px] border border-[white]  m-[15px]">Edit Profile </button>
                </Link>
              </div>
              {data?.authorizationState ? <span className="p-[8px] text-white rounded-[8px] border border-[white] m-[15px]">
                {data?.authorizationState === "In practice" ? `Driver is in practice for ${data?.practiceHour}` :
                  data?.authorizationState === "Exam requested" ? `${data?.authorizationState} : ${data?.examDate}` :
                    data?.authorizationState}
              </span> :
                <button className=" p-[8px] text-white rounded-[8px] border border-[white]  m-[15px]">Not Assigned </button>
              }
            </div>
          </div>

          <div className="bg-[#fff] absolute me-[50px] z-40 w-[79%]">
            <div className="flex pb-5 border ">
              <Image width={180} height={100} className="w-[180px] mt-[-60px] rounded-[14px] ms-[35px]"
                src={user?.image ? user?.image : profile}
                alt="No Profile" />
              <div className="px-5 py-5 fw-bold">
                <p className=" text-[24px] font-bold ">{user?.fullName}</p>
                <div className="flex gap-5">
                  <p className=" flex items-center gap-2  mt-2  text-[16px]"><IoLocationOutline />

                    <span>{user?.address}</span>
                  </p>
                  <p className=" flex items-center  gap-2 mt-2  text-[16px]">
                    <MdOutlineEmail />
                    <span>{user?.email}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 mt-[180px]">
            <div className="col-span-4 w-full p-[2rem] shadow-card ">
              <h1>Information</h1>
              <div className="table-responsive text-nowrap">
                <table className="table w-full align-middle qd-table mb0">
                  <tbody>
                    <tr className="w-full border-b border-dashed ">
                      <td>
                        <span className="text-[#9499A1]">Full Name</span>
                      </td>
                      <td>
                        <strong className="text-heading">{user?.fullName}</strong>
                      </td>
                    </tr>
                    <tr className="w-full border-b border-dashed " >
                      <td>
                        <span className="text-[#9499A1]">Mobile</span>
                      </td>
                      <td>
                        <div className="flex items-center justify-start">
                          <strong className="text-heading me3">{user?.phoneNumber}</strong>
                        </div>
                      </td>
                    </tr>
                    <tr className="w-full border-b border-dashed ">
                      <td>
                        <span className="text-[#9499A1]">Email</span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-start">
                          <strong className="me3"><a href="#" className="text-decoration-none text-heading hover-primary">{user?.email}</a></strong>
                        </div>
                      </td>
                    </tr>
                    <tr className="w-full border-b border-dashed ">
                      <td>
                        <span className="text-[#9499A1]">Location</span>
                      </td>
                      <td>
                        <strong className="text-heading">{user?.address}</strong>
                      </td>
                    </tr>
                    <tr className="w-full border-b border-dashed ">
                      <td>
                        <span className="text-[#9499A1]">Company</span>
                      </td>
                      <td>
                        <strong className="text-heading">{data?.trucks?.company ? data?.trucks?.company : "N/A"}</strong>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-span-8 w-full p-[2rem] shadow-card ">
              <div className="">
                <h1>About</h1>
                {user?.about ? user?.about : <h1 className="flex justify-center items-center mt-[100px] ">Not Found any details</h1>}

              </div>

            </div>
          </div>

          {user && user?.role && user.role[0] !== 'Owner' && <div className="assigned-to mt-[20px] shadow-card p-[2rem]">
            <h2>Assigned to </h2>
            <div className="table-responsive text-nowrap">
              <table className="table w-full mb-0 align-middle qd-table">
                <tbody>
                  <tr className="w-full border-b border-dashed ">
                    <td>
                      <span className="text-[#9499A1]">Company</span>
                    </td>
                    <td>
                      <strong className="text-heading">{data?.trucks?.company ? data?.trucks?.company : "N/A"}</strong>
                    </td>
                  </tr>
                  <tr className="w-full border-b border-dashed " >
                    <td>
                      <span className="text-[#9499A1]"> License Plate</span>
                    </td>
                    <td>
                      <div className="flex items-center justify-start">
                        <strong className="text-heading me3">{data?.trucks?.licensePlate ? data?.trucks?.licensePlate : "N/A"}</strong>
                      </div>
                    </td>
                  </tr>

                  <tr className="w-full border-b border-dashed ">
                    <td>
                      <span className="text-[#9499A1]">Model</span>
                    </td>
                    <td>
                      <strong className="text-heading">{data?.trucks?.model ? data?.trucks?.model : "N/A"}</strong>
                    </td>
                  </tr>
                  <tr className="w-full border-b border-dashed ">
                    <td>
                      <span className="text-[#9499A1]">VIN Number</span>
                    </td>
                    <td>
                      <strong><a href="#" className="">{data?.trucks?.vinNumber ? data?.trucks?.vinNumber : "N/A"}</a></strong>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>}



          {user?.authorizationState && <div className="assigned-to mt-[20px] shadow-card p-[2rem]">
            {/* <h2>Notification </h2> */}
            <div className="table-responsive text-nowrap">
              <table className="table w-full mb-0 align-middle qd-table">
                <tbody>
                  <tr>
                    <th className="p-0 text-left">Notification status</th>

                    <th className="text-left">Updated status time</th>
                  </tr>

                  {notification.map((noti: any) => (

                    <>
                      <tr className="w-full border-b border-dashed ">

                        <td>
                          <p className="ps-3">{noti.eventName}</p>
                        </td>

                        <td>
                          {/* Display updatedAt date */}
                          {new Date(noti.updatedAt).toISOString().split('T')[0]}
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>}



        </div>
      </div>
    </ProtectedRoute >
  );
};

export default DriverDetails;




