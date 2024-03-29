"use client";

import { useEffect, useState } from "react";
import "./stats.scss";
import { useDriverContext } from "@/hooks/driverContext";
import { useTruckContext } from "@/hooks/truckContext";
import instance from "@/hooks/instance";
import { useRouter } from "next/navigation";

const Stats = () => {

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDate.toLocaleString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });


  const driverContext = useDriverContext();
  const truckContext = useTruckContext();

  const [driverDataList, setDriverDataList] = useState<any>()
  const [truckDataList, setTruckDataList] = useState<any>()

  useEffect(() => {
    if (driverContext && driverContext.data) {
      const driverData = driverContext.data.filter((data: any) => data.role.includes("Driver"));
      setDriverDataList(driverData)
    }
  }, [driverContext]);

  useEffect(() => {
    setTruckDataList(truckContext?.data?.length)
  }, [truckContext]);

  const totalDriver = driverDataList?.length;

  const [initialValue, setInitialValue] = useState<any>(null);
  const [inPracticeData, setInPracticeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/api/authorization/allRequest');
        setInitialValue(response.data);
      } catch (error) {
        console.error('Error fetching data from the database:', error);
      }
    };

    fetchData();

  }, []);

  useEffect(() => {
    if (initialValue && initialValue.data) {
      const filteredData = initialValue.data.filter((item: any) =>
        item.authorizationState[0].includes('In practice')
      );
      setInPracticeData(filteredData);
    }
  }, [initialValue]);
  const router = useRouter()


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

  return (
    <>

      {role !== "Driver" ? <div className="container mt-[100px]">
        <div className="my-[20px]">
          <h1>Todays Statistics</h1>
          <p>{formattedDate}</p>
        </div>

        <div className="grid grid-cols-12 gap-5">
          <div onClick={() => router.push('/dashboard/carList')} className="w-full col-span-12 cursor-pointer lg:col-span-3">
            <div className="col-xxl-3 col-md-6 mb5">
              <div className="bg-[#7155E1] rounded-[5px] pt2 pb-5 text-center">
                <h6 className="text-white mb-0 pt-[15px] text-[20px] fw-bold ">Total Truck</h6>
              </div>
              <div className="status_Card rounded-[5px]  text-center">
                <h1 className="mb1">{truckDataList}</h1>
              </div>
            </div>
          </div>

          <div onClick={() => router.push('/dashboard/drivers')} className="w-full col-span-12 lg:col-span-3 ">
            <div className="col-xxl-3 col-md-6 mb5">
              <div className="bg-[#0EA4E7] rounded-[5px] pt2 pb-5 text-center">
                <h6 className="text-white mb-0 pt-[15px] text-[20px] fw-bold ">Total drivers
                </h6>
              </div>
              <div className="status_Card rounded-[5px]  text-center">
                <h1 className="mb1">{totalDriver}</h1>
              </div>
            </div>
          </div>
          {(role !== "Manager") &&

            <>
              <div onClick={() => router.push('/dashboard/carList')} className="w-full col-span-12 lg:col-span-3 ">

                <div className="col-xxl-3 col-md-6 mb5">
                  <div className="bg-[#11B780] rounded-[5px] pt2 pb-5 text-center">
                    <h6 className="text-white mb-0 pt-[15px] text-[20px] fw-bold ">Total drivers in practice
                    </h6>
                  </div>
                  <div className="status_Card rounded-[5px]  text-center">
                    <h1 className="mb1">
                      {inPracticeData?.length}
                    </h1>
                  </div>
                </div>
              </div>

              <div onClick={() => router.push('/dashboard/requestedList')} className="w-full col-span-12 lg:col-span-3 ">
                <div className="mb-5 col-xxl-3 col-md-6">
                  <div className="bg-[#6B747C] rounded-[5px] pb-5 text-center">
                    <h6 className="text-white mb-0 pt-[15px] text-[20px] fw-bold ">Total requests
                    </h6>
                  </div>
                  <div className="status_Card rounded-[5px]  text-center">
                    <h1 className="mb1">
                      {initialValue?.data?.length}
                    </h1>
                  </div>
                </div>
              </div>
            </>

          }


        </div>
      </div>
        :
        <h1>Hi ,{user?.fullName} </h1>
      }
    </>
  );
};

export default Stats;
