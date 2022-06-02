import { createSlice } from "@reduxjs/toolkit";
import { fetchUserDetailss } from "../../firebase/firestore-requests";

const initialState = {
  userDetails: {
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    website: "",
    profilePicture: "",
    coverPicture: "",
  },
  userDetailsLoading: "idle",
};

const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    updateUserDetailsState: (state, action) => {
      state.userDetails = { ...state.userDetails, ...action.payload };
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

export const { updateUserDetailsState } = userSlice.actions;

export default userSlice.reducer;
