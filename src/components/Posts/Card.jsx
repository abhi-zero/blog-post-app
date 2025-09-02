import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PrimaryBtn from "../buttons/PrimaryBtn";
import { IoReader } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import SecondaryBtn from "../buttons/SecondaryBtn";
import { MdDelete } from "react-icons/md";
import { useDeletePostMutation } from "../../api/postApi";
import { useDispatch } from "react-redux";
import { removePost } from "../../features/posts/postsSlice";
import useFormateDate from "../../hooks/useFormateDate";
import parse from 'html-react-parser';
import DOMPurify from "dompurify";
import Notification from "../Notification";
import { showNortification } from "../../features/notification/notificationSlice";

export default function Card({ title, body, author, date, tags, likes, id}) {
  const navigate = useNavigate();
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [deletePost, {isSuccess}] = useDeletePostMutation();
  const dispatch = useDispatch(); 


    const {formateDate} = useFormateDate();



  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id).unwrap();
        dispatch(removePost(id));
        dispatch(showNortification('Post deleted successfully'))
      } catch (err) {
        console.error("Failed to delete the post: ", err);
       dispatch(showNortification('Failed to delete the post'))
      }
    }
  }
  return (
    <article className="group bg-[#e4e3e3] dark:bg-[#272829] shadow-bg-[#272829] hover:shadow-2xl dark:hover:shadow-xl dark:shadow-[#5f5e5e] p-[30px] rounded-xl w-[300px] md:w-[350px] lg:w-[400px] text-black dark:text-[#FFFFFF] transition-all duration-300 ease-in-out">
      <div className="gap-2.5 grid grid-rows-auto">
        <div className="group/head relative max-w-[230px] md:max-w-[300px] lg:max-w-[330px]">
          <h1
            className={`w-full font-bold text-2xl group-hover:underline group-hover:underline-offset-3 truncate md:whitespace-nowrap transition-all duration-400 ease-in-out`}
          >
            {title}
          </h1>
          <span className="-top-10 left-1/2 z-50 absolute bg-black opacity-0 group-hover/head:opacity-100 px-3 py-1 rounded max-w-xs text-white text-sm whitespace-normal scale-95 group-hover/head:scale-100 transition-all -translate-x-1/2 duration-200 pointer-events-none">
            {title}
          </span>
        </div>

        <div>
          <h3 className="text-sm transition-all duration-500 ease-in-out">
            by <span>{author}</span> - <span>{formateDate(date)}</span>
          </h3>
        </div>
        <div className="flex flex-wrap gap-2.5 min-h-[26px]">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#afafaf] dark:bg-[#0c0e11] px-[16px] py-[5px] rounded text-xs truncate text-nowrap transition-all duration-600 ease-in-out"
            >
              {tag}
            </span>
          ))}
        </div>
        <div>
          <div className="my-[10px] h-[100px] text-[#494949] dark:text-[#aaaaaa] group-hover:underline group-hover:underline-offset-3 line-clamp-4 transition-all duration-700 ease-in-out">
            {parse(DOMPurify.sanitize(body))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <PrimaryBtn
            icon={<IoReader />}
            text={"Read"}
            onClick={() => navigate(`/post/${id}`)}
            style={"1"}
          />
          <div className="flex items-center-safe gap-3">
            <div className="flex items-center-safe gap-1.5 text-xl transition-all duration-900 ease-in-out">
              <FaHeart />
              <p className="text-sm">{likes}</p>
            </div>
            <div className="group/options relative">
              <div className="">
                <SecondaryBtn
                  noScale={true}
                  style={"1"}
                  icon={<SlOptionsVertical />}
                  onClick={() => setOptionsOpen(!optionsOpen)}
                />
              </div>
              <div
                className={`top-[-300%] shadow-xl shadow-[#242424] right-0 absolute flex gap-2.5 dark:bg-black ${
                  optionsOpen ? "opacity-100" : `opacity-0`
                }  px-5 py-2.5 rounded text-xl scale-95 md:translate-x-1/2`}
              >
                <div className="">
                  <SecondaryBtn
                    textColorDark={"dark:text-blue-500"}
                    textColorLight={"text-blue-500"}
                    icon={<FaPencilAlt />}
                    onClick={() => navigate(`/write/${id}`)}
                  />
                </div>
                <div>
                  <SecondaryBtn
                    textColorDark={"dark:text-red-600"}
                    textColorLight={"text-red-600"}
                    icon={<MdDelete />}
                    onClick={() => handleDelete(id)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
