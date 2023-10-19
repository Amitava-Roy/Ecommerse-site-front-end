import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addAdmin(state, action) {
      state = { admin: action.payload };
      return state;
    },
  },
});
export const { addAdmin } = adminSlice.actions;
export default adminSlice.reducer;
