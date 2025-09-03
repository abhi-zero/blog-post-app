import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postApi } from "../api/postApi";
import { authApi } from '../api/authApi'
import postsReducer  from "../features/posts/postsSlice"
import themeReducer from "../features/theme/themeSlice"
import notificaionReducer  from "../features/notification/notificationSlice";
import { profileApi } from "../api/profileApi";


export const store = configureStore({
    reducer: {
        [postApi.reducerPath] : postApi.reducer,
        [authApi.reducerPath] : authApi.reducer,
        [profileApi.reducerPath] : profileApi.reducer,
        posts : postsReducer, 
        theme : themeReducer,
        notification : notificaionReducer
    },
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware()
                            .concat(postApi.middleware)
                            .concat(authApi.middleware)
                            .concat(profileApi.middleware),
    devTools: true
})

setupListeners(store.dispatch);