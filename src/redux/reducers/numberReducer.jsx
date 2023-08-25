// rxslice

import { createSlice } from "@reduxjs/toolkit";

const initialState = 1; // state mặc định

const numberReducer = createSlice({
  name: "numberReducer", // tạo ra action.type dựa trên const numberReducer = createSlice({
  initialState,
  reducers: {
    changeNumber: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const {changeNumber} = numberReducer.actions;

export default numberReducer.reducer;
