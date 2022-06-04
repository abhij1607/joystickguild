import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers } from "../../firebase/firestore-requests";

const initialState = {
  users: [],
};

const allUserSlice = createSlice({
  name: "allUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default allUserSlice.reducer;
