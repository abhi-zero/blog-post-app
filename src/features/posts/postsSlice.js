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
    removePost(state, action) {
      const id = action.payload;
      delete state.byId[id];
      state.allIds = state.allIds.filter(postId => postId !== id);
    }
  },
});

export const { mergePosts,removePost } = postsSlice.actions;

export default postsSlice.reducer;
