/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const BlockUser = ({ usuariosBloqueados, setUsuariosBloqueados }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBloquearUsuario = async (e) => {
    e.preventDefault();

    if (email === "") {
      return
    }
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/users/blockByEmail",
        { email }
      );

      if (response.data.status === 403) {
        setError("Este usuario ya está bloqueado.");
        setSuccess("");
      } else if (response.data.status === 404) {
        setError("El usuario no existe.");
        setSuccess("");
      } else {
        setError("");
        setSuccess("Usuario bloqueado exitosamente.");
        setUsuariosBloqueados([...usuariosBloqueados, response.data]);
        setEmail("");
      }
    } catch (error) {
      setError("No se pudo bloquear el usuario.");
      setSuccess("");
    }

    setLoading(false);
  };

  return (
    <div className="p-6  shadow   rounded-lg">
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
            disabled={loading}
          >
            {loading ? "Bloqueando..." : "Bloquear usuario"}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default BlockUser;
