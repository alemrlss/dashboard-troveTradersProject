/* eslint-disable react/prop-types */

import { useColorContext } from "../../contexts/colorContext";
function ColorsPanel({ colors }) {
  const { activeColor, setActiveColor } = useColorContext();

  const handleColorClick = (color) => {
    setActiveColor(color.textColor);
  };
  return (
    <div className="p-4 bg-white shadow-lg mt-3">
      <label className="flex justify-center font-semibold mb-2">
        Colores del Panel
      </label>
      <div className="grid grid-cols-6 gap-4">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleColorClick(color)}
            className={`h-8 w-8 rounded-full border border-gray-800 cursor-pointer ${
              activeColor === color
                ? "border-2 border-blue-500"
                : "hover:border-blue-500"
            } ${color.bgColor}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default ColorsPanel;
