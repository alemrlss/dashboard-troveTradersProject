/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { BsList } from "react-icons/bs";

function Navbar({ toggleSidebar }) {
  // Supongamos que tienes la información del usuario logueado en una variable llamada "user"
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <nav className="bg-blue-500 p-4 mb-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <button
            className="text-white hover:text-blue-200 sm:hidden"
            onClick={toggleSidebar}
          >
            <BsList className="text-3xl" />
          </button>
          <Link to="/" className="text-white font-bold text-xl">
            Trove Traders
          </Link>
        </div>

        <div className="text-white hidden sm:block">
          Welcome, {user.name} ({user.email})
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
