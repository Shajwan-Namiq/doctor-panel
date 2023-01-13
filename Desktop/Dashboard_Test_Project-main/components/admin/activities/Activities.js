import React, { useEffect, useState } from "react";
import { activity } from "../../../constants";
import Link from "next/link";
import Loading from "./Loading";

const Activities = () => {
  const [dataActivity, setDataActivity] = useState(activity);
  const [loading, setLoading] = useState(true);

  const removeActivity = (id) => {
    const removeItem = dataActivity.filter((item) => item.id !== id);
    setDataActivity(removeItem);
  };

  const fetchActivity = async () => {
    try {
      setLoading(false);
      setDataActivity(activity);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (dataActivity.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded flex flex-col  justify-center items-center">
        <div className="flex space-x-2 items-center m-5  ">
          <p className="font-bold text-xl text-[#588157]"> No Activity left</p>
          <div>
            {" "}
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="#588157"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>
        <button
          className="m-5 px-10 py-3 bg-[#fca311] rounded-md font-bold text-white"
          onClick={fetchActivity}
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-2 bg-white shadow-lg rounded">
      <h2 className=" flex justify-center items-center py-3 text-sm font-bold text-gray-600">
        Recent Activities
      </h2>

      {dataActivity.map((item, index) => {
        return (
          <>
            <ol key={index} class="relative border-l border-[#fca311]">
              <li class="mb-3 ml-7">
                <span class="flex absolute -left-3 justify-center items-center w-6 h-6 text-gray-200 bg-[#fca311] rounded-full p-3">
                  0{index + 1}
                </span>
                <div class=" p-4 bg-[#e5e5e5] rounded-lg border border-gray-200 shadow-sm ">
                  <div class="float-right items-center mb-3 sm:flex">
                    <button
                      onClick={() => removeActivity(item.id)}
                      class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0 hover:bg-[#dcd6d6] rounded-full p-0"
                    >
                      <svg
                        class="w-6 h-6"
                        fill="#fca311"
                        stroke="#fca311"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div class="items-center mb-3 sm:flex">
                    <div class="text-sm font-semibold text-[#fca311] ">
                      {item.title}{" "}
                      <Link
                        href="#"
                        class="font-semibold text-gray-600   hover:underline"
                      >
                        More..
                      </Link>
                    </div>
                  </div>
                  <div class="p-3 text-xs italic font-normal text-gray-500 bg-gray-50 rounded-lg border border-gray-200 ">
                    {item.information}
                  </div>
                </div>
              </li>
            </ol>
          </>
        );
      })}
    </div>
  );
};

export default Activities;
