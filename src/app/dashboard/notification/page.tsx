"use client"

import React, { useEffect, useState } from 'react'
import instance from '@/hooks/instance'

const notification = () => {


  
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [userDatas, setUserDatas] = useState<any>({})



  useEffect(() => {

    let userDataString;
    if (typeof window !== undefined) {
        userDataString = localStorage.getItem('user');
    }
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUserDatas(userData?.user);
    }
}, []);


  async function fetchData() {
  

    setIsLoading(true)
    try {
        if (userDatas._id) {
            const managerIds = userDatas._id;
            const response = await instance.get(`/api/authorization/checkAuth/65ec516dadf21eea2e8cf2de}`);
            setData(response.data.data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setIsLoading(false)
    }
}

useEffect(() => {
    fetchData();
}, [userDatas]);


  return (
    <div>

      <p>Your approval related Information</p>
    </div>
  )
}

export default notification