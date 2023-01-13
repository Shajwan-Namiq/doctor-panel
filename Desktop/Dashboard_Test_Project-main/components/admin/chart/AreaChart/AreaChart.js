import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { profit } from "../../../../constants";
import Calculate from "./Calculate";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monitor Profit",
    },
  },
};

const labels = profit.map((item) => item.year);

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Profit",
      data: profit.map((item) => item.sale),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const AreaChart = () => {
  
  return (
    <div className="bg-white p-0 lg:p-4 shadow-lg relative flex flex-col min-w-0 break-words  w-full  rounded">
      <Line options={options} data={data} />

      <div className="px-5 pt-4 text-normal  leading-relaxed mt-0 mb-4 text-gray-600">
        <Calculate />
      </div>
    </div>
  );
};

export default AreaChart;
