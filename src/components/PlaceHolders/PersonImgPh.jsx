import React from 'react'
import { BsPersonFill } from "react-icons/bs";

export default function PersonImgPh() {
  return (
    
    <div>
        <div className='w-[80px]'>
            <div className='flex justify-center items-center-safe border-3 dark:border-[#cacaca] border-black rounded-full min-w-[80px] h-[80px] text-2xl'>
                <BsPersonFill />
            </div>
          <h1 className='mt-1 font-medium text-[#535252] dark:text-[#918f8f] text-sm text-center'>InkFlow</h1>
        </div>
    </div>
  )
}
