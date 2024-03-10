"use client";
import instance from "@/hooks/instance";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { NotificationsCreate } from "@/utils/interects";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import Modal from "react-modal";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const RequestedList = () => {
  const [requestsLists, setRequestsLists] = useState<any>([]);
  const [error, setError] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  const [selectedValue, setSelectedValue] = useState<any>("");
  const [practiceHour, setPracticeHour] = useState<any>("");
  const [examDate, setExamDate] = useState<any>("");

  useEffect(() => {
    if (selectedValue === "In practice" || selectedValue === "Exam requested") {
      setIsOpen(true);
    }
  }, [selectedValue]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const response = await instance.get('/api/authorization/allRequest');
      // setRequestsLists(response.data.data);
      const response = await instance.get("/api/new-auth?unauthorized=true");
      console.log(response);

      setRequestsLists(response.data.data);
    } catch (error: any) {
      setError(error?.response?.data?.error_message || "An error occurred");
    }
  };

  const handleSelectChange = async (
    event: any,
    requestId: string,
    userId: string,
    truckId: string
  ) => {
    const newAuthorizationState = event.target.value;
    setSelectedValue(newAuthorizationState);

    try {
      if (
        newAuthorizationState === "In practice" ||
        newAuthorizationState === "Exam requested"
      ) {
        setIsOpen(true);
      } else {
        // const response = await instance.put(
        //   `/api/authorization/updateAuthorization/${requestId}`,
        //   {
        //     newAuthorizationState,
        //     userId,
        //     truckId,
        //   }
        // );
        const response = await instance.patch(`/api/new-auth/${requestId}`, {
          authorizationState: newAuthorizationState,
          practiceHour: null,
          examDate: null,
        });

        toast.success("Driver status update successfull");

        if (response.data.success) {
          const notificationData = {
            eventName: newAuthorizationState,
            truckModel: truckId,
            userId: userId,
          };
          const notification = await NotificationsCreate(notificationData);

          console.log("notification", notification);

          setRequestsLists((prevRequests: any) =>
            prevRequests.map((request: any) =>
              request._id === requestId
                ? { ...request, authorizationState: [newAuthorizationState] }
                : request
            )
          );
        }
      }
    } catch (error) {
      console.error("Error updating authorization status:", error);
    }
  };

  const handleSave = async (
    requestId: string,
    userId: string,
    truckId: string
  ) => {
    try {
      //   const response = await instance.put(
      //     `/api/authorization/updateAuthorization/${requestId}`,
      //     {
      //       newAuthorizationState: "In practice",
      //       practiceHour,
      //       userId,
      //       truckId,
      //     }
      //   );
      console.log("selectedValue", selectedValue);

      const newData: any = {
        authorizationState: selectedValue,
      };

      if (selectedValue === "In practice") {
        newData.practiceHour = practiceHour;
        newData.examDate = null;
      } else if (selectedValue === "Exam requested") {
        newData.examDate = examDate;
        newData.practiceHour = null;
      }

      const response = await instance.patch(
        `/api/new-auth/${requestId}`,
        newData
      );

      if (response.data.success) {
        setRequestsLists((prevRequests: any) =>
          prevRequests.map((request: any) =>
            request._id === requestId
              ? {
                  ...request,
                  authorizationState: ["In practice"],
                  practiceHour,
                }
              : request
          )
        );
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error updating authorization status:", error);
    }
  };

  return (
    <ProtectedRoute>
      <>
        <div className="w-full driver_list_wrapper">
          <div className="container mx-auto">
            <h2 className="py-5 text-xl">Requested List</h2>
            <div className="shadow-card">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right ">
                  <thead className="text-xs text-gray-700 uppercase border-b ">
                    <tr>
                      <th scope="col" className="px-6 py-[15px]">
                        Truck
                      </th>
                      <th scope="col" className="px-6 py-[15px]">
                        Company
                      </th>
                      <th scope="col" className="px-6 py-[15px]">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-[15px]">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-[15px]">
                        Phone Number
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestsLists.map((requests: any) => (
                      <React.Fragment key={requests?.trucks?._id}>
                        <tr className="border-b border-dashed bg-grey-400">
                          <td
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                          >
                            <div className="flex items-center gap-[8px]">
                              <p>{requests?.trucks?.model}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {requests?.trucks?.company}
                          </td>
                          <td className="px-6 py-4">
                            {requests?.user?.fullName}
                          </td>
                          <td className="px-6 py-4">{requests?.user?.email}</td>
                          <td className="px-6 py-4">
                            {requests?.user?.phoneNumber}
                          </td>

                          <td className="w-[130px]">
                            <select
                              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                              onChange={(e) =>
                                handleSelectChange(
                                  e,
                                  requests._id,
                                  requests.user._id,
                                  requests?.trucks?._id
                                )
                              }
                              value={requests.authorizationState}
                            >
                              <option value="choose">Choose</option>
                              <option value="Requested" disabled>
                                Requested
                              </option>
                              <option value="Request approved">
                                Request approved
                              </option>
                              <option value="In practice">In practice</option>
                              <option value="Exam requested">
                                Exam requested
                              </option>
                              {/* <option value="Authorized">Authorized</option> */}
                            </select>
                          </td>
                        </tr>
                        <Modal
                          isOpen={modalIsOpen}
                          onRequestClose={closeModal}
                          style={customStyles}
                          contentLabel="Example Modal"
                        >
                          <div className="text-right mb-[10px]">
                            <button onClick={closeModal}>
                              <IoMdClose />
                            </button>
                          </div>
                          {selectedValue === "In practice" && (
                            <div className="flex flex-col">
                              <label htmlFor="" className="mb-[8px] fw-[900]">
                                Hours Of Practice
                              </label>
                              {/* <input className='rounded-[8px] bg-[#F8FAFC] mt-[10px]' type="number" placeholder='Hours of Practice' /> */}
                              <input
                                className="rounded-[8px] bg-[#F8FAFC] mt-[10px]"
                                type="number"
                                placeholder="Hours of Practice"
                                value={practiceHour}
                                onChange={(e) =>
                                  setPracticeHour(e.target.value)
                                }
                              />
                            </div>
                          )}

                          {selectedValue === "Exam requested" && (
                            <div className="flex flex-col">
                              <label htmlFor="" className="mb-[8px] fw-[900]">
                                Exam Date
                              </label>
                              <input
                                type="date"
                                className="w-full border rounded-[8px]"
                                id="drivingLicenseExpirationDate"
                                name="drivingLicenseExpirationDate"
                                placeholder="Enter your license expiration date"
                                onChange={(e) => setExamDate(e.target.value)}
                              />
                            </div>
                          )}

                          <div className="text-center">
                            {/* <button className='common_button'>Save</button> */}
                            <button
                              className="common_button"
                              onClick={() =>
                                handleSave(
                                  requests._id,
                                  requests.user._id,
                                  requests?.trucks?._id
                                )
                              }
                            >
                              Save
                            </button>
                          </div>
                        </Modal>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
};

export default RequestedList;
