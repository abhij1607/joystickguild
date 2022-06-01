import { createAsyncThunk } from "@reduxjs/toolkit";

import { writeBatch, doc, getDoc } from "firebase/firestore";
import { db } from "./config";

export const createUser = async (firstName, lastName, email, uId) => {
  try {
    const batch = writeBatch(db);
    const userDataRef = doc(db, uId, "userData");

    batch.set(userDataRef, {
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

export const fetchUserDetails = createAsyncThunk(
  "userDetail/fetchUserDetail",
  async (uId) => {
    try {
      const dataRef = doc(db, uId, "userData");

      const dataSnap = await getDoc(dataRef);

      if (dataSnap.exists()) {
        return dataSnap.data();
      }
    } catch (error) {
      console.log(error);
    }
  }
);
