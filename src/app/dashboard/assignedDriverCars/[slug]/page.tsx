"use client";

import instance from "@/hooks/instance";
import ProtectedRoute from "@/routes/ProtectedRoute";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import NoImage from "../../../../../public/assets/default-picture.png";
import Swal from "sweetalert2";

const AssignedDriverCars = () => {
  const router = useParams();
  const id = router.slug;

  const [truckData, setTruckData] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instance.get(`/api/new-auth?user=${id}`);

        setTruckData(
          response && response.data.data.length ? response.data.data[0] : null
        );
      } catch (error: any) {
        console.error("Error fetching users:", error.message);
      }
    };
    fetchUsers();
  }, [id]);

  return (
    <>
      <ProtectedRoute>
        <div className="searchResults">
          <div className="container mx-[50px] w-full">
            <div className="grid grid-cols-12 gap-4 lg:grid-cols-4">
              {truckData && (
                <CarDetails key={truckData._id} details={truckData} />
              )}
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default AssignedDriverCars;

function CarDetails({ details }: any) {

  console.log(details)


  const { trucks, authorizationState } = details;
  const [timeLeft, setTimeLeft] = useState({ hours: details?.practiceHour, minutes: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.hours === 0 && prevTime.minutes === 0) {
          clearInterval(interval);
          return prevTime;
        }
        let newMinutes = prevTime.minutes - 1;
        let newHours = prevTime.hours;
        if (newMinutes < 0) {
          newHours--;
          newMinutes = 59;
        }
        return { hours: newHours, minutes: newMinutes };
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [details.practiceHour]);

  const { hours, minutes } = timeLeft;

  const state =
    authorizationState === "In practice"
      ? `In practice: ${hours}H ${minutes}M`
      : authorizationState === "Exam requested"
        ? `Exam requested: ${details.examDate}`
        : authorizationState;

  const handleSubmit = async (e: any) => {
    // setIsLoading(true);
    e.preventDefault();
    try {
      // const response = await instance.post(
      //   "/api/authorization/addNewRequest",
      //   data
      // );
      const response = await instance.post("/api/new-auth", details);

      if (response.data.success) {
        Swal.fire({
          text: "Request added successfully",
          icon: "success"
        });
        // setIsLoading(false);

      } else {
        // toast.error("Failed to add a new request");
        Swal.fire({
          title: "error",
          text: "Failed to add a new request",
          icon: "error"
        });
      }
    } catch (error: any) {
      // setIsLoading(false)
      Swal.fire({
        title: "error",
        text: `Failed to add a new request: Driver already assigned`,
        icon: "error"
      });
    }
  };
  return (
    <>
      <div className="card border border-[red] rounded-[10px] relative">
        <Link href={`/dashboard/truckDetails/${trucks?._id}`}>
          <Image
            height={400}
            width={500}
            className="my-[40px]"
            src={trucks?.image ? trucks?.image : NoImage}
            alt="car"
          />
        </Link>
        <div className="absolute top-5 right-5 bg-black border rounded-[8px] text-white p-[10px]">
          {state}
        </div>
        <div className="card_body">
          <p>{trucks?.brand}</p>
          {/* {authorizationState === "In practice" && <><button onClick={handleSubmit}>Request for an exam</button></>} */}

          <div className="flex items-center justify-between car_title">
            <h5 className="">Model: {trucks?.model} </h5>
            <p>
              VIN Number: <span>{trucks?.vinNumber}</span>
            </p>
          </div>
        </div>
      </div >
    </>
  );
}
