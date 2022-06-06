import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  writeBatch,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  arrayUnion,
  arrayRemove,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./config";

import { updateUserDetailsState } from "features/user/userSlice";

export const createUser = async (firstName, lastName, email, userId) => {
  try {
    const batch = writeBatch(db);
    const usersRef = doc(db, "users", userId);
    const userDataRef = doc(db, userId, "userData");
    const userFollowersRef = doc(db, userId, "followers");
    const userFollowingRef = doc(db, userId, "following");
    const userPostsRef = doc(db, userId, "posts");
    const userLikedPostRef = doc(db, userId, "likedPost");
    const userBookmarkedPosts = doc(db, userId, "bookmarks");
    const userNotificationRef = doc(db, userId, "notifications");

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      bio: "",
      profilePicture: "",
      coverPicture: "",
      website: "",
    };

    batch.set(userDataRef, userData);
    batch.set(usersRef, userData);
    batch.set(userFollowersRef, { followers: [] });
    batch.set(userFollowingRef, { following: [] });
    batch.set(userPostsRef, { posts: [] });
    batch.set(userLikedPostRef, { likedPost: [] });
    batch.set(userBookmarkedPosts, { bookmarks: [] });
    batch.set(userNotificationRef, { notifications: [] });

    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserDetailss = createAsyncThunk(
  "userDetails/fetchUserDetails",
  async (userId) => {
    try {
      const userData = {};

      const querySnapshot = await getDocs(collection(db, userId));

      querySnapshot.forEach((doc) => {
        userData[doc.id] = doc.data();
      });

      return userData;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserDetails = async (userId, userDetails, dispatch) => {
  try {
    const dataRef = doc(db, userId, "userData");
    const usersRef = doc(db, "users", userId);

    await updateDoc(dataRef, userDetails);
    await updateDoc(usersRef, userDetails);
    dispatch(updateUserDetailsState(userDetails));
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    const users = [];

    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, data: doc.data() });
    });
    return users;
  }
);

export const followUser = async (followedUserId, userId) => {
  try {
    const followingRef = doc(db, userId, "following");
    await updateDoc(followingRef, { following: arrayUnion(followedUserId) });

    const followedUserFollowingRef = doc(db, followedUserId, "followers");
    await updateDoc(followedUserFollowingRef, {
      followers: arrayUnion(userId),
    });
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = async (unfollowedUserId, userId) => {
  try {
    const followingRef = doc(db, userId, "following");
    await updateDoc(followingRef, { following: arrayRemove(unfollowedUserId) });

    const followedUserFollowingRef = doc(db, unfollowedUserId, "followers");
    await updateDoc(followedUserFollowingRef, {
      followers: arrayRemove(userId),
    });
  } catch (error) {
    console.log(error);
  }
};

export const addNewPost = async (userId, postText, postImage) => {
  try {
    const userPostsRef = doc(db, userId, "posts");

    const docRef = await addDoc(collection(db, "posts"), {
      postBy: userId,
      postText: postText,
      postImageUrl: postImage.url,
      postImageName: postImage.fileName || "",
      dateCreated: Date.now(),
      likes: 0,
      comments: [],
    });

    await updateDoc(userPostsRef, { posts: arrayUnion(docRef.id) });

    return docRef.id;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllPosts = createAsyncThunk(
  "posts/getAllPosts/",
  async () => {
    const posts = [];

    const postsRef = collection(db, "posts");

    const q = query(postsRef, orderBy("dateCreated", "desc"));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, data: doc.data() });
    });

    return posts;
  }
);
