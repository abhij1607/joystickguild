import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createUser } from "./firestore-requests";
import { auth } from "./config";

export const signup = createAsyncThunk(
  "userDetails/signup",
  async (signupFormData) => {
    const { firstName, lastName, email, password } = signupFormData;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(user);
      await createUser(firstName, lastName, email, user.uid);
      return user.uid;
    } catch (error) {
      throw error;
    }
  }
);

export const login = createAsyncThunk(
  "userDetails/login",
  async (loginFormData) => {
    const { email, password } = loginFormData;
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user.uid;
    } catch (error) {
      throw error;
    }
  }
);

export const logout = async () => {
  await signOut(auth);
};
