import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import variables from "../../variables";
import { database } from "../lib/appwriteClient";

console.log(variables);
const DATABASE_ID = variables.databaseId;
const POSTS_COLLECTION_ID = variables.postsId;

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getPosts: builder.query({
           async queryFn({ limit = 10, offset = 0 }) {
            try {
                const response = await database.listDocumnets(
                    DATABASE_ID,
                    POSTS_COLLECTION_ID,
                    [
                        { limit },
                        { offset }
                    ]
                );
                return {data : response};
            } catch (error) {
                return {error};
            }
           },
           providesTags : ["Posts"]
        }),
        getPostById: builder.query({
            async queryFn(id){
                try {
                    const response = await database.getDocument(
                        DATABASE_ID,
                        POSTS_COLLECTION_ID,
                        id
                    );
                    return {data : response}
                } catch (error) {
                    return {error}
                }
            }, 
            providesTags : ['Posts']
        }),
        createPost: builder.mutation({
            async queryFn(newPost){
              try {
                const reponse = await database.createDocument(
                    DATABASE_ID,
                    POSTS_COLLECTION_ID,
                    "unique()",
                    newPost
                );
                return {data : reponse}               
              } catch (error) {
                return {error}
              }
            },
            invalidatesTags: ['Post']

        }),
        updatePost: builder.mutation({
            async queryFn ({id, ...updateData}){
                try {
                    const response = await database.updateDocument(
                        DATABASE_ID,
                        POSTS_COLLECTION_ID,
                        id,
                        updateData
                    );
                    return {data: response}
                    
                } catch (error) {
                    return {error}
                }
            },
            invalidatesTags: ['Post']
        }),
        deletePost: builder.mutation({
           async queryFn ({id}){
            try {
                const reponse = await database.deleteDocument(
                    DATABASE_ID,
                    POSTS_COLLECTION_ID,
                    id
                )
                return  {data: reponse}
                
            } catch (error) {
                return {error}
            }
           },
            invalidatesTags: ['Post']
        })
    })
})

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;