import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Navbar from "./Navbar";

const Admin = () => {
  const [flyer, setFlyer] = useState(false);

  return (
    <div>
      {/**navbar */}
      
      <div class="fixed w-full flex items-center    justify-between h-16 text-white z-10">
        <div class="flex items-center justify-start md:px-5  w-14 md:w-64 h-16 bg-slate-700 border-none">
          <Image
            className="ml-2 w-20 md:ml-0 mt-2 mr-2  overflow-hidden"
            width={100}
            height={100}
            src={"/logo.png"}
          />
          <span class="mt-2 hidden md:block">BAY ADMIN</span>
        </div>
        <div class="flex justify-between items-center h-16 bg-[#14213d]   header-right">
          <div class="flex items-center w-full max-w-xl mr-4 p-4 shadow-sm ">
            <button
              onClick={() => setFlyer(!flyer)}
              class="hidden lg:block outline-none focus:outline-none"
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
          <ul class="flex justify-center items-center  mt-2 space-x-4">
            <li>
              <button
                class="p-2 text-[#fca311] align-middle rounded-full hover:text-white hover:bg-[#fca311] focus:outline-none "
                aria-label="Notifications"
                aria-haspopup="true"
              >
                <div class="relative flex items-cemter m ">
                  <div className="absolute left-3 bottom-4  bg-red-500 rounded-full">
                    <span className="text-sm text-white p-1">22</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>

                <span
                  aria-hidden="true"
                  class="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                ></span>
              </button>
            </li>
            <li>
              <button
                class="p-2  text-[#fca311] align-middle rounded-full hover:text-white hover:bg-[#fca311] focus:outline-none "
                aria-label="Notifications"
                aria-haspopup="true"
              >
                <div class="relative flex items-cemter   ">
                  <div className="absolute left-3 bottom-4  bg-[#fca311] rounded-full">
                    <span className="text-sm text-white p-1">15</span>
                  </div>
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                  </svg>
                </div>

                <span
                  aria-hidden="true"
                  class="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                ></span>
              </button>
            </li>
            <li>
              <div class="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700"></div>
            </li>
            <li>
              <Link href="#" class="flex items-center mr-4 hover:text-blue-100">
                <span class="inline-flex mr-1">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
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

      {/**sidebar */}

      <div
        class={`mt-2 fixed flex flex-col top-14 left-0 w-14 hover:w-64 
        ${flyer ? "md:w-16" : "md:w-64"}
        
        bg-[#14213d]  h-full text-white transition-all duration-300 border-none z-10 sidebar`}
      >
        <div class="mt-5 overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
          <ul class="flex flex-col py-4 space-y-1">
            <li class="px-7 pb-5  block">
              <div class="flex flex-row items-center h-8">
                <div class="text-sm font-light tracking-wide text-white uppercase">
                  <div class="sticky inset-x-0 bottom-0 ">
                    <Link
                      href="#"
                      class="flex items-center justify-center "
                    >
                      <Image
                      width={100}
                      height={100}
                        alt="admin-img"
                        src="/avater.png"
                        class="object-cover w-10 h-10 rounded-full"
                      />

                      <div class={` ${flyer ? "hidden" : "block"} `}>
                        <p class="text-xs ml-4">
                          <strong class="  font-medium">Welcome</strong>

                          <span class="  font-medium"> John Doi </span>
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <Link
                href="/"
                class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </span>
                <span
                  class={` ${flyer ? "hidden" : "block"} 
                  first-letter:ml-2 text-sm tracking-wide truncate`}
                >
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    ></path>
                  </svg>
                </span>
                <span
                  class={` ${
                    flyer ? "hidden" : "block"
                  } ml-2 text-sm tracking-wide truncate`}
                >
                  Forms
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 h-5 feather feather-table"
                  >
                    <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path>
                  </svg>
                </span>
                <span
                  class={` ${
                    flyer ? "hidden" : "block"
                  } ml-2 text-sm tracking-wide truncate`}
                >
                  Tables
                </span>
              </Link>
            </li>

            <li class="px-5 hidden md:block">
              <div class="flex flex-row items-center mt-5 h-8">
                <div class="text-sm font-light tracking-wide text-gray-400 uppercase">
                  {flyer ? "" : "Setting"}
                </div>
              </div>
            </li>
            <li>
              <Link
                href="/"
                class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </span>
                <span
                  class={`${flyer ? "hidden" : "block"}
                  ml-2 text-sm tracking-wide truncate`}
                >
                  Profile
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </span>
                <span
                  class={`${flyer ? "hidden" : "block"} 
                  ml-2 text-sm tracking-wide truncate`}
                >
                  Settings
                </span>
              </Link>
            </li>
          </ul>
          <div
            class={`${flyer ? "hidden" : "block"}
          mb-14 px-5 py-3`}
          >
            <div class=" flex flex-col space-y-2 lg:space-y-0 lg:flex-row items-center lg:space-x-4 lg:p-5">
              <Link href="/">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  id="meteor-icon-kit__solid-facebook"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.38823 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9165 4.6875 14.6576 4.6875C15.9705 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.3399 7.875 13.875 8.80001 13.875 9.74899V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
                    fill="#ffff"
                  />
                </svg>
              </Link>
              <Link href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 64 64"
                >
                  <path
                    fill="#FFFFFF"
                    d="M18.7030057,51.2845595 C19.2586198,51.1136013 19.8611237,51.1928464 20.3536351,51.5016608 C23.9810874,53.7761448 28.1745492,55 32.5535593,55 C45.2561085,55 55.5535593,44.7025492 55.5535593,32 C55.5535593,19.2974508 45.2561085,9 32.5535593,9 C19.85101,9 9.55355927,19.2974508 9.55355927,32 C9.55355927,36.5076583 10.8506294,40.8178887 13.2524453,44.5140855 C13.5681791,44.9999738 13.6576571,45.5989157 13.4977166,46.1558667 C13.1921903,47.2197824 12.7717996,48.7185277 12.2659598,50.5426743 C12.2441577,50.6213038 12.2441577,50.6213038 12.2223586,50.6999506 C11.9712431,51.6060074 11.7094634,52.5546244 11.4444923,53.5179479 L18.7030057,51.2845595 Z M9.14173097,58.411558 C7.63505952,58.8751492 6.20928034,57.4946517 6.62402005,55.9738076 C6.65115195,55.8743156 6.65115195,55.8743156 6.77299708,55.4283198 C6.89148747,54.9948276 7.02369726,54.5118345 7.16631026,53.9917031 C7.57381207,52.5054816 7.98309308,51.0192014 8.3676657,49.6316144 C8.38953838,49.552702 8.38953838,49.552702 8.41141577,49.4738011 C8.79689067,48.0837111 9.1332296,46.8807847 9.40827464,45.9104429 C6.90192269,41.7491618 5.55355927,36.9723196 5.55355927,32 C5.55355927,17.0883118 17.641871,5 32.5535593,5 C47.4652475,5 59.5535593,17.0883118 59.5535593,32 C59.5535593,46.9116882 47.4652475,59 32.5535593,59 C27.7341794,59 23.0972796,57.7334862 19.0244988,55.3707064 L9.14173097,58.411558 Z M36.9726783,36.9191202 C37.2385391,36.6532595 37.5272649,36.3324529 37.8296163,35.969631 C38.2072567,35.5164625 38.584329,35.0246288 38.9400127,34.5321435 C39.1528359,34.237465 39.3088024,34.0115825 39.389458,33.8905991 C39.4625142,33.7810146 39.5462163,33.6789145 39.6393452,33.5857856 C39.8112624,33.4138684 40.0375297,33.2441679 40.3257982,33.1000337 C41.2221866,32.6518395 42.3293754,32.6518395 43.447986,33.2111448 C43.8192371,33.3967704 48.1241584,36.1957484 50.0248451,37.2516854 C50.7643957,37.6625469 51.1654313,38.4942939 51.026347,39.3287984 C50.5747005,42.0386742 49.7901645,44.0918208 48.0302724,45.8517129 C45.5935489,48.2884362 41.864763,49.2440546 36.7568781,48.4778719 C27.3021901,47.0596686 19.1699627,38.7740032 15.6868681,29.7179582 C14.1718165,25.7788247 14.9138901,21.9035516 17.0127846,18.4053938 C17.7907087,17.1088536 18.5756435,16.1494888 19.1393456,15.5857865 C19.4185467,15.3065854 19.7741447,15.1162751 20.161327,15.0388386 C20.3339387,15.0043163 20.6052602,14.9564361 20.9373833,14.9089899 C21.2862018,14.8591587 21.6309397,14.8208545 21.9637311,14.7986684 C23.3247183,14.7079359 24.1855731,14.8035864 24.9677731,15.5857867 C25.9562071,16.5742212 29.0535589,22.5306669 29.0535593,23.9999995 C29.0535597,25.5436823 28.3764489,26.8533942 26.6933946,28.6636871 C27.1702662,29.9460797 28.8385162,31.9006069 31.2612701,33.892649 C32.5184511,34.9263313 33.8877778,35.8994273 35.0845773,36.6268936 C35.6186937,36.9515526 36.0901515,37.2093708 36.4503385,37.3768046 C36.6084153,37.2665143 36.7815674,37.1102312 36.9726783,36.9191202 Z M20.4427564,20.4633767 C18.9202518,23.0008846 18.4112965,25.6587619 19.4202505,28.2820418 C22.4347695,36.1197903 29.5302273,43.3491245 37.3502399,44.5221264 C41.2868816,45.1126227 43.7416092,44.4835217 45.2018454,43.0232856 C45.9823914,42.2427397 46.4696984,41.2757859 46.8021857,40.0040639 C45.0839299,38.9742942 42.9405887,37.6008946 42.0612797,37.0412346 C41.6910587,37.5475536 41.3013054,38.0518037 40.9025019,38.5303681 C40.5277697,38.9800469 40.1602452,39.3884075 39.8011057,39.7475471 C38.6858818,40.8627712 37.7300386,41.5 36.5535593,41.5 C35.083097,41.5 31.7547258,39.4768724 28.7208485,36.982351 C24.9306055,33.8659289 22.5535594,30.8255211 22.5535593,28.0000001 C22.5535592,27.4695671 22.7642729,26.9608593 23.1393456,26.5857865 C24.6727398,25.0523921 25.0535594,24.417693 25.0535593,24.0000005 C24.9679502,23.8913848 24.8712406,23.6470766 24.7431997,23.3529286 C24.4896164,22.7703725 24.1296068,22.0294004 23.7166255,21.2352055 C23.3346505,20.5006383 22.9281296,19.7609683 22.5846277,19.1731985 C22.5011228,19.0303122 22.4230511,18.8993611 22.352002,18.7828685 C22.3129433,18.7846807 22.2721421,18.7869867 22.2298071,18.789809 C22.0281803,18.8032508 21.8059986,18.8270874 21.575738,18.8586201 C21.1616617,19.3644187 20.7895959,19.8853109 20.4427564,20.4633767 Z"
                  ></path>
                </svg>
              </Link>
              <Link href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 64 64"
                >
                  <g fill="none" fill-rule="evenodd">
                    <circle cx="32" cy="32" r="30" fill="#FFFFFF"></circle>
                    <path
                      fill="#000000"
                      d="M29.4389584 23.2414037C30.1985219 23.3993482 30.8464387 23.6631872 31.3936905 24.0248441 31.9354515 24.3873984 32.3573295 24.8684111 32.6593246 25.4741639 32.955829 26.0718401 33.1022508 26.819384 33.1022508 27.7033345 33.1022508 28.6599753 32.8807877 29.4595691 32.4396918 30.0985262 31.9931051 30.7356885 31.336952 31.2579821 30.4629964 31.6645096 31.6535893 32.0010389 32.5376114 32.5924332 33.1223838 33.4342054 33.7117319 34.281362 34 35.2954371 34 36.4845076 34 37.4474303 33.8114818 38.2775361 33.4353606 38.9748249 33.056494 39.6810879 32.5394417 40.2536366 31.9034217 40.6960605 31.2600805 41.1411767 30.5243106 41.4678345 29.6997723 41.6805211 28.8825552 41.8932077 28.0351386 41.9999997 27.1666738 41.9999997L18 42 18 23.0000003 26.9095203 23C27.837469 23 28.673904 23.0780748 29.4389584 23.2414037zM28.0423161 29.8391109C28.5328294 29.4992177 28.7716801 28.9390877 28.7716801 28.1699928 28.7716801 27.7425251 28.6920632 27.3896258 28.5328294 27.1147633 28.3681048 26.8407678 28.1512174 26.6266004 27.8757612 26.4765965 27.6030504 26.3205232 27.2937342 26.2130059 26.937746 26.1540449 26.5845032 26.0890143 26.2175334 26.0638692 25.8395819 26.0638692L21.7682102 26.0638692 21.7682102 30.353286 26.1644554 30.353286C26.9212735 30.353286 27.5472271 30.1833394 28.0423161 29.8391109zM27.3605392 38.8063281C27.7430664 38.7202602 28.0798367 38.5831191 28.3644442 38.3816635 28.6508821 38.1868286 28.8869873 37.9210586 29.0590331 37.5824619 29.2319939 37.2467026 29.3143562 36.8106884 29.3143562 36.2838774 29.3143562 35.2529545 29.0315789 34.5199589 28.4742607 34.0744867 27.914197 33.6356351 27.1674454 33.4171551 26.248648 33.4171551L21.7682102 33.4171551 21.7682102 38.9321196 26.1644555 38.9321196C26.5845032 38.9321196 26.9853331 38.8933418 27.3605392 38.8063281zM39.4726441 38.723453C40.0081732 39.2189975 40.7821867 39.4683787 41.7845003 39.4683787 42.5050458 39.4683787 43.1279909 39.2954208 43.6499409 38.9511139 44.1676473 38.6076114 44.4833634 38.2391708 44.6047273 37.8578589L47.7525522 37.8578589C47.2458788 39.3420792 46.4795036 40.4023515 45.4322089 41.0402847 44.3976447 41.6806312 43.1364779 42 41.6639851 42 40.6396053 42 39.7179181 41.8431312 38.8895878 41.5334158 38.0621062 41.2196782 37.3695678 40.7804455 36.7882089 40.2068688 36.2204293 39.6316832 35.7816518 38.9511139 35.4676332 38.1522896 35.1570093 37.3574876 35 36.4766089 35 35.5233292 35 34.6014233 35.1612528 33.7406559 35.4803637 32.9434406 35.8045667 32.1446163 36.2535285 31.455198 36.8425257 30.877599 37.4349176 30.2959777 38.1350943 29.8374381 38.9515428 29.5019802 39.7671426 29.1681312 40.6684611 29 41.6639851 29 42.7647477 29 43.7297186 29.2011139 44.5563515 29.6097772 45.3787409 30.0128094 46.055154 30.5598391 46.5847422 31.2444307 47.1151792 31.9274134 47.4928502 32.7077351 47.7279399 33.5845916 47.9621808 34.4598391 48.0445046 35.372896 47.9774574 36.330198L38.5891483 36.330198C38.5891483 37.305198 38.9362663 38.2279084 39.4726441 38.723453M41.557049 31.2679693C40.9867232 31.2679693 40.5139978 31.3665315 40.1363267 31.5653852 39.7654453 31.7625097 39.4633084 32.0071862 39.2299161 32.2959563 38.9999187 32.5890493 38.8429094 32.8985694 38.7512499 33.2297039 38.6595904 33.5521927 38.6044249 33.8444211 38.5891483 34.1029309L44.4027369 34.1029309C44.3161696 33.1743707 44.0055458 32.4887579 43.5786501 32.005457 43.1543006 31.5273436 42.4354525 31.2679693 41.557049 31.2679693z"
                    ></path>
                    <polygon
                      fill="#000000"
                      points="36 25 47 25 47 27 36 27"
                    ></polygon>
                  </g>
                </svg>
              </Link>
              <Link href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 64 64"
                >
                  <path
                    fill="#FFFFFF"
                    fill-rule="evenodd"
                    d="M46,29.5039915 L46,22.992017 C46,21.9001762 45.1081436,21 44.007983,21 L36.992017,21 C35.9001762,21 35,21.8918564 35,22.992017 L35,30.007983 C35,31.0998238 35.8918564,32 36.992017,32 L42,32 L42,35 L39.0300911,35 L39.0300911,39 L42.5150455,39 C44.4441231,39 46,37.4418734 46,35.5168536 L46,29.5039915 Z M29,29.5039915 L29,22.992017 C29,21.9001762 28.1081436,21 27.007983,21 L19.992017,21 C18.9001762,21 18,21.8918564 18,22.992017 L18,30.007983 C18,31.0998238 18.8918564,32 19.992017,32 L25,32 L25,35 L22.0300911,35 L22.0300911,39 L25.5150455,39 C27.4441231,39 29,37.4418734 29,35.5168536 L29,29.5039915 Z M31.1541433,61.9765988 C30.8891091,62.0938947 31.4349474,52.9952952 31.1541433,52.9859595 C17.7386296,52.5399447 7,41.524043 7,28 C7,14.1928813 18.1928813,3 32,3 C45.8071187,3 57,14.1928813 57,28 C57,41.8071187 47.4512535,54.764004 31.1541433,61.9765988 Z"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/**content */}
    
    </div>
  );
};

export default Admin;
