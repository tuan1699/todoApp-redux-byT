import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    search: "",
    status: "All",
  },
  reducers: {
    statusFilterChange: (state, action) => {
      console.log(action.payload);
      state.status = action.payload;
    },
  },
});

export default filterSlice;

export const { statusFilterChange } = filterSlice.actions;
