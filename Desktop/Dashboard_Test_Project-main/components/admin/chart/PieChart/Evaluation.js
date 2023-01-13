import React from "react";

const Evaluation = ({ year, sale }) => {
  return (
    <div className="lg:p-4 pt-2 flex flex-col items-center justify-center">
    
      <label class="text-gray-800 text-base font-bold">{sale}k</label>
      <label class="text-gray-400 text-base font-semibold tracking-wider">
        {year}
      </label>
      </div>
  );
};

export default Evaluation;
