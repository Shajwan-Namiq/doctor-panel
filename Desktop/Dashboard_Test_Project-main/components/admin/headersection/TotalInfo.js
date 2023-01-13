import React, { useState } from "react";
import { informationHeader } from "../../../constants";
import CounterUp from "./CounterUp";

const TotalInfo = () => {
  return (
    <>
      <div class="w-full flex justify-center items-center">
        <div class="container flex flex-col  gap-4 mx-4">
          <div class="bg-white rounded-lg w-full h-auto py-4 flex flex-col lg:flex-row justify-between space-y-2 lg:space-y-2 divide-y lg:divide-x lg:divide-y-0 divide-solid divide-gray-400">
            {informationHeader.map((item, index) => {
              return (
                <>
                  <div
                    key={index}
                    class="py-2 lg:py-0 relative flex-1 flex flex-col gap-2 px-4"
                  >
                    <label class="text-gray-800 text-base font-semibold tracking-wider">
                      {item.title}
                    </label>
                    <CounterUp key={index} numberUser={item.numberUser} />
                    <div class="absolute bg-red-400 rounded-md font-semibold text-xs text-gray-100 p-2 right-4 bottom-0">
                      - {item.decreaseUser}%
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalInfo;
