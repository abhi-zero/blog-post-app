import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../features/notification/notificationSlice';

export default function Notification() {

    const message = useSelector((state) => state.notification.message)
    console.log(message);
    
    const dispatch = useDispatch();

    useEffect(()=> {
        if(message){
            const timer = setTimeout(() => {
                dispatch(clearNotification())
            }, 3000);
            return()=> clearTimeout(timer)
        }
    }, [message, dispatch])

  return (
    <div className={`left-0 bottom-0 z-1000 w-full fixed dark:bg-[#E4E3E3] bg-[#272829]  ${message ? 'translate-y-0' : 'translate-y-full'} transition-all duration-300 ease-in-out min-h-[36px]`} >
        <p className='px-[20px] py-[8px] font-medium text-white dark:text-black text-sm'>{message && message}</p>
    </div>
  )
}
