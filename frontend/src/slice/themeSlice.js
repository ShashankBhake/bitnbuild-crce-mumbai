import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode:
    localStorage.getItem("isDarkMode") !== null
      ? JSON.parse(localStorage.getItem("isDarkMode"))
      : false, // Light mode is the default
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("isDarkMode", JSON.stringify(state.isDarkMode));
    },
  },
});

export const { toggleMode } = uiSlice.actions;
export default uiSlice.reducer;
