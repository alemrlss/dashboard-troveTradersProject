import React, { useState } from "react";

const BlockUser = () => {
  const [email, setEmail] = useState("");
  const [usuariosBloqueados, setUsuariosBloqueados] = useState([]);

  const handleBloquearUsuario = (e) => {
    e.preventDefault();
    // Aquí podrías implementar la lógica para bloquear el usuario con el correo 'email'
    // Esto podría incluir una llamada a tu API o función en el backend para actualizar el estado de bloqueo en la base de datos
    // Por ahora, simplemente agregaremos el correo a la lista de usuarios bloqueados
    setUsuariosBloqueados([...usuariosBloqueados, email]);
    // Limpia el campo de correo electrónico después de bloquear
    setEmail("");
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Bloqueo de usuarios
      </h2>
      <form onSubmit={handleBloquearUsuario}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Correo electrónico:
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            placeholder="Ingrese el correo del usuario a bloquear"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            Bloquear usuario
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlockUser;
