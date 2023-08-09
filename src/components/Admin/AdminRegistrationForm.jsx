/* eslint-disable react/prop-types */

const AdminRegistrationForm = ({
  handleInputChange,
  handleSubmit,
  formData,
  success,
  error,
  handleInputChangeCheck,
}) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Registro de Administrador
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Nombre:
          </label>
          <input
            type="text"
            name="name"
            className="w-full py-2 px-3 border rounded focus:outline-none focus:border-gray-500 border-gray-800"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Correo electrónico:
          </label>
          <input
            type="email"
            name="email"
            className="w-full py-2 px-3 border rounded focus:outline-none focus:border-gray-500 border-gray-800"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Contraseña:
          </label>
          <input
            type="password"
            name="password"
            className="w-full py-2 px-3 border rounded focus:outline-none border-gray-800 focus:border-gray-500"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center text-gray-700">
          <input
            type="checkbox"
            name="isAdminPlus"
            value={true}
            checked={formData.isAdminPlus}
            onChange={handleInputChangeCheck}
            className="mr-2"
          />
          <label className="text-sm">
            Tiene permisos para crear nuevos Administradores
          </label>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            Registrar Administrador
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-center font-semibold mt-2">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-center font-semibold mt-2">
            {success}
          </p>
        )}
      </form>
    </div>
  );
};

export default AdminRegistrationForm;
