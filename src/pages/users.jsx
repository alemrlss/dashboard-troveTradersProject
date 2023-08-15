import { useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import UsersContent from "../components/Users/UsersContent";
import Footer from "../components/Footer/Footer";
import { useFontContext } from "../contexts/FontContext";
function Users() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { activeFont } = useFontContext();
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div
      className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-100"
      style={{ fontFamily: activeFont }}
    >
      {/* Sidebar */}
      <Sidebar toggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} />

      {/* Main Content */}
      <div className="flex flex-col flex-grow p-4 overflow-y-auto min-h-screen">
        {/* Navbar */}
        <div className="flex-grow">
          <Navbar toggleSidebar={toggleSidebar} />
          <UsersContent />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Users;
