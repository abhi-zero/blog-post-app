import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import PrimaryBtn from "../buttons/PrimaryBtn";
import { useState } from "react";
import SecondaryBtn from "../buttons/SecondaryBtn";
import parse from 'html-react-parser';
import DOMPurify from "dompurify";


export default function PostCompoment({
  blogTitle,
  author,
  date,
  body,
  likes,
}) {
  const [like, setLike] = useState(false);
  return (
    <div className="">
      <div>
        {/* main */}
        <div>
          <div>
            <h1 className="mt-[50px] font-bold text-black dark:text-white text-5xl text-center transition-all duration-200 ease-in-out">
              {blogTitle}
            </h1>
          </div>
          <div className="flex justify-center items-center-safe gap-5">
            <div className="flex justify-center items-center-safe gap-2">
              <h3 className="mt-[10px] text-[#4b4b4b] dark:text-[#acacac] text-center transition-all duration-300 ease-in-out">
                <span>{author}</span> - <span>{date}</span>
              </h3>
              <div className="mt-[10px] text-[#4b4b4b] dark:text-[#acacac] text-sm text-center transition-all duration-300 ease-in-out">
                <FaPencilAlt />
              </div>
            </div>
            <div className="mt-2 text-xl" id="like">
             <SecondaryBtn
             onClick={() => setLike(prev => !prev)}
              icon={!like ? <FaRegHeart /> : <FaHeart />}
              textColorLight= {'text-red-600'}
              textColorDark= {'dark:text-red-600'}
            />
           </div>
          </div>
          
        </div>
        <div>
          {/* body */}
          <div className="first-letter:float-left mt-[50px] mr-3 md:px-[100px] first-letter:font-bold text-black dark:text-white first-letter:text-5xl">{parse(DOMPurify.sanitize(body))}</div>
        </div>
      </div>
    </div>
  );
}
