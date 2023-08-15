import { useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import AdminContent from "../components/Admin/AdminContent";
import Footer from "../components/Footer/Footer";
import { useFontContext } from "../contexts/FontContext";
function Admin() {
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
      <div className="flex flex-col flex-grow p-4 overflow-y-auto">
        {/* Navbar */}
        <div className="flex-grow">
          <Navbar toggleSidebar={toggleSidebar} />
          <AdminContent />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Admin;
