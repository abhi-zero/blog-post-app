import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import variables from "../../variables";

console.log(variables);


export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ baseUrl: variables.apiUrl }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: ({ limit = 10, page = 1 }) => `posts?_limit=${limit}&_page=${page}`,
            transformResponse: (response, meta) => {
                const totalItems = meta.response.headers.get("X-Total-Count");
                const totalPages = Math.ceil(totalItems / 10);

                return {
                    posts: response,
                    totalCount: Number(totalItems),
                    totalPages
                }
            }
        }),
        getPostById: builder.query({
            query: (id) => `posts/${id}`,
        }),
        createPost: builder.mutation({
            query: (data) => ({
                url: `posts`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Post']

        }),
        updatePost: builder.mutation({
            query: ({id, ...data}) => ({
                url: `posts/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Post']
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Post']
        })
    })
})

export const { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } = postApi;