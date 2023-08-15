import { useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import DisputesContent from "../components/Disputes/DisputesContent";
import Footer from "../components/Footer/Footer";
import { useFontContext } from "../contexts/FontContext";
function Disputes() {
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
      <div className="flex flex-col flex-grow p-4">
        {/* Navbar */}
        <div className="flex-grow">
          <Navbar toggleSidebar={toggleSidebar} />
          <DisputesContent />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Disputes;
