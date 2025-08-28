import React from 'react'
import { useEffect, useRef } from "react";
import { useInfinitePosts } from "../hooks/useInfinitePosts";
import { useSelector } from "react-redux";

export default function Home() {
  const { loadMore, isLoading, isError, error, isFetching, totalPages, page } =
    useInfinitePosts();
  const allPosts = useSelector((state) =>
    state.posts.allIds.map((id) => state.posts.byId[id])
  );
  const loadRef = useRef();

  useEffect(() => {
    const lr = loadRef.current;
    const obs = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        !isLoading &&
        !isFetching &&
        totalPages > page
      ) {
        loadMore();
      }
    },{threshold : 0.2});

    if (lr) obs.observe(lr);

    return ()=> {
      if(lr) obs.unobserve(lr)
    }

  }, [isLoading, isFetching, page]);

  if (isLoading) return <h1>Loading.....</h1>;
  if (isError) return <h1>{error}</h1>;

  return (
    <div className="flex flex-col items-center-safe">
      <ul className="w-[400px] flex flex-col gap-5">
        {allPosts.map((post) => (
          <li key={post.title}>
            <h1 className="font-bold text-white">
              {post.id} {post.title}
            </h1>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>

      <div
        className="py-[10px] px-[20px] bg-purple-600 text-white rounded-2xl"
        ref={loadRef}
      >
        {totalPages > page
          ? isFetching
            ? "Loading.."
            : "Load More"
          : "No more posts"}
      </div>
    </div>
  );
}
