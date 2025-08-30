
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useGetFollowingQuery } from '../../api/personApi';
import PersonImg from './PersonImg';
import { useEffect } from "react";


export default function FollowPeopleSection() {

  const {data, isLoading, isError,error} = useGetFollowingQuery({results:10, page:1 })

  useEffect(()=>{
    console.log(data);
  },[data])
  
  return (
    <section>
        <div className='relative flex items-center-safe gap-2'>
            <div className="top-[40%] left-0 z-10 lg:static absolute translate-y-[-50%] lg:translate-y-0">
               <button className='text-[#0A0A0A] dark:text-white text-3xl transition-all duration-300 ease-in-out'><IoIosArrowDropleftCircle /></button>
            </div>
            <div>
              <ul className="flex gap-2.5 px-[5px] md:px-[0px] max-w-[330px] sm:max-w-[450px] md:max-w-[630px] lg:max-w-[710px] overflow-scroll lg:overflow-x-hidden transition-all duration-300 ease-in-out home-flowwingsec">
                {isLoading && <h1>loading....</h1>}
                {
                  isError && <h1>{error}</h1>
                }
               {data?.map((person) => (
                 <li key={person.name.first}>
                  <PersonImg 
                    name={person.name}
                    imgUrl={person.picture.large}
                    username={person.login.username}
                  />
                </li>
               ))}
              </ul>
            </div>
            <div className="top-[40%] right-0 z-10 lg:static absolute translate-y-[-50%] lg:translate-y-0">
              <button className='text-[#0A0A0A] dark:text-white text-3xl transition-all duration-300 ease-in-out'><IoIosArrowDroprightCircle /></button>
            </div>
        </div>
    </section>
  )
}
