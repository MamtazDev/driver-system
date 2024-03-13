"use client";
import { useDriverContext } from "@/hooks/driverContext";
import instance from "@/hooks/instance";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AuthorizationRequest = () => {
  const navigate = useRouter();

  const driverContext = useDriverContext();

  const [driverDataList, setDriverDataList] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [authorizationState, setAuthorizationState] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (driverContext && driverContext.data) {
      const driverData = driverContext.data.filter((data: any) =>
        data.role.includes("Driver")
      );
      setDriverDataList(driverData);
    }
  }, [driverContext]);

  const handleDriverSelect = (selectedValue: string) => {
    const selectedDriverData = driverDataList.find(
      (data: any) => data.fullName === selectedValue
    );
    setSelectedDriver(selectedDriverData);
  };
  const router = useParams();

  const id = router.slug;
  const selectedDriverId = selectedDriver?._id;
  //  authorization state
  const data = {
    user: selectedDriverId,
    trucks: id,
    authorizationState: authorizationState,
  };

  const [truck, setTruck] = useState<any>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instance.get(`/api/truck/getTruckById/${id}`);
        setTruck(response.data.data);
      } catch (error: any) {
        console.error("Error fetching users:", error.message);
      }
    };
    fetchUsers();
  }, [id]);

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await instance.post("/api/new-auth", data);

      if (response.data.success) {
        Swal.fire({
          text: "Request added successfully",
          icon: "success"
        });
        setIsLoading(false);

      } else {
        toast.error("Failed to add a new request");
        Swal.fire({
          title: "error",
          text: "Failed to add a new request",
          icon: "error"
        });
      }
    } catch (error: any) {
      setIsLoading(false)
      Swal.fire({
        title: "error",
        text: `Driver already assigned for this truck`,
        icon: "error"
      });
    }
  };

  return (
    <>
      <div className="container m-auto">
        <div className="shadow-card p-[30px]  w-[70%] m-auto">
          <h1 className="text-center mb-[20px]">Request For Authorization</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-5 add_driver">
              <div className="col-span-6">
                <label htmlFor="">Truck</label>
                <input
                  type="text"
                  required
                  placeholder="Enter company name"
                  value={truck?.company}
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="">Model</label>
                <input
                  type="text"
                  required
                  placeholder="Enter Truck model"
                  value={truck?.model}
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="">License Plate </label>
                <input
                  type="text"
                  required
                  placeholder="Enter license plate number"
                  value={truck?.licensePlate}
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="">VIN Number </label>
                <input
                  type="number"
                  required
                  placeholder="Enter VIN Number"
                  value={truck?.vinNumber}
                />
              </div>
              <div className="col-span-6">
                <label htmlFor="">Select Driver </label>
                <select
                  onChange={(e) => handleDriverSelect(e.target.value)}
                  id="countries"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                >
                  <option selected>Choose</option>
                  {driverDataList.map((data: any) => (
                    <option key={data._id} value={data?.fullName}>
                      {data?.fullName} - {data?.email}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6">
                <label htmlFor="">Authorization State</label>

                <select
                  id="countries"
                  onChange={(e) => setAuthorizationState(e.target.value)}
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                >
                  <option selected>Choose</option>
                  <option value="Requested">Requested</option>
                  {/* <option value="Practice">Practice</option> */}
                </select>
              </div>
            </div>
            <div className="text-center mt-[15px]">
              <button type="submit" className="common_button">
                {isLoading ? <>Loading...</> : <>Send Request</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthorizationRequest;

const useSecondImageUpload = () => {
  const imageFileInputRef2 = useRef<HTMLInputElement>(null);
  const [selectedImage2, setSelectedImage2] = useState<string | null>(null);
  const [selectedFiles2, setSelectedFiles2] = useState<FileList | null>(null);

  const handleImageClick2 = () => {
    imageFileInputRef2.current?.click();
  };

  const handleImageFileChange2 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles2(files);
      const selectedFile = files[0];
      const imageUrl: string = URL.createObjectURL(selectedFile);
      setSelectedImage2(imageUrl);
    }
  };

  return {
    imageFileInputRef2,
    selectedImage2,
    handleImageClick2,
    handleImageFileChange2,
    selectedFiles2,
  };
};
