import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { account,database } from '../lib/appwriteClient';
import variables from "../../variables";
import { Query } from "appwrite";


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
          await account.createEmailPasswordSession({ email, password });
          const user = await account.get();

          const profileDoc = await database.createDocument(
            variables.databaseId,
            variables.profileId,
            'unique()',
            {
              authId : user.$id,
              name : name,
              username : email.split('@')[0],
              bio: "",
              avatarUrl :''
            }
          )
          return { data: {user, profile : profileDoc }};
        } catch (error) {
          return { error: { message: error.message, code: error.code } };
        }
      }
    }),
    //  login create email session
    login: builder.mutation({
      async queryFn({ email, password }) {
        try {
          await account.createEmailPasswordSession({ email, password });
          const user = await account.get();
          const profileList = await database.listDocuments(
            variables.databaseId,
            variables.profileId,
            [
              Query.equal('autId', user.$id)
            ]
          );

          const profile = profileList.documents[0] || null
          return { data: {user, profile }}
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