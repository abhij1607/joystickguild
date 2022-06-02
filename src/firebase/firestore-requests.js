import { createAsyncThunk } from "@reduxjs/toolkit";

import { writeBatch, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";

import { updateUserDetailsState } from "features/user/userSlice";

export const createUser = async (firstName, lastName, email, userId) => {
  try {
    const batch = writeBatch(db);
    const userDataRef = doc(db, userId, "userData");
    const usersRef = doc(db, "users", userId);

    batch.set(userDataRef, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      bio: "",
      profilePicture: "",
      coverPicture: "",
      website: "",
    });

    batch.set(usersRef, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      bio: "",
      profilePicture: "",
      coverPicture: "",
      website: "",
    });

    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserDetailss = createAsyncThunk(
  "userDetails/fetchUserDetails",
  async (userId) => {
    try {
      const dataRef = doc(db, userId, "userData");
      const dataSnap = await getDoc(dataRef);

      if (dataSnap.exists()) {
        return dataSnap.data();
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserDetails = async (userId, userDetails, dispatch) => {
  try {
    const dataRef = doc(db, userId, "userData");
    const userDataRef = doc(db, "users", userId);

    await updateDoc(dataRef, userDetails);
    await updateDoc(userDataRef, userDetails);
    dispatch(updateUserDetailsState(userDetails));
  } catch (error) {
    console.log(error);
  }
};
