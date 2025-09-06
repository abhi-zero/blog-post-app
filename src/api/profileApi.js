import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { database } from "../lib/appwriteClient";
import variables from "../../variables";
import { Query } from "appwrite";

const DATABASE_ID = variables.databaseId;
const PROFILE_COLLECTION_ID = variables.profileId;


export const profileApi = createApi({
    reducerPath : 'profileApi',
    baseQuery : fakeBaseQuery(),
    tagTypes : ['Profile'],
    endpoints : (builder) => ({
        // get profile by auth id
        getProfileByAuthId : builder.query({
            async queryFn(authId) {
                try {
                    const response = await database.listDocuments(
                        DATABASE_ID,
                        PROFILE_COLLECTION_ID,
                        [
                            Query.equal('authId',authId)
                        ]
                    );
                   if(response.documents.length > 0){
                     return {data : response.documents[0]}
                   }else{
                    return {error: {message : "Profile not found"}}
                   }
                } catch (error) {
                    return {error}
                }
            },
            providesTags :['Profile']
        }),
        // create profile
        createProfile : builder.mutation({
            async queryFn(profileData){
                try {
                    const response = await database.createDocument(
                        DATABASE_ID,
                        PROFILE_COLLECTION_ID,
                        "unique()",
                        profileData
                    ) 
                    return {data: response}
                } catch (error) {
                    return {error}
                }
            },
            invalidatesTags :['Profile']
        }),

        // Update profile
        updateProfile : builder.mutation({
            async queryFn({id, ...updateProfile}){
                try {
                    const response = await database.updateDocument(
                        DATABASE_ID,
                        PROFILE_COLLECTION_ID,
                        id,
                        updateProfile
                    
                    )
                    return {data: response}
                } catch (error) {
                    return {error}
                }
            },
            invalidatesTags: ['Profile']
        })

    })
})


export const {
  useGetProfileByAuthIdQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
} = profileApi;