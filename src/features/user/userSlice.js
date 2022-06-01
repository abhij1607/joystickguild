import { createSlice } from "@reduxjs/toolkit";

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
    updateUserDetails: (state, action) => {
      state.userDetails = { ...state.userDetails, ...action.payload };
    },
  },
  extraReducers: {},
});

export const { updateUserDetails } = userSlice.actions;

export default userSlice.reducer;
