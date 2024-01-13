import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import DriverDetails from "@/components/DriverDetails/DriverDetails";
import React from "react";

const driverDetails = () => {
  return (
    <div className="p-[50px]">
      {/* <BreadCrumb title1="drivers" title2="driver details"  /> */}
      <DriverDetails  />
    </div>
  );
};

export default driverDetails;
