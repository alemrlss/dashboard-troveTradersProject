/* eslint-disable react/prop-types */
import { useState } from "react";

const EditUserForm = ({ user, onCancel, onSave }) => {
  const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedUser);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md md:w-[450px] lg:w-[550px] mx-auto mt-16 sm:mt-28 animate-fade animate-once animate-duration-1000 animate-delay-0 animate-ease-in-out">
      <h2 className="text-xl font-semibold mb-4 text-left  sm:text-center">
        Editar Usuario
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre:
        </label>
        <input
          type="text"
          name="name"
          value={editedUser.name}
          onChange={handleInputChange}
          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Apellido:
        </label>
        <input
          type="text"
          name="lastName"
          value={editedUser.lastName}
          onChange={handleInputChange}
          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo:
        </label>
        <input
          type="email"
          name="email"
          value={editedUser.email}
          onChange={handleInputChange}
          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Guardar
        </button>
        <button
          onClick={onCancel}
          className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditUserForm;
