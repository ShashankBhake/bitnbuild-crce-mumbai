import { useSelector, useDispatch } from "react-redux";
import React from 'react';
import { toggleMode } from "../slice/themeSlice";

const ColorSwitcher = () => {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const dispatch = useDispatch();

  const toggleModeHandler = () => {
    dispatch(toggleMode());
  };

  return (
    <div>
      <button onClick={toggleModeHandler}>{isDarkMode ? 'Light' : 'Dark'}</button>
    </div>
  );
};

export default ColorSwitcher;
