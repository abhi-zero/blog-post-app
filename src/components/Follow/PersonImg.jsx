import React from 'react'

export default function PersonImg(
   {
     imgUrl,
    name,
    username
   }
) {

  console.log(imgUrl,name);
  
  return (
    <div className='group'>
        <div className='relative w-[80px]'>
          <img src={imgUrl} alt={name}  className='border-3 dark:border-[#cacaca] border-black rounded-full min-w-[80px] h-[80px]'/>
          <h1 className='mt-1 font-medium text-[#535252] dark:text-[#918f8f] text-sm text-center'>{name.first}</h1>
        </div>
        <div className='-z-10 group-hover:z-10 absolute opacity-0 group-hover:opacity-100 shadow-2xl transition-all translate-x-[-25%] duration-300 ease-in-out'>
          <div className='flex items-center-safe gap-3 bg-[#e4e3e3] dark:bg-[#272829] p-[20px] rounded w-[300px]'>
             <img src={imgUrl} alt={name}  className='border-2 dark:border-[#cacaca] border-black rounded-full min-w-[50px] h-[50px]'/>
             <div className='leading-4'>
               <h1 className='mt-1 font-medium text-[#0A0A0A] dark:text-[#FFFFFF] text-left'><span>{name.first}</span> <span className='text-[#535252] dark:text-[#918f8f]'>{name.last}</span></h1>
             <h1 className='mt-1 text-[#0A0A0A] dark:text-[#FFFFFF] text-sm text-left'>{username}</h1>
             </div>
          </div>
        </div>
    </div>
  )
}
