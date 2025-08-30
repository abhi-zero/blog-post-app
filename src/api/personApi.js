import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import variables from "../../variables";

export const personApi = createApi({
    reducerPath : 'personApi',
    baseQuery : fetchBaseQuery({baseUrl : variables.personApiUrl}),
    endpoints : (builder) => ({
        getFollowing : builder.query({
            query : ({results = 10, page = 1}) => `?page=${page}&results=${results}`,
            transformResponse : (response) => response.results
        })
    })
})

export const { useGetFollowingQuery } = personApi