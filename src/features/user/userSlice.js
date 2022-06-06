import { createSlice } from "@reduxjs/toolkit";
import { fetchUserDetailss } from "../../firebase/firestore-requests";

const initialState = {
  userDetails: {
    userData: {
      bio: "",
      coverPicture: "",
      email: "",
      firstName: "",
      lastName: "",
      profilePicture: "",
      website: "",
    },
    followers: { followers: [] },
    following: { following: [] },
    likedPost: { likedPost: [] },
    bookmarks: { bookmarks: [] },
    notifications: { notifications: [] },
    posts: { posts: [] },
  },
  userDetailsLoading: "idle",
};

const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    updateUserDetailsState: (state, action) => {
      state.userDetails.userData = {
        ...state.userDetails.userData,
        ...action.payload,
      };
    },

    updateUserFollowing: (state, action) => {
      state.userDetails.following = {
        following: [...state.userDetails.following.following, action.payload],
      };
    },

    updateUserUnfollow: (state, action) => {
      state.userDetails.following = {
        following: state.userDetails.following.following.filter(
          (_user) => _user !== action.payload
        ),
      };
    },

    addUserPost: (state, action) => {
      state.userDetails.posts.posts = [
        ...state.userDetails.posts.posts,
        action.payload,
      ];
    },
    updateUserLikedPost: (state, action) => {
      state.userDetails.likedPost.likedPost = [
        ...state.userDetails.likedPost.likedPost,
        action.payload,
      ];
    },
    updateUserUnlikedPost: (state, action) => {
      state.userDetails.likedPost.likedPost = state.userDetails.likedPost.likedPost.filter(
        (_id) => _id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetailss.pending, (state) => {
      state.userDetailsLoading = "loading";
    });
    builder.addCase(fetchUserDetailss.fulfilled, (state, action) => {
      state.userDetailsLoading = "fulfilled";
      state.userDetails = action.payload;
    });
    builder.addCase(fetchUserDetailss.rejected, (state) => {
      state.userDetailsLoading = "rejected";
    });
  },
});

export const {
  updateUserDetailsState,
  updateUserFollowing,
  updateUserUnfollow,
  addUserPost,
  updateUserLikedPost,
  updateUserUnlikedPost,
} = userSlice.actions;

export default userSlice.reducer;
