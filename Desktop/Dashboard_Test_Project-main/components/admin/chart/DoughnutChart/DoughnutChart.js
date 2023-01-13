import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { rainfull } from "../../../../constants";

ChartJS.register(ArcElement, Tooltip, Legend);

export const option = {
  plugins: {
    title: {
      display: true,
      text: "Average Rainfall per month",
    },
    legend: {
      display: true,
      position: "top",
    },
  },
  responsive: true,
};

const state = {
  labels: rainfull.map((item) => item.month),
  datasets: [
    {
      label: "Rainfall",
      backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00", "#00A6B4", "#6800B4"],
      hoverBackgroundColor: [
        "#501800",
        "#4B5000",
        "#175000",
        "#003350",
        "#35014F",
      ],
      data: rainfull.map((item) => item.data),
    },
  ],
};

const DoughnutChart = () => {
  return (
    <div className="bg-white p-0 lg:p-4 shadow-lg relative flex flex-col justify-center items-center min-w-0 break-words  w-full  rounded">
      <Doughnut data={state} options={option} />

      
     
    </div>
  );
};

export default DoughnutChart;
