/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const AdminList = ({ administradores }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxAdminsPerPage = 4;

  const paginateAdmins = (admins) => {
    const indexOfLastAdmin = currentPage * maxAdminsPerPage;
    const indexOfFirstAdmin = indexOfLastAdmin - maxAdminsPerPage;
    return admins.slice(indexOfFirstAdmin, indexOfLastAdmin);
  };

  const totalPages = Math.ceil(administradores.length / maxAdminsPerPage);

  // Calcular el rango de páginas a mostrar
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="w-full p-6 bg-white shadow rounded-lg mt-2">
      <h2 className="text-2xl font-semibold mb-6 text-center">Lista de Administradores</h2>
      {administradores.length > 0 ? (
        <table className="w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Correo electrónico</th>
              <th className="px-4 py-2">Permisos de Administrador</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {paginateAdmins(administradores).map((admin) => (
              <tr key={admin.id}>
                <td className="border px-4 py-2">{admin.name}</td>
                <td className="border px-4 py-2">{admin.email}</td>
                <td className="border px-4 py-2">{admin.hasAdminPermissions ? "Sí" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No hay administradores registrados.</p>
      )}

      {/* Pagination */}
      {administradores.length > maxAdminsPerPage && (
        <div className="mt-4 flex items-center justify-center space-x-4">
          <button
            onClick={handlePrevPage}
            className={`px-3 py-2 rounded-lg ${
              currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
            }`}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-3 py-2 rounded-lg ${
                currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-white text-blue-500"
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            className={`px-3 py-2 rounded-lg ${
              currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
            }`}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminList;
