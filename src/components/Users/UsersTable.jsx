/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { BsSearch } from "react-icons/bs";
import { FaTimes, FaCheck } from "react-icons/fa";
import ConfirmationDelete from "./ConfirmationDelete";
import axios from "axios";
import { FaFileDownload } from "react-icons/fa";
import imageProfile from "../../assets/images/profile.png";

const UsersTable = ({ users, onEditUser, setUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);

  const maxUsersPerPage = 10;
  const pagesToShow = 4; // Número de páginas que se mostrarán en la paginación

  useEffect(() => {
    setCurrentPage(1); // Restablecer la página actual cuando cambia el término de búsqueda
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginateUsers = (users) => {
    const indexOfLastUser = currentPage * maxUsersPerPage;
    const indexOfFirstUser = indexOfLastUser - maxUsersPerPage;
    return users.slice(indexOfFirstUser, indexOfLastUser);
  };

  const totalPages = Math.ceil(filteredUsers.length / maxUsersPerPage);

  // Calcular el rango de páginas a mostrar
  const pageNumbers = [];
  if (currentPage <= pagesToShow) {
    for (let i = 1; i <= Math.min(pagesToShow, totalPages); i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage > totalPages - pagesToShow) {
    for (let i = totalPages - pagesToShow + 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    for (
      let i = currentPage - Math.floor(pagesToShow / 2);
      i <= currentPage + Math.floor(pagesToShow / 2);
      i++
    ) {
      pageNumbers.push(i);
    }
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
  const handleConfirmDelete = async (id) => {
    console.log(id);
    setLoading(true);

    try {
      await axios.delete("http://localhost:3001/users/" + id);

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.email !== selectedUser.email)
      );
      setSelectedUser(null);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="animate-fade animate-once animate-duration-1000 animate-delay-0 animate-ease-in-out">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar usuario..."
          className="block w-full py-2 px-4 border border-gray-400 rounded-lg pl-10 mb-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <BsSearch className="text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border table-auto">
          {/* Table head */}
          <thead className="text-center">
            <tr>
              <th className="border px-4 py-2"></th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Apellido</th>
              <th className="border px-4 py-2">Correo</th>
              <th className="border px-4 py-2">Verificado</th>
              <th className="border px-4 py-2"></th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="text-center">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="border px-4 py-2">
                  No hay usuarios con ese nombre.
                </td>
              </tr>
            ) : (
              paginateUsers(filteredUsers).map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">
                    {user.imageProfile ? (
                      <img
                        src={`http://localhost:3001/image/profile/${user.imageProfile}`}
                        alt="Imagen de perfil"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <img
                        src={imageProfile}
                        alt="Imagen de perfil"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                  </td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.lastName}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2 flex justify-center">
                    {user.isVerify ? (
                      <span className="text-green-500">
                        <FaCheck />
                      </span>
                    ) : (
                      <span className="text-red-500">
                        <FaTimes />
                      </span>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="mr-2 bg-blue-500 text-white px-2 py-1 rounded-lg"
                      onClick={() => onEditUser(user._id)}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser({ email: user.email, id: user._id });
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded-lg"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {filteredUsers.length > maxUsersPerPage && (
        <div className="mt-4 flex justify-center space-x-8 items-center">
          <div className=" flex items-center justify-center space-x-4">
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
        </div>
      )}

      {selectedUser && (
        <ConfirmationDelete
          loading={loading}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default UsersTable;
