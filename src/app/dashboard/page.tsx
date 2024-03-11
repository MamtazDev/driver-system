'use client'
import Stats from "@/components/stats/Stats";
import ProtectedRoute from "@/routes/ProtectedRoute";
import Head from "next/head";



const Dashboard = () => {

  return (
    <ProtectedRoute>
      <>
        <Head>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css" rel="stylesheet" />
          <script async src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js" />
        </Head>
        <div className="dashboard">
          <Stats />
        </div>
      </>
    </ProtectedRoute>

  )
}
export default Dashboard