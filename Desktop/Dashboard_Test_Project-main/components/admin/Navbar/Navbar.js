import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Navbar = ({ flyer, setFlyer }) => {
  return (
    <>
      <div className="fixed w-full flex items-center -mt-14  justify-between h-16 text-white z-10">
        <div className="flex items-center justify-start md:px-5  w-14 md:w-64 h-16 bg-slate-700 border-none">
          <Image
            className="ml-2 w-20 md:ml-0 mt-2 mr-2  overflow-hidden"
            width={100}
            height={100}
            src={"/logo.png"}
            alt="logo"
          />
          <span className="mt-2 hidden md:block">BAY ADMIN</span>
        </div>
        <div className="flex justify-between items-center h-16 bg-[#14213d]   header-right">
          <div className="flex items-center w-full max-w-xl mr-4 p-4 shadow-sm ">
            <button
              onClick={() => setFlyer(!flyer)}
              className="hidden lg:block outline-none focus:outline-none"
            >
              <svg
                width="25"
                height="25"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <ul className="flex justify-center items-center  mt-2 space-x-4">
            <li>
              <button
                className="p-2 text-[#fca311] align-middle rounded-full hover:text-white hover:bg-[#fca311] focus:outline-none "
                aria-label="Notifications"
                aria-haspopup="true"
              >
                <div className="relative flex items-cemter m ">
                  <div className="absolute left-3 bottom-4  bg-red-500 rounded-full">
                    <span className="text-sm text-white p-1">22</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                ></span>
              </button>
            </li>
            <li>
              <button
                className="p-2  text-[#fca311] align-middle rounded-full hover:text-white hover:bg-[#fca311] focus:outline-none "
                aria-label="Notifications"
                aria-haspopup="true"
              >
                <div className="relative flex items-cemter   ">
                  <div className="absolute left-3 bottom-4  bg-[#fca311] rounded-full">
                    <span className="text-sm text-white p-1">15</span>
                  </div>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                  </svg>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                ></span>
              </button>
            </li>
            <li>
              <div className="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700"></div>
            </li>
            <li>
              <Link href="#" className="flex items-center mr-4 hover:text-blue-100">
                <span className="inline-flex mr-1">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </span>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
