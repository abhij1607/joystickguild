import { createSlice } from "@reduxjs/toolkit";
import { fetchAllPosts } from "../../firebase/firestore-requests";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export default postSlice.reducer;
