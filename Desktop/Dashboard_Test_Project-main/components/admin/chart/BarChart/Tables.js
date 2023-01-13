import React from "react";
import { userData } from "../../../../constants";
import Progressbar from "./Progressbar";
import { useState } from "react";


const Tables = () => {
    const [dataUser, setDataUser] = useState(userData);
  return (
    <>
      <div className="grid grid-cols-1 mt-5 ">
        <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-word w-full shadow-lg rounded">
          <div className="rounded-t mb-0 px-0 border-0">
            <div className="flex flex-wrap items-center px-4 py-2">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-gray-900 ">
                  Monitor User
                </h3>
              </div>
              <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-blue-500 dark:bg-gray-100 text-gray-900 active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  See all
                </button>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 bg-gray-100   text-gray-900   align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Year
                    </th>
                    <th className="px-4 bg-gray-100   text-gray-900  align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      User Gain
                    </th>
                    <th className="px-4 bg-gray-100   text-gray-900  align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      User Lost
                    </th>
                    <th className="px-4 bg-gray-100   text-gray-900   align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                      Results
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataUser.map((item, index) => {
                    return (
                      <tr key={index} className="text-gray-700 ">
                        <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          {item.year}
                        </th>
                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.userGain}
                        </td>
                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {item.userLost}
                        </td>
                        <td className=" border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <div className="flex items-center">
                            <span className="mr-2">
                              {(item.userGain - item.userLost) / 100} %
                            </span>

                            <div className="relative w-[100px]">
                              <Progressbar
                                key={item.id}
                                {...item}
                                
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tables;
