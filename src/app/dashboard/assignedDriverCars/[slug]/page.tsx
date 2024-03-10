"use client";

import instance from "@/hooks/instance";
import ProtectedRoute from "@/routes/ProtectedRoute";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import NoImage from "../../../../../public/assets/default-picture.png";

const AssignedDriverCars = () => {
  const router = useParams();
  const id = router.slug;

  const [truckData, setTruckData] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await instance.get(`/api/user/getUserById/${id}`);
        // setTruckData(response?.data?.data?.assignedTo?.trucks);

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
        <>
          <div className="searchResults">
            <div className="container mx-[50px] w-full">
              <div className="grid grid-cols-12 gap-4 lg:grid-cols-4">
                {truckData && (
                  <CarDetails key={truckData._id} details={truckData} />
                )}
              </div>
            </div>
          </div>
        </>
      </ProtectedRoute>
    </>
  );
};

export default AssignedDriverCars;

function CarDetails({ details }: any) {
  console.log(details);

  const { trucks, authorizationState, user } = details;

  const state =
    authorizationState === "In practice"
      ? `In practice: ${details?.practiceHour}H`
      : authorizationState === "Exam requested"
      ? `Exam requested: ${details.examDate}`
      : authorizationState;

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
          <div className="flex items-center justify-between car_title">
            <h5 className="">Model: {trucks?.model} </h5>
            <p>
              VIN Number: <span>{trucks?.vinNumber}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
