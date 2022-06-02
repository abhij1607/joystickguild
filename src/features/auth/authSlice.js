import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "../../firebase/firebase-auth";

const initialState = {
  token: localStorage.getItem("token"),
  isLoginStatus: "idle",
  isSignupStatus: "idle",
};

const authSlice = createSlice({
  name: "authDetails",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [signup.pending]: (state) => {
      state.isSignupStatus = "loading";
    },
    [signup.fulfilled]: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
      state.isSignupStatus = "fulfilled";
    },
    [signup.rejected]: (state) => {
      state.isSignupStatus = "rejected";
    },

    [login.pending]: (state) => {
      state.isLoginStatus = "loading";
    },
    [login.fulfilled]: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
      state.isLoginStatus = "fulfilled";
    },
    [login.rejected]: (state) => {
      state.isLoginStatus = "rejected";
    },
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
