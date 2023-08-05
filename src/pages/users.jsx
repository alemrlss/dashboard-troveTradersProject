import { useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import UsersContent from "../components/Users/UsersContent";

function Users() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar toggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} />

      {/* Main Content */}
      <div className="flex flex-col flex-grow p-4 overflow-y-auto">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />
        <UsersContent />
      </div>
    </div>
  );
}

export default Users;