import { configureStore } from "@reduxjs/toolkit";
import {uiSlice  } from "./slice/themeSlice";
export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
  
});