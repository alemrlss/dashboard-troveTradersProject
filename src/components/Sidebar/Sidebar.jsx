/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import {
  BsFillBarChartFill,
  BsFillPersonFill,
  BsGem,
  BsX,
  BsFillHouseLockFill,
} from "react-icons/bs";

function Sidebar({ toggleSidebar, sidebarVisible }) {
  return (
    <>
      <div
        className={`m-2 sm:m-4 rounded-xl fixed sm:static left-0 top-0 h-full w-60 sm:w-72 bg-primary-100 text-white p-4 z-10 ${
          sidebarVisible ? "" : "hidden"
        } ${
          sidebarVisible
            ? "animate-fade-right animate-duration-200"
            : "animate-fade-left animate-duration-200"
        } sm:animate-fade animate-duration-100 `}
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
              className="block hover:text-blue-300 m-5 text-lg font-semibold"
            >
              <BsFillHouseLockFill className="inline-block mr-3 h-6 w-6" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/usuarios"
              className="block hover:text-blue-300 m-5 text-lg font-semibold"
            >
              <BsFillPersonFill className="inline-block mr-3 h-6 w-6" />
              Usuarios
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/disputas"
              className="block hover:text-blue-300 m-5 text-lg font-semibold"
            >
              <BsFillBarChartFill className="inline-block mr-3 h-6 w-6" />
              Disputas
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/reports"
              className="block hover:text-blue-300 m-5 text-lg font-semibold"
            >
              <BsFillBarChartFill className="inline-block mr-3 h-6 w-6" />
              Bloqueo / Desbloqueo de cuentas
            </Link>
          <li>
            <Link
              to="/dashboard/reports"
              className="block hover:text-blue-300 m-5 text-lg font-semibold"
            >
              <BsFillBarChartFill className="inline-block mr-3 h-6 w-6" />
              Crear Cuenta de Admin(VIP)
            </Link>
          </li>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
