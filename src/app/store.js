import { configureStore } from "@reduxjs/toolkit";
import authReducer from "features/auth/authSlice";
import userReducer from "features/user/userSlice";
import allUsersReducer from "features/allUsers/allUserSlice";

export const store = configureStore({
  reducer: {
    authDetails: authReducer,
    userDetails: userReducer,
    allUsers: allUsersReducer,
  },
});
