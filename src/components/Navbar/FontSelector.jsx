/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useFontContext } from "../../contexts/FontContext";

const FontSelector = () => {
  const { selectedFont, setActiveFont } = useFontContext();

  const handleSelectedFont = (e) => {
    setActiveFont(e.target.value);
  };
  const fontOptions = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Palatino",
    "Garamond",
    "Comic Sans MS",
  ];

  return (
    <div className=" mt-4 mb-4 shadow-lg p-2">
      <label className="block text-sm font-semibold mb-2">
        Tipo de Fuente:
      </label>
      <select
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        value={selectedFont}
        onChange={handleSelectedFont}
      >
        {fontOptions.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FontSelector;
