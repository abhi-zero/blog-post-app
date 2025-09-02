import React from 'react'
import { FaHeart } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import SecondaryBtn from "../buttons/SecondaryBtn";

export default function PostComponentPh() {
  return (
    <div className="">
      <div>
        {/* main */}
        <div>
          <div className='flex justify-center-safe items-center-safe'>
            <h1 className="bg-black dark:bg-white mt-[50px] w-[250px] h-[50px] transition-all animate-pulse duration-200 ease-in-out">
            </h1>
          </div>
          <div className="flex justify-center items-center-safe gap-5">
            <div className="flex justify-center items-center-safe gap-2 h-[34px]">
              <h3 className="mt-[10px] h-[28px] text-center transition-all animate-pulse duration-300 ease-in-out">
                <span className='bg-[#3d3d3d] dark:bg-[#888686] w-[150px] text-[#3d3d3d] dark:text-[#888686]'>Abhi</span > - <span className='bg-[#3d3d3d] dark:bg-[#888686] w-[200px] text-[#3d3d3d] dark:text-[#888686]'> 1 july</span>
              </h3>
              <div className="mt-[10px] text-[#4b4b4b] dark:text-[#acacac] text-sm text-center transition-all duration-300 ease-in-out">
                <FaPencilAlt />
              </div>
            </div>
            <div className="mt-2 text-xl" id="like">
             <SecondaryBtn
              icon={<FaHeart />}
              textColorLight= {'text-red-600'}
              textColorDark= {'dark:text-red-600'}
            />
           </div>
          </div>
          
        </div>
        <div>
          {/* body */}
          <div className="first-letter:float-left bg-black dark:bg-white mt-[50px] mr-3 md:px-[100px] h-[24px] first-letter:font-bold first-letter:text-5xl animate-pulse"></div>
            <div className="first-letter:float-left bg-black dark:bg-white mt-[50px] mr-3 md:px-[100px] h-[24px] first-letter:font-bold first-letter:text-5xl animate-pulse"></div>

          <div className="first-letter:float-left bg-black dark:bg-white mt-[50px] mr-3 md:px-[100px] h-[24px] first-letter:font-bold first-letter:text-5xl animate-pulse"></div>
          <div className="first-letter:float-left bg-black dark:bg-white mt-[50px] mr-3 md:px-[100px] h-[24px] first-letter:font-bold first-letter:text-5xl animate-pulse"></div>
          <div className="first-letter:float-left bg-black dark:bg-white mt-[50px] mr-3 md:px-[100px] h-[24px] first-letter:font-bold first-letter:text-5xl animate-pulse"></div>
          <div className="first-letter:float-left bg-black dark:bg-white mt-[50px] mr-3 md:px-[100px] h-[24px] first-letter:font-bold first-letter:text-5xl animate-pulse"></div>

        </div>
      </div>
    </div>
  )
}

