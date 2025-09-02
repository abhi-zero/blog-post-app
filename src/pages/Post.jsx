import React from "react";
import { PostComponent, PostComponentPh } from "../components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetPostByIdQuery } from "../api/postApi";
import { IoMdArrowRoundBack } from "react-icons/io";
import PrimaryBtn from "../components/buttons/PrimaryBtn";
import { useNavigate } from "react-router-dom";
import useFormateDate from "../hooks/useFormateDate";


export default function Post() {
    const navigate = useNavigate();

  const { id } = useParams();

  const {formateDate} = useFormateDate();


  const postFromStore = useSelector(state => state.posts?.byId[id]);

  const {data: postFromApi , isLoading, isError} = useGetPostByIdQuery(id)

  const post = postFromStore || postFromApi;




  return (
    <div className="mx-auto px-[30px] md:max-w-[80vw] h-[calc(100vh-150px)]">
        <PrimaryBtn 
        text={'Back'}
        icon={<IoMdArrowRoundBack />}
          onClick={() => navigate(`/`)}
          style={'2'}
        />
      {isLoading && <PostComponentPh />}
      {post ? (
        <PostComponent 
          blogTitle={post.title || ""}
          author={post.author?.name || ""}
          date={formateDate(post.date)|| ""}
          body={post.body || ""}
          likes={post.likes || 0}
        />
      ) : (
        <div>Post not found.</div>
      )}
    </div>
  );
}
