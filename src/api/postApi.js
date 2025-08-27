import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import variables from "../../variables";

console.log(variables);


export const postApi = createApi({
    reducerPath : 'postApi',
    baseQuery : fetchBaseQuery({baseUrl : variables.apiUrl}),
    endpoints : (builder) => ({
        getPosts : builder.query({
            query : ({limit = 10, page = 1}) => `posts?_limit=${limit}&_page=${page}`
        })
    })
})

export const { useGetPostsQuery } = postApi;