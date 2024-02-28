import DriverDetails from "@/components/DriverDetails/DriverDetails";
import RequireAuth from "@/hooks/RequireAuth";
import React from "react";

const driverDetails = () => {
  return (
    <div className="p-[50px]">
      <DriverDetails  />
    </div>
  );
};

export default RequireAuth(driverDetails);
