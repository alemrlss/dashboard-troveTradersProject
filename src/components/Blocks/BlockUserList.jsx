/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import ConfirmationDesblock from "./ConfirmationDesblock";

const BlockedUsersList = ({ usuariosBloqueados, setUsuariosBloqueados }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);

  const maxUsersPerPage = 5;

  const paginateUsers = (users) => {
    const indexOfLastUser = currentPage * maxUsersPerPage;
    const indexOfFirstUser = indexOfLastUser - maxUsersPerPage;
    return users.slice(indexOfFirstUser, indexOfLastUser);
  };

  const totalPages = Math.ceil(usuariosBloqueados.length / maxUsersPerPage);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = usuariosBloqueados.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDesbloquearUsuario = (email) => {
    setSelectedUser(email);
  };

  const handleConfirmDesbloquear = async () => {
    setLoading(true);

    try {
      await axios.post("http://localhost:3001/users/desblockByEmail", {
        email: selectedUser,
      });

      setUsuariosBloqueados((prevUsers) =>
        prevUsers.filter((user) => user.email !== selectedUser)
      );

      setSelectedUser(null);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg ">
      <h3 className="text-2xl font-semibold mb-4 text-center">
        Usuarios bloqueados
      </h3>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Buscar usuario bloqueado por email..."
          className="block w-full py-2 px-4 border border-gray-400 rounded-lg pl-10 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 2a7 7 0 110 14A7 7 0 019 2zm0 12a5 5 0 100-10 5 5 0 000 10z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto shadow-xl">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Correo</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Apellido</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {paginateUsers(filteredUsers).map((usuario) => (
                <tr key={usuario.email}>
                  <td className="border px-4 py-2">{usuario.email}</td>
                  <td className="border px-4 py-2">{usuario.name}</td>
                  <td className="border px-4 py-2">{usuario.lastName}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDesbloquearUsuario(usuario.email)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      {" "}
                      Desbloquear
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">
          No hay usuarios bloqueados que coincidan con la búsqueda.
        </p>
      )}

      {filteredUsers.length > maxUsersPerPage && (
        <div className="mt-4 flex items-center justify-center space-x-4 shadow-lg mb-8">
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
        <ConfirmationDesblock
          loading={loading}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          handleConfirmDesbloquear={handleConfirmDesbloquear}
        />
      )}
    </div>
  );
};

export default BlockedUsersList;
