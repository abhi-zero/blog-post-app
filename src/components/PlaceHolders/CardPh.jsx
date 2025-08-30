import React from 'react'

export default function CardPh() {
  return (
    <article 
        className="group bg-[#e4e3e3] dark:bg-[#272829] shadow-bg-[#272829] hover:shadow-2xl dark:hover:shadow-xl dark:shadow-[#5f5e5e] p-[30px] rounded-xl w-[300px] md:w-[350px] lg:w-[400px] text-black dark:text-[#FFFFFF] transition-all duration-300 ease-in-out">
          <div className="gap-2.5 grid grid-rows-auto">
           <div className="group/head relative max-w-[230px] md:max-w-[300px] lg:max-w-[330px]">
             <div
              className={`w-[50%] font-bold text-2xl h-[32px] transition-all duration-400 ease-in-out dark:bg-[#e4e3e3] bg-[#272829] animate-ping`}
            >
              </div>
           </div>
            
            <div>
              <div className="bg-[#272829] dark:bg-[#e4e3e3] w-[85%] h-[17px] text-sm transition-all animate-ping duration-500 ease-in-out">
                
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
                <span  className="bg-[#afafaf] dark:bg-[#0c0e11] px-[16px] py-[5px] rounded w-[100px] h-[26px] animate-ping duration-600 ease-in-out htransition-all"></span>
                <span  className="bg-[#afafaf] dark:bg-[#0c0e11] px-[16px] py-[5px] rounded w-[100px] h-[26px] animate-ping duration-600 ease-in-out htransition-all"></span>
                <span  className="bg-[#afafaf] dark:bg-[#0c0e11] px-[16px] py-[5px] rounded w-[100px] h-[26px] animate-ping duration-600 ease-in-out htransition-all"></span>
            </div>
            <div className='flex flex-col gap-2.5'>
              <div className="bg-[#272829] dark:bg-[#e4e3e3] my-[10px] w-full h-[20px] transition-all duration-700 ease-in-out"></div>
              <div className="bg-[#272829] dark:bg-[#e4e3e3] my-[10px] w-full h-[20px] transition-all duration-700 ease-in-out"></div>
              <div className="bg-[#272829] dark:bg-[#e4e3e3] my-[10px] w-full h-[20px] transition-all duration-700 ease-in-out"></div>
              <div className="bg-[#272829] dark:bg-[#e4e3e3] my-[10px] w-[75%] h-[20px] transition-all duration-700 ease-in-out"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className='bg-[#272829] dark:bg-[#e4e3e3] px-[20px] py-[8px] rounded transition-all duration-800 ease-in-out'>
                Read
              </div>
              <div className="flex items-center-safe gap-1.5 text-xl transition-all duration-900 ease-in-out">
                <span className='bg-[#272829] dark:bg-[#e4e3e3] w-[40px] h-[20px]'></span>
              </div>
            </div>
          </div>
        </article>
  )
}
