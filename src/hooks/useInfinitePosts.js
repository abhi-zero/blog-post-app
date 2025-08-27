import { useEffect, useState } from "react";
import { useGetPostsQuery } from "../api/postApi";
import { mergePosts } from "../features/posts/postsSlice";
import { useDispatch } from "react-redux";

export const useInfinitePosts = (limit = 10) => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();

    const { data, isFetching, isLoading, isError, error } = useGetPostsQuery({ limit, page });
    console.log("Data outside fron effect",data)
    

   useEffect(() => {
      console.log("Effect triggered:", { data });
       if (Array.isArray(data)) {
          console.log("Dispatching mergePosts with", data.length, "posts");
        
      dispatch(mergePosts(data));
    }
  }, [data, dispatch ]);


    const loadMore = () => setPage(prev => prev + 1);


    return {loadMore, isFetching, isLoading, isError, error }
};