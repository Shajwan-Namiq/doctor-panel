import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { userData } from "../../../../constants";
import Tables from "./Tables";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Monitor User Data",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = userData.map((item) => item.year);

export const data = {
  labels,
  datasets: [
    {
      label: "UserGain",
      data: userData.map((item) => item.userGain),
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    },
    {
      label: "UserLost",
      data: userData.map((item) => item.userLost),
      backgroundColor: "rgba(54, 162, 235, 0.2)",
    },
    {
      label: "View",
      data: userData.map((item) => item.view),
      backgroundColor: "rgba(255, 206, 86, 0.2)",
    },
  ],
};

const Barchart = () => {
 
  return (
    <>
      <div className="bg-white p-0 lg:p-4 shadow-lg relative flex flex-col min-w-0 break-words  w-full  rounded">
        {/** Bar Chart**/}
        <Bar options={options} data={data} />

        {/** Table Data**/}

        <Tables />
      </div>
    </>
  );
};

export default Barchart;
