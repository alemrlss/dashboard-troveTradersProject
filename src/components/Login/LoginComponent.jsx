import { useState } from "react";
import { loginBackend } from "../../services/Auth";
import { useAuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/images/logo.png";
// eslint-disable-next-line react/prop-types
function LoginComponent() {
  const { login } = useAuthContext();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones del frontend
    if (!validateEmail(formData.email)) {
      setError("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(
        "La contraseña debe contener al menos 8 caracteres y contener letras y números."
      );
      return;
    }

    loginBackend(formData.email, formData.password).then((res) => {
      if (res.status === 200 || res.status === 201) {
        login();
      } else {
        setError(res.message);
      }
    });
  };

  const validateEmail = (email) => {
    // Validación de correo electrónico utilizando una expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Validación de contraseña utilizando una expresión regular
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <section className="bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center space-x-2 mb-2 text-3xl ">
          <img src={logo} alt="" className="w-14 h-14" />
          <a href="#" className="flex items-center font-semibold text-gray-900">
            TroveTraders Admin
          </a>
        </div>
        <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Acceder
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Correo
                </label>
                <input
                  name="email"
                  onChange={handleInputChange}
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Tu correo"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Contraseña
                </label>
                <input
                  name="password"
                  onChange={handleInputChange}
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Tu Contraseña"
                />
              </div>
              <div className="space-y-4 md:space-y-6">
                <p className="text-red-600">{error}</p>
                <button className="w-full text-white bg-green-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Acceder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
export default LoginComponent;
