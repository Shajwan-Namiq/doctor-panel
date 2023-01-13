import React, { useState } from "react";

const Progressbar = ({ userGain, userLost }) => {
  
  return (
    <>
      {userGain - userLost >= 5000 ? (
        <div
          className={`overflow-hidden h-2 text-xs flex bg-[#e5e5e5] rounded`}
        >
          <div
            style={{ width: (userGain - userLost) / 100 }}
            className={`rounded-lg shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600`}
          ></div>
        </div>
      ) : (
        <div className="overflow-hidden h-2 text-xs flex bg-[#e5e5e5] rounded">
          <div
            style={{ width: (userGain - userLost) / 100 }}
            className="rounded-lg shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-600"
          ></div>
        </div>
      )}
    </>
  );
};
export default Progressbar;
