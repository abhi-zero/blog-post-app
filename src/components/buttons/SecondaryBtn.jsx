import React from 'react'

export default function SecondaryBtn({
    icon,text,onClick,textColorLight,textColorDark
}) {
  return (
    
    <div>
         <button
      onClick={onClick && onClick}
      className={`flex items-center-safe gap-1 ${textColorLight ? textColorLight  : 'text-black'} ${textColorDark ? textColorDark : 'dark:text-white'} rounded transition-all duration-800 ease-in-out cursor-pointer hover:scale-120`}
    >
      {icon && icon}
      {text && text}
    </button>
    </div>
  )
}
