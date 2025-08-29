import React, { useEffect } from 'react'
import { toggleTheme } from '../../features/theme/themeSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function ThemeToggle() {
    const theme = useSelector(state => state.theme.theme)
    const dispatch = useDispatch();

    useEffect(()=> {
        theme === 'dark' ? dispatch(toggleTheme(true)) : dispatch(toggleTheme(false))
    })

  return (
    <div>
        <input type="checkbox" name="themeToggle" id="themeToggle" defaultChecked={theme === 'dark'? true : false} onChange={(e) => {dispatch(toggleTheme(e.currentTarget.checked)); console.log(e.currentTarget.checked);
        }} className='hidden'/>
        <label htmlFor="themeToggle" 
       
        >
            <div className='inset-shadow-[black] inset-shadow-2xs flex items-center bg-[#9CA3AF] px-[2px] rounded-2xl w-10 h-5'>
                <div className={`bg-[#FFFFFF] dark:bg-[#0A0A0A] rounded-full w-4 h-4 circle ${theme === 'dark'? 'translate-x-5' :'' } transition-all duration-300 ease-in-out`}></div>
            </div>
        </label>
    </div>
  )
}
