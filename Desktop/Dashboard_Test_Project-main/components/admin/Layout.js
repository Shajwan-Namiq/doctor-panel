import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "./headersection/Header";
import BarChart from "./chart/BarChart/Barchart";
import AreaChart from "./chart/AreaChart/AreaChart";
import PieChart from "./chart/PieChart/PieChart";
import DoughnutChart from "./chart/DoughnutChart/DoughnutChart";
import TotalInfo from "./headersection/TotalInfo";
import Activities from "./activities/Activities";
import Visitors from "./visitors/Visitors";








const Layout = ({ flyer, setFlyer }) => {
  return (
    <div className="bg-[#f7f3f3] ">
      <div
        className={` h-full ml-14 mt-14 mb-10  ${
          flyer ? "md:ml-20" : "md:ml-64"
        } "`}
      >
        {/* header  section*/}
        <div>
          <Header />
          <TotalInfo />
        </div>

        {/* chart section  1*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4  ">
          <AreaChart />
          <DoughnutChart />
        </div>

        {/* chart section  2*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
          <Activities />
          <BarChart />
        </div>

        {/*  Recent Activities and Visitor Location map */}
        <Visitors/>
         
      </div>
    </div>
  );
};

export default Layout;
