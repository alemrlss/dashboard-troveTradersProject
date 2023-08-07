/* eslint-disable react/prop-types */

import { Link, useLocation } from "react-router-dom";
import {
  BsGem,
  BsX,
  BsFillHouseLockFill,
  BsExclamationOctagon,
} from "react-icons/bs";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { useColorContext } from "../../contexts/colorContext";

function Sidebar({ toggleSidebar, sidebarVisible }) {
  const { activeColor } = useColorContext();

  const location = useLocation();

  function isLinkActive(path) {
    return location.pathname === path;
  }
  const sidebarAnimationClass = sidebarVisible
    ? "animate-fade-right animate-duration-200"
    : "animate-fade-left animate-duration-200";

  return (
    <>
      <div
        className={`m-2 sm:m-4 rounded-xl fixed sm:static left-0 top-0 h-full w-60 sm:w-72 bg-primary-100 text-white p-4 z-10 ${
          sidebarVisible ? "" : "hidden"
        } ${sidebarAnimationClass} sm:animate-fade animate-duration-100 `}
      >
        <div className="flex justify-end mb-4 sm:hidden absolute top-4 right-4">
          <button
            className="text-white hover:text-blue-200"
            onClick={toggleSidebar}
          >
            <BsX className="text-2xl" />
          </button>
        </div>

        <h2 className="font-bold text-lg sm:text-xl mb-4 border-b-2 border-white pb-6 pt-4">
          {" "}
          <BsGem className="inline-block mr-2 h-5 w-5" />
          TroveTraders Admin
        </h2>

        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className={`block m-5 hover:${activeColor} text-lg font-semibold ${
                isLinkActive("/dashboard") ? `${activeColor}` : ""
              }`}
            >
              <BsFillHouseLockFill className="inline-block mr-3 h-6 w-6" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/usuarios"
              className={`block hover:${activeColor}  m-5 text-lg font-semibold ${
                isLinkActive("/dashboard/usuarios") ? `${activeColor}` : ""
              }`}
            >
              <FaUsers className="inline-block mr-3 h-6 w-6" />
              Usuarios
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/disputas"
              className={`block hover:${activeColor} m-5 text-lg font-semibold ${
                isLinkActive("/dashboard/disputas") ? `${activeColor}` : ""
              }`}
            >
              <BsExclamationOctagon className="inline-block mr-3 h-6 w-6" />
              Disputas
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/bloqueos"
              className={`block hover:${activeColor} m-5 text-lg font-semibold ${
                isLinkActive("/dashboard/bloqueos") ? `${activeColor}` : ""
              }`}
            >
              <IoIosLock className="inline-block mr-3 h-6 w-6" />
              Bloqueo de cuentas
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/administracion"
              className={`block hover:${activeColor} m-5 text-lg font-semibold ${
                isLinkActive("/dashboard/administracion")
                  ? `${activeColor}`
                  : ""
              }`}
            >
              <FaUserPlus className="inline-block mr-3 h-6 w-6" />
              Administracion
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
