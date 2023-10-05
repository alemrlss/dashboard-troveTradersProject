/* eslint-disable react/prop-types */
// ConfigPanel.js

import { FaTimes, FaCogs } from "react-icons/fa";
import ColorsPanel from "./ColorsPanel";
import FontSelector from "./FontSelector";
import DeveloperCard from "./DeveloperCard";
import imgProfile from "../../assets/images/foto.jpg";
import Repositories from "./Repositories";

const ConfigPanel = ({ showPanel, onClose }) => {
  const colors = [
    { bgColor: "bg-blue-300", textColor: "text-blue-300" },
    { bgColor: "bg-red-500", textColor: "text-red-500" },
    { bgColor: "bg-orange-200", textColor: "text-orange-200" },
    { bgColor: "bg-green-500", textColor: "text-green-500" },
    { bgColor: "bg-purple-500", textColor: "text-purple-500" },
    { bgColor: "bg-pink-500", textColor: "text-pink-500" },
  ];

  const developers = [
    {
      name: "Kevin Borras",
      role: "Frontend Developer",
      avatarUrl: imgProfile,
      githubUrl: "URL del GitHub del desarrollador 1",
      linkedinUrl: "URL del LinkedIn del desarrollador 1",
    },
    {
      name: "Alejandro Morales",
      role: "FullStack Developer",
      avatarUrl: imgProfile,
      githubUrl: "URL del GitHub del desarrollador 2",
      linkedinUrl: "URL del LinkedIn del desarrollador 2",
    },

    {
      name: "Jissel Ortega",
      role: "Design",
      avatarUrl: imgProfile,
      githubUrl: "URL del GitHub del desarrollador 2",
      linkedinUrl: "URL del LinkedIn del desarrollador 2",
    },
    // Agregar información de los otros desarrolladores aquí
  ];

  return (
    <div
      className={`fixed top-0 right-0 h-full  sm:w-64 bg-white shadow-lg transform ${
        showPanel ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-20 `}
    >
      <div className="p-4 bg-primary-200 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FaCogs className="mr-2 text-xl" />
            <h2 className="font-semibold text-xl">
              Configuración del Dashboard
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm hover:text-gray-500"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        <p className="text-sm">Personaliza tu experiencia en el Dashboard</p>
      </div>

      <ColorsPanel colors={colors} />

      <FontSelector />

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3">Desarrolladores</h3>
        {developers.map((developer, index) => (
          <DeveloperCard key={index} {...developer} />
        ))}
      </div>

      <Repositories/>
      <p className="text-sm text-center mt-8 text-gray-500 mx-4">
        Versión del Dashboard: 1.0.0
      </p>
    </div>
  );
};

export default ConfigPanel;
