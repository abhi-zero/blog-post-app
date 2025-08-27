import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: { byId: {}, allIds: [] },
  reducers: {
   mergePosts(state, action) {
      action.payload.forEach((post) => {
        state.byId[post.id] = post; 
        if (!state.allIds.includes(post.id)) {
          state.allIds.push(post.id); 
        }
      });
    },
  },
});

export const { mergePosts } = postsSlice.actions;

export default postsSlice.reducer;
