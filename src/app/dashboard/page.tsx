import Stats from "@/components/stats/Stats";
import Head from "next/head";


export default function Home() {
  return (
    <>
    <Head>
        {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"/>
      </Head>
    <div className="dashboard">
      <Stats />
    </div>
    </>
  )
}
