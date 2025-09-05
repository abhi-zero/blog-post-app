import React from 'react'

export default function SecondaryBtn({
    icon, text, onClick, textColorLight, textColorDark, noScale , padX ,padY, hover, type
}) {
  return (
    
    <div>
         <button
      onClick={onClick && onClick}
      type={type && type}
      className={`flex items-center-safe gap-1 ${textColorLight ? textColorLight  : 'text-black'} ${textColorDark ? textColorDark : 'dark:text-white'} rounded transition-all duration-800 ease-in-out cursor-pointer ${noScale? '' :'hover:scale-120'}  ${padX && padX} ${padY && padY} ${hover && hover}`}
    >
      {icon && icon}
      {text && text}
    </button>
    </div>
  )
}
