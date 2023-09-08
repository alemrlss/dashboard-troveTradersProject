import { useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useFontContext } from "../contexts/FontContext";
import DisputeContent from "../components/Dispute/DisputeContent";
import { useParams } from "react-router-dom";
function Dispute() {
  const { activeFont } = useFontContext();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { id } = useParams();
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

      <div className="flex flex-col flex-grow p-4 overflow-y-auto">
        <Navbar />
        <DisputeContent id={id} />
        <Footer />
      </div>
    </div>
  );
}

export default Dispute;
