"use client";

import NoDataFound from "@/components/NoDataFound/NoDataFound";
import instance from "@/hooks/instance";
import ProtectedRoute from "@/routes/ProtectedRoute";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const AssignedCars = () => {
  const router = useParams();
  const id = router.slug;

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          const managerIdToFind = id;
          const response = await instance.get(
            `/api/truck/getTruckByManagerId/${managerIdToFind}`
          );
          // const response = await instance.get(
          // `/api/v2/trucks/?manager=${managerIdToFind}`
          // );
          const trucks = response.data.data;
          setData(trucks);
          console.log("Trucks retrieved successfully:", trucks);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id]);

  console.log("data from assigned cars from different manager", data);

  return (
    <ProtectedRoute>
      <>
        <div className="searchResults">
          <div className="container mx-[50px] w-full">
            <div className="grid grid-cols-12 gap-4 lg:grid-cols-4">
              {data.length == 0 ? (
                <NoDataFound />
              ) : (
                data.map((details: any) => (
                  <CarDetails key={details._id} details={details} />
                ))
              )}
            </div>
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
};

export default AssignedCars;

function CarDetails({ details }: any) {
  console.log("details of a car", details);

  return (
    <>
      <div className="card border border-[red] rounded-[10px]">
        <div className="flex items-center justify-end gap-2 card_header">
          {details?.status && (
            <button className="bg-black border rounded-[8px] text-white p-[10px]">
              {details?.status.authorizationState &&
                details?.status?.authorizationState[0]}
            </button>
          )}
        </div>

        <Link href={`/dashboard/truckDetails/${details?._id}`}>
          <Image
            height={150}
            width={500}
            className="my-[40px] !h-[200px] object-cover"
            src={details?.image}
            alt="car"
          />
        </Link>

        <div className="card_body">
          <p>{details?.brand}</p>
          <div className="flex items-center justify-between car_title">
            <h5 className="">Model: {details?.model} </h5>
            <p>
              VIN Number: <span>{details.vinNumber}</span>
            </p>
          </div>

          {/* {!details?.assignedDriver ? ( */}
          <Link href={`/dashboard/authorizationRequest/${details._id}`}>
            <button>Authorized Now</button>
          </Link>
          {/* // <div>
            //   <div className="flex justify-between items-center mt-[14px]">
            //     <p className="text-black">Company: {details?.company}</p>
                
            //     <p className="font-bold text-black">
            //       Driver name: {details?.assignedDriver?.user?.fullName}
            //     </p>
            //   </div>
            //   <div className="p-1 border rounded bg-green-500 mt-[14px]">
            //     <p className="font-bold !text-white text-center ">
            //       Driver status: {details?.assignedDriver?.authorizationState}
            //     </p>

   
            //   </div>
            // </div> */}
        </div>
      </div>
    </>
  );
}
