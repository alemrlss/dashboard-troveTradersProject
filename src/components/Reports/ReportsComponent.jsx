import React, { useState, useEffect } from "react";
import axios from "axios";
import { generatePDF } from "../../services/generatePDF-users";
import { generatePDFAdmin } from "../../services/generatePDF-admins";
import { generatePDFBlockedUsers } from "../../services/generatePDF-blockedUsers";
import { saveAs } from "file-saver";

function ReportsComponent() {
  const [selectedReport, setSelectedReport] = useState("usuarios");
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleReportChange = (reportType) => {
    setSelectedReport(reportType);
  };

  const reportApiRoutes = {
    usuarios: "http://localhost:3001/users",
    administradores: "http://localhost:3001/admins",
    usuariosBloqueados: "http://localhost:3001/users/block/users",
  };

  const fetchReportData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(reportApiRoutes[selectedReport]);
      setReportData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos del informe:", error);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [selectedReport]);

  const handleGenerateReportUsers = async () => {
    try {
      const pdfBytes = await generatePDF(reportData); // Supongamos que has generado el PDF con la función generatePDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, "reporte_usuarios.pdf");
    } catch (error) {
      console.error("Error generando el reporte PDF:", error);
    }
  };

  const handleGenerateReportAdmins = async () => {
    try {
      const pdfBytes = await generatePDFAdmin(reportData);
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, "reporte-administradores.pdf");
    } catch (error) {
      console.error("Error generando el reporte de Admins PDF:", error);
    }
  };
  const handleGenerateReportBlockedUsers = async () => {
    try {
      const pdfBytes = await generatePDFBlockedUsers(reportData);
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, "reporte-usuarios-bloqueados.pdf");
    } catch (error) {
      console.error(
        "Error generando el reporte de Usuarios Bloqueados PDF:",
        error
      );
    }
  };
  return (
    <div className="h-screen flex">
      <nav className="bg-white rounded-md w-96 h-full py-4 text-md px-8 text-black border border-black">
        <h2 className="text-2xl font-bold mb-4">Panel de Reportes</h2>
        <ul>
          {Object.keys(reportApiRoutes).map((reportType) => (
            <li
              key={reportType}
              className={`cursor-pointer mb-2 px-2 ${
                selectedReport === reportType ? "font-bold underline" : ""
              } hover:opacity-75 `}
              onClick={() => handleReportChange(reportType)}
            >
              Reporte de {reportType}
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Reporte de {selectedReport}
        </h1>
        <div>
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            reportData && (
              <>
                {/* Personaliza la visualización según el tipo de informe */}
                {selectedReport === "usuarios" && (
                  <div className="flex flex-col items-center justify-center">
                    {console.log(reportData)}
                    <p className="text-center text-xl">
                      Usuarios Registrados: {reportData.length}
                    </p>

                    <button
                      onClick={handleGenerateReportUsers}
                      className="bg-blue-500 mt-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Descargar Reporte PDF
                    </button>
                  </div>
                )}
                {selectedReport === "administradores" && (
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-xl">
                      Administradores Activos: {reportData.length}
                    </p>
                    <button
                      onClick={handleGenerateReportAdmins}
                      className="bg-blue-500 mt-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Descargar Reporte PDF
                    </button>
                  </div>
                )}
                {selectedReport === "usuariosBloqueados" && (
                  <div className="flex flex-col items-center justify-center">
                    {reportData.length > 0 ? (
                      <>
                        <p className="text-xl">
                          Usuarios Bloqueados: {reportData.length}
                        </p>
                        {console.log(reportData)}
                        <button
                          onClick={handleGenerateReportBlockedUsers}
                          className="bg-blue-500 mt-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                          Descargar Reporte PDF
                        </button>
                      </>
                    ) : (
                      <p>
                        No se puede generar el reporte porque no hay usuarios
                        bloqueados.
                      </p>
                    )}
                  </div>
                )}
                {selectedReport === "infoGeneral" && (
                  <div>
                    <p>Informacion General</p>
                  </div>
                )}
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportsComponent;
