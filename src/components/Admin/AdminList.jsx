/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import ConfirmationRemove from "./ConfirmationRemove";

const AdminList = ({ administradores, isAdminPlus, setAdmins }) => {
  const [selectedUser, setSelectedUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const maxAdminsPerPage = 4;

  const paginateAdmins = (admins) => {
    const indexOfLastAdmin = currentPage * maxAdminsPerPage;
    const indexOfFirstAdmin = indexOfLastAdmin - maxAdminsPerPage;
    return admins.slice(indexOfFirstAdmin, indexOfLastAdmin);
  };

  const totalPages = Math.ceil(administradores.length / maxAdminsPerPage);

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

  const handleDeleteAdmin = (email, id) => {
    console.log(id);
    setSelectedUser({ email: email, id: id });
  };

  const handleConfirmRemove = async (id) => {
    setLoading(true);
    console.log(id);

    try {
      await axios.delete(`http://localhost:3001/admins/${id}`);

      setAdmins((prevUsers) =>
        prevUsers.filter((user) => user.email !== selectedUser.email)
      );

      setSelectedUser(null);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="w-full p-6 bg-white shadow rounded-lg mt-2">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Lista de Administradores
      </h2>
      {administradores.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Correo electrónico</th>
                <th className="px-4 py-2">Permisos de Administrador</th>
                {isAdminPlus && <th className="px-4 py-2">Acciones</th>}
              </tr>
            </thead>
            <tbody className="text-center">
              {paginateAdmins(administradores).map((admin) => (
                <tr key={admin._id}>
                  <td className="border px-4 py-2">{admin.name}</td>
                  <td className="border px-4 py-2">{admin.email}</td>
                  <td className="border px-4 py-2">
                    {admin.isAdminPlus ? "Sí" : "No"}
                  </td>
                  {isAdminPlus && (
                    <td className="border px-4 py-2">
                      {admin.isAdminPlus ? (
                        <span className="text-white font-bold bg-green-500 p-2 rounded">
                          Admin Plus
                        </span>
                      ) : (
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() =>
                            handleDeleteAdmin(admin.email, admin._id)
                          }
                        >
                          Eliminar Admin
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No hay administradores registrados.</p>
      )}

      {administradores.length > maxAdminsPerPage && (
        <div className="mt-4 flex items-center justify-center space-x-4">
          <button
            onClick={handlePrevPage}
            className={`px-3 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white"
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
                currentPage === pageNumber
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            className={`px-3 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
      {selectedUser && (
        <ConfirmationRemove
          loading={loading}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          handleConfirmRemove={handleConfirmRemove}
        />
      )}
    </div>
  );
};

export default AdminList;
