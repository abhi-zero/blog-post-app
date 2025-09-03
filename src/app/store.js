import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postApi } from "../api/postApi";
import { personApi } from "../api/personApi";
import {authApi} from '../api/authApi'
import postsReducer  from "../features/posts/postsSlice"
import themeReducer from "../features/theme/themeSlice"
import notificaionReducer  from "../features/notification/notificationSlice";


export const store = configureStore({
    reducer: {
        [postApi.reducerPath] : postApi.reducer,
        [authApi.reducerPath] : authApi.reducer,
        [personApi.reducerPath] : personApi.reducer,
        posts : postsReducer, 
        theme : themeReducer,
        notification : notificaionReducer
    },
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware()
                            .concat(postApi.middleware)
                            .concat(authApi.middleware)
                            .concat(personApi.middleware),
    devTools: true
})

setupListeners(store.dispatch);