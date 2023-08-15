/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

function ConfirmationDelete({
  selectedUser,
  handleConfirmDelete,
  setSelectedUser,
  loading,
}) {
  return (
    <div
      className={`text-lg p-4 bg-white rounded-lg text-center shadow-lg mt-6 animate-fade-down animate-once animate-duration-1000 animate-delay-100 animate-ease-in-out`}
    >
      <p className="mb-2">
        ¿Estás seguro de que deseas eliminar al usuario{" "}
        <strong>{selectedUser.email}</strong>?
      </p>
      <div className="flex justify-center text-sm">
        <button
          onClick={() => handleConfirmDelete(selectedUser.id)}
          className={`px-4 py-2 rounded-lg bg-red-500 text-white font-bold ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
          }`}
          disabled={loading}
        >
          {loading ? "Desbloqueando..." : "Confirmar desbloqueo"}
        </button>
        <button
          onClick={() => setSelectedUser(false)}
          className="px-4 py-2 ml-2 rounded-lg bg-gray-300 hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default ConfirmationDelete;
