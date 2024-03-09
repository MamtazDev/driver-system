// "use client"

// import React, { useEffect, useState } from 'react'
// import instance from '@/hooks/instance'

// const notification = () => {


  
//   const [data, setData] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [userDatas, setUserDatas] = useState<any>({})



//   useEffect(() => {

//     let userDataString;
//     if (typeof window !== undefined) {
//         userDataString = localStorage.getItem('user');
//     }
//     if (userDataString) {
//         const userData = JSON.parse(userDataString);
//         setUserDatas(userData?.user);
//     }
// }, []);


//   async function fetchData() {
  

//     setIsLoading(true)
//     try {
//         if (userDatas._id) {
//             const managerIds = userDatas._id;
//             const response = await instance.get(`api/authorization/checkAuth/65ec516dadf21eea2e8cf2de}`);
//             console.log(response.data);
//             setData(response.data);
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     } finally {
//         setIsLoading(false)
//     }
// }

// useEffect(() => {
//     fetchData();
// }, [userDatas]);


//   return (
//     <div>

//       <p>Your approval related Information</p>
//     </div>
//   )
// }

// export default notification

"use client"

import instance from '@/hooks/instance';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function notification() {
  const [user, setUser] = useState<any>([]);
  const [notification, setNotification] = useState<any>([]);

  // const router = useParams();
  // const id = router.slug


    // get the user 
    const [role, setRole] = useState<any>();
    // const [user, setUser] = useState<any>({});
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const userData: any = JSON.parse(localStorage.getItem('user') || 'null');
        console.log("userData", userData)
        const role = userData?.user?.role[0]
        setRole(role)
        setUser(userData?.user)
        fetchNotification(userData?.user);
      }
    }, [])


  const fetchUsers = async () => {
    try {
      const response = await instance.get(`/api/user/getUserById/${user._id}`);
      setUser(response?.data?.data)

    } catch (error: any) {
      toast.error('Error fetching users:', error.message);
    }
  };

  const fetchNotification = async (user:any) => {
    try {
      const response = await instance.get(`/api/notifications/getByUser/${user._id}`);
      setNotification(response?.data)
      console.log(response.data)

    } catch (error: any) {
      console.error('Error fetching users:', error.message);
    }
  };
  useEffect(() => {
  
  

    fetchUsers();
  }, []);

  console.log('dh notification', notification)

  return (
    <div>
         <div className="assigned-to mt-[20px] shadow-card p-[2rem]">
            {/* <h2>Notification </h2> */}
            <div className="table-responsive text-nowrap">
              <table className="table w-full mb-0 align-middle qd-table">
                <tbody>
                  <tr>
                    <th className="p-0 text-left">Notification status</th>

                    <th className="text-left">Updated status time</th>
                  </tr>

                  {notification?.map((noti: any) => (

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
          </div> 

    </div>
  )
}

export default notification