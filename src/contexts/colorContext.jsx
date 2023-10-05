/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext } from "react";

const ColorContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useColorContext = () => useContext(ColorContext);

export const ColorProvider = ({ children }) => {
  const [activeColor, setActiveColor] = useState("text-primary-300");

  return (
    <ColorContext.Provider value={{ activeColor, setActiveColor }}>
      {children}
    </ColorContext.Provider>
  );
};
