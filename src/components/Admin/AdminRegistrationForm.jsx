/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const AdminRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    hasAdminPermissions: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías implementar la lógica para registrar al nuevo administrador con la información en 'formData'
    // Por ahora, simplemente mostraremos los datos en la consola
    console.log(formData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Registro de Administrador
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre:
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Correo electrónico:
          </label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Contraseña:
          </label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Permisos para crear nuevos Administradores:
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              name="hasAdminPermissions"
              value={true}
              checked={formData.hasAdminPermissions}
              onChange={handleChange}
            />
            <span className="ml-2">Sí</span>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              name="hasAdminPermissions"
              value={false}
              checked={!formData.hasAdminPermissions}
              onChange={handleChange}
            />
            <span className="ml-2">No</span>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            Registrar Administrador
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminRegistrationForm;
