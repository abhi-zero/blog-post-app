import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postApi } from "../api/postApi";
import postsReducer  from "../features/posts/postsSlice"
import themeReducer from "../features/theme/themeSlice"

export const store = configureStore({
    reducer: {
        [postApi.reducerPath] : postApi.reducer,
        posts : postsReducer, 
        theme : themeReducer
    },
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(postApi.middleware),
    devTools: true
})

setupListeners(store.dispatch);