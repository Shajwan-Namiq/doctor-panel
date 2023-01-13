import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { salesData } from "../../../../constants";
import Evaluation from "./Evaluation";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Monitor Sales Data",
    },
  },

  legend: {
    display: true,
    position: "right",
    align: "start",
  },

  responsive: true,
};

export const data = {
  labels: salesData.map((item) => item.year),
  datasets: [
    {
      label: "Sales",
      data: salesData.map((item) => item.sale),
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const PieChart = () => {
  const [evaluation, setEvaluation] = useState(salesData);
  return (
    <>
      <div className="bg-white pb-2 lg:pb-0 lg:p-4 shadow-lg relative flex flex-col justify-center items-center min-w-0 break-words  w-full  rounded">
        <Pie options={options} data={data} />

        <div class="w-full ">
          <div class="lg:py-4 flex lg:flex-row flex-col justify-center items-center gap-x-10 gap-y-5 lg:divide-x  divide-solid divide-gray-400">
            {evaluation.map((item, index) => {
              return (
                <>
                  <Evaluation key={index} {...item} />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PieChart;
