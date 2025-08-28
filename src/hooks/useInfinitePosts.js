import { useEffect, useState } from "react";
import { useGetPostsQuery } from "../api/postApi";
import { mergePosts } from "../features/posts/postsSlice";
import { useDispatch } from "react-redux";

export const useInfinitePosts = (limit = 10) => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();

    const { data, isFetching, isLoading, isError, error } = useGetPostsQuery({ limit, page });

    const posts = data?.posts ?? []; 
    const totalPages = data?.totalPages ?? 0;

   useEffect(() => {
       if (Array.isArray(posts)) {
              dispatch(mergePosts(posts));
    }
  }, [posts, dispatch ]);


    const loadMore = () => setPage(prev => prev + 1);


    return {loadMore, isFetching, isLoading, isError,totalPages, error, page}
};