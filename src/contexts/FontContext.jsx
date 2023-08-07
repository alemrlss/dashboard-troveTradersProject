/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext } from "react";

const FontContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useFontContext = () => useContext(FontContext);

export const FontProvider = ({ children }) => {
  const [activeFont, setActiveFont] = useState('Arial');

  return (
    <FontContext.Provider value={{ activeFont, setActiveFont }}>
      {children}
    </FontContext.Provider>
  );
};