import { createSlice } from "@reduxjs/toolkit";
import { fetchAllPosts } from "../../firebase/firestore-requests";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updateLikedPost: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            data: {
              ...post.data,
              likes: post.data.likes + action.payload.count,
            },
          };
        }
        return post;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export const { updateLikedPost } = postSlice.actions;

export default postSlice.reducer;
