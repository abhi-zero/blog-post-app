
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useGetFollowingQuery } from '../../api/personApi';
import PersonImg from './PersonImg';
import PersonImgPh from "../PlaceHolders/PersonImgPh";



export default function FollowPeopleSection() {

  const {data, isLoading, isError,error} = useGetFollowingQuery({results:10, page:1 })
  const box = document.querySelector('.box')
  

  function slideRight(){
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft - width
    console.log(width);
  }

    function slideLeft(){
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft + width
    console.log(width);
  }
  
  return (
    <section>
        <div className='relative flex items-center-safe gap-2'>
            <div className="top-[40%] left-[-2%] z-10 lg:static absolute translate-y-[-50%] lg:translate-y-0">
               <button 
               onClick={slideRight}
               className='text-[#0A0A0A] dark:text-white text-3xl transition-all duration-300 ease-in-out cursor-pointer'><IoIosArrowDropleftCircle /></button>
            </div>
            <div>
              <ul className="my-scrollbar-hidden flex gap-2.5 px-[5px] md:px-[0px] max-w-[330px] sm:max-w-[450px] md:max-w-[630px] lg:max-w-[710px] h-[104px] overflow-auto lg:overflow-x-hidden transition-all duration-300 ease-in-out box">
                {isLoading &&
                  Array.from({ length: 10 }).map((_, i) => (
                    <PersonImgPh key={i} />
                  ))
                }
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
            <div className="top-[39%] right-[-2%] z-10 lg:static absolute translate-y-[-50%] lg:translate-y-0">
              <button className='text-[#0A0A0A] dark:text-white text-3xl transition-all duration-300 ease-in-out cursor-pointer'
              onClick={slideLeft}
              ><IoIosArrowDroprightCircle /></button>
            </div>
        </div>
    </section>
  )
}
