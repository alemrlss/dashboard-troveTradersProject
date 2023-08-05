/* eslint-disable react/prop-types */

import { useLocation } from "react-router-dom";
import { BsGear, BsBell, BsList } from "react-icons/bs";

const Navbar = ({ toggleSidebar }) => {
  const location = useLocation();

  return (
    <nav className="bg-white p-4 mb-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center">
          {/* Buttons (Visible only on mobile) */}
          <div className="flex space-x-4 sm:hidden">
            <button className="text-gray-800  hover:bg-gray-200 p-2 rounded-md">
              <BsGear className="text-xl" />
            </button>
            <button className="text-gray-800  hover:bg-gray-200 p-2 rounded-md">
              <BsBell className="text-xl" />
            </button>
            {/* Mobile Menu Button */}
            <button className="text-gray-700 sm:hidden" onClick={toggleSidebar}>
              <BsList className="text-3xl" />
            </button>
          </div>
          {/* Page Reference */}
          <div className="font-bold text-sm tracking-widest	 mt-2 hidden sm:block sm:mt-0">
            <p className="inline-block text-gray-500">Dashboard</p> {"  "}
            <p className="inline-block">/</p> {"  "}
            <p className="inline-block text-gray-900">
              {location.pathname.split("/")[2] &&
                location.pathname.split("/")[2].charAt(0).toUpperCase() +
                  location.pathname.split("/")[2].slice(1)}
            </p>
          </div>
        </div>

        {/* Buttons and Search Input (Hidden on mobile) */}
        <div className="hidden sm:flex space-x-4">
          <button className="text-gray-800  hover:bg-gray-200 p-2 rounded-md">
            <BsGear className="text-2xl" />
          </button>
          <button className="text-gray-800  hover:bg-gray-200 p-2 rounded-md">
            <BsBell className="text-2xl" />
          </button>
        </div>

        {/* Page Reference */}
        <div className="font-bold text-sm mt-2 block sm:hidden tracking-widest	">
          <p className="inline-block text-gray-500">Dashboard</p> {"  "}
          <p className="inline-block">/</p> {"  "}
          <p className="inline-block text-gray-900">
            {location.pathname.split("/")[2] &&
              location.pathname.split("/")[2].charAt(0).toUpperCase() +
                location.pathname.split("/")[2].slice(1)}
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
