import React, { useState } from "react";
import { profit } from "../../../../constants";

const Calculate = () => {
  const sale = profit.map((item) => item.sale);
   
  
  const FindMAxYear = () => {
    return (
      <>
        {profit.map((item ,index) => (
          <div key={index}>{Math.max.apply(null, sale) === item.sale && item.year}</div>
        ))}
      </>
    );
  };

  const FindMinYear = () => {
    return (
      <>
        {profit.map((item,index) => (
          <div key={index}>
            {Math.min.apply(null, sale) === item.sale && item.year}
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <ul className="pb-5 text-sm lg:text-lg py-2 font-medium lg:font-semibold">
        <h2>Calculate the results : </h2>
        <li className="flex gap-1">
          1. High Profit :{" "}
          <span className="text-green-700 font-semibold">
            {" "}
            {Math.max.apply(null, sale)}
          </span>
          products were sailed in <FindMAxYear />
        </li>

        <li className="flex gap-1">
          2. Low Profit :{" "}
          <span className="text-red-700 font-semibold">
            {" "}
            {Math.min.apply(null, sale)}
          </span>
          products were sailed in <FindMinYear />
        </li>
      </ul>

      <div className="flex flex-col lg:flex-row justify-center items-center shadow bg-[#e5e5e576] rounded-lg divide-y-2 divide-x-0  lg:divide-x-2 lg:divide-y-0">
        {profit.map((item, index) => (
          <div key={index}>
            <div className="stat place-items-center">
              <div className="stat-title">{item.year}</div>
              <div className="stat-value text-[#14213dba]">{item.sale}</div>
              <div className="stat-desc text-secondary">
                {item.sale > 100 ? (
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="#344e41"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="4"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="#c1121f"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="4"
                      d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                    ></path>
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculate;
