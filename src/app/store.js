import { configureStore } from "@reduxjs/toolkit";
import authReducer from "features/auth/authSlice";
import userReducer from "features/user/userSlice";

export const store = configureStore({
  reducer: {
    authDetails: authReducer,
    userDetails: userReducer,
  },
});
