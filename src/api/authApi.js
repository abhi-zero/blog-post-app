import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { account } from '../lib/appwriteClient';


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    // regiter (email + password)
    register: builder.mutation({
      async queryFn({ email, password, name }) {
        try {
          await account.create('unique()', email, password, name);
          await account.createEmailSession(email, password);
          const user = await account.get();
          return { data: user }
        } catch (error) {
          return { error: { message: error.message, code: error.code } };
        }
      }
    }),
    //  login create email session
    login: builder.mutation({
      async queryFn({ email, password }) {
        try {
          await account.createEmailSession(email, password);
          const user = await account.get();
          return { data: user }
        } catch (error) {
          return { error: { message: error.message, code: error.code } };
        }
      }
    }),
    // get currrent user data
    getCurrentUser: builder.query({
      async queryFn() {
        try {
          const response = await account.get();
          return { data: response }
        } catch (error) {
          return { error: { message: error.message, code: error.code } };
        }
      },
      providesTags: ['Auth']
    }),
    logout: builder.mutation({
      async queryFn() {
        try {
          await account.deleteSession("current");
          return { data: { success: true } }
        } catch (error) {
          return { error: { message: error.message, code: error.code } };
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