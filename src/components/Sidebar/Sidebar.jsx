/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  BsFillBarChartFill,
  BsFillPersonFill,
  BsFilePost,
  BsArrowLeftRight,
} from "react-icons/bs";

function Sidebar({ toggleSidebar, sidebarVisible }) {
  return (
    <>
  <div className={`m-2 sm:m-4 rounded-xl fixed sm:static left-0 top-0 h-full w-64 bg-blue-400 text-white p-4 z-10 ${sidebarVisible ? '' : 'hidden'} ${sidebarVisible ? 'animate-fade-right animate-duration-200' : 'animate-fade-left animate-duration-200'} sm:animate-fade animate-duration-100 `}>
        <h2 className="font-bold text-xl mb-4 border-b-2 border-white pb-2">
          Dashboard
        </h2>
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard/posts" className="block hover:text-blue-300">
              <BsFilePost className="inline-block mr-2" />
              All Posts
            </Link>
          </li>
          <li>
            <Link to="/dashboard/users" className="block hover:text-blue-300">
              <BsFillPersonFill className="inline-block mr-2" />
              Users
            </Link>
          </li>
          <li>
            <Link to="/dashboard/reports" className="block hover:text-blue-300">
              <BsFillBarChartFill className="inline-block mr-2" />
              Reports
            </Link>
          </li>
        </ul>

        {/* Botón para ocultar el Sidebar */}
        <button
          className={`w-full sm:hidden bg-blue-600 text-white font-bold py-2 mt-4 rounded-lg ${
            sidebarVisible ? "block" : "hidden"
          }`}
          onClick={toggleSidebar}
        >
          <BsArrowLeftRight className="inline-block mr-2" />
          Hide Sidebar
        </button>
      </div>
    </>
  );
}

export default Sidebar;
