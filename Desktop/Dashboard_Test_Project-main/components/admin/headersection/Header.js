import React from "react";
import { header } from "../../../constants";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <div class=" bg-gray-100 flex items-center justify-center  ">
        <div class="max-w-7xl w-full mx-auto py-8 px-4">
          <div class="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
          
          
          {header.map((item, index) => {
            return (
              <>
                <div key={index} class="w-full lg:w-1/5 ">
                  <div
                    style={{ borderColor: item.color }}
                    class="widget w-full p-4 rounded-lg bg-white border-l-4 "
                  >
                    <div class="flex items-center group">
                      <div
                        style={{ backgroundColor: item.color }}
                        class="icon w-14 p-3.5  text-white rounded-full mr-3 transition-all duration-300 transform group-hover:rotate-12"
                      >
                        <Image
                          src={item.icon}
                          alt="icon"
                          width={30}
                          height={30}
                        />
                      </div>
                      <div class="flex flex-col justify-center">
                        <div class="text-lg">${item.price}</div>
                        <div class="text-sm text-gray-400">{item.title}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );})}
           

           





          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
