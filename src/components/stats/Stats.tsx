"use client";
import Image from "next/image";
import { useState } from "react";
import ArrowDown from "../../../public/assets/ArrowDown.svg";
import ArrowUp from "../../../public/assets/ArrowUp.svg";
import Toggle from "../../../public/assets/Chevron.svg";
import Card from "../card/Card";
import "./stats.scss";

const Stats = () => {
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  const toggleStats = () => {
    setIsStatsOpen(!isStatsOpen);
  };

  return (
    <div className={`stats ${isStatsOpen ? "open" : ""}`}>
      <Image
        src={Toggle}
        className={`stats-toggle ${isStatsOpen ? "rotate" : ""}`}
        alt="Toggle"
        onClick={toggleStats}
      />
      <div className="heading">
        <h2>Todays Statistics</h2>
        <h5>Tue, 14 Nov, 2022, 11.30 AM </h5>
      </div>
      <div className="card_wrapper">

        <Card
          title="Income"
          price={9460.0}
          trend={1.5}
          icon={ArrowDown}
          yesterdayPrice={9940}
          expenses={25658.0}
        />

        <Card
          title="Expenses"
          price={5660.0}
          trend={2.5}
          icon={ArrowUp}
          yesterdayPrice={5240}
          expenses={22658.0}
        />
      </div>
    </div>
    // <div className="container">
    //   <div className="grid grid-cols-12">
    //     <div className="col-span-4">
    //       <div className="">

    //       </div>

    //     </div>



    //   </div>
    // </div>
  );
};

export default Stats;
