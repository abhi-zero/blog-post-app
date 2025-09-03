import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { account } from "appwrite";


const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        // regiter (email + password)
        register: builder.mutation({
            async queryFn({ email, password, name }) {
                try {
                    const response = await account.create(
                        "unique()",
                        email,
                        password,
                        name
                    );
                    return { data: response }
                } catch (error) {
                    return { error }
                }
            }
        }),
        //  login create email session
        login : builder.mutation({
            async queryFn({email, password}){
                try {
                    const response = await account.createEmailPassWordSession(
                        email,
                        password
                    )
                    return {data: response}
                } catch (error) {
                    return {error}
                }
            }
        }),
        // get currrent user data
        getCurrentUser : builder.query({
            async queryFn(){
                try {
                    const response = await account.get();
                    return {data: response}
                } catch (error) {
                    return {error}
                }
           },
           providesTags : ['Auth']
        }),
        logout : builder.mutation({
            async queryFn(){
                try {
                    await account.deleteSession("current");
                    return{data: {success : true}}
                } catch (error) {
                    return {error}
                }
            }
        })

    })
})



export const {
  useRegisterMutation,
  useLoginMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
} = authApi;