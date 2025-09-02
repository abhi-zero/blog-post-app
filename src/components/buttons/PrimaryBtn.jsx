import React from "react";

export default function PrimaryBtn({ icon, text, onClick, style, type}) {
  
  return (
    <button
    type={type && type}
      onClick={onClick && onClick}
      className={`flex items-center-safe gap-1 ${style === '1'?'bg-[#afafaf] hover:bg-[#0c0e11] hover:dark:bg-[#c9c9c9] dark:bg-[#0c0e11] hover:dark:text-black hover:text-[#FFFFFF]' : ' hover:bg-[#afafaf] bg-[#0c0e11] dark:bg-[#c9c9c9] hover:dark:bg-[#272829]  dark:text-black text-white hover:text-black hover:dark:text-white'}  px-[20px] py-[8px] rounded transition-all duration-800 ease-in-out cursor-pointer`}
    >
      {icon && icon}
      {text && text}
    </button>
  );
}
