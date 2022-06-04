import { createSlice } from "@reduxjs/toolkit";
import { fetchUserDetailss } from "../../firebase/firestore-requests";

const initialState = {
  userDetails: {
    userData: {},
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
} = userSlice.actions;

export default userSlice.reducer;
