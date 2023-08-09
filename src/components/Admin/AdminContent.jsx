/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import AdminRegistrationForm from "./AdminRegistrationForm";
import AdminList from "./AdminList";
import Loader from "../Loader/Loader";
import axios from "axios";
import { getIdUser } from "../../services/Auth";

function AdminContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAdminPlus, setIsAdminPlus] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/admins`);
        const responseDataUser = await axios.get(
          `http://localhost:3001/admins/${getIdUser()}`
        );

        // Obtener el valor de isAdminPlus de la respuesta y almacenarlo en el estado
        setIsAdminPlus(responseDataUser.data.isAdminPlus);
        setLoading(false);
        setData(response.data);
      } catch (error) {
        console.log(error); //PROGRAMAR ERROR.
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isAdminPlus: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
  const handleInputChangeCheck = (e) => {
    setError("");
    const { name, value, type, checked } = e.target;

    // Si el tipo es checkbox, actualiza isAdminPlus con el valor de checked
    const newValue = type === "checkbox" ? checked : value;

    setFormData({ ...formData, [name]: newValue });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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

    axios
      .post("http://localhost:3001/auth/registerAdmin", {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        isAdminPlus: formData.isAdminPlus,
      })
      .then((response) => {
        console.log(response.data);
        setSuccess(
          `Cuenta administrativa creada con exito al correo ${formData.email}`
        );
        setData([...data, response.data]);
        // Limpiar el formData después de un registro exitoso
        setFormData({
          name: "",
          email: "",
          password: "",
          isAdminPlus: false,
        });
      })
      .catch((error) => {
        if (error.response.data.statusCode === 402) {
          setError("Ya existe un Administrador con ese correo electrónico");
        }
      });
  };

  return (
    <div>
      {loading && <Loader />}

      {data && (
        <>
          {isAdminPlus ? ( // Verificar si isAdminPlus es true
            <AdminRegistrationForm
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              formData={formData}
              success={success}
              error={error}
              handleInputChangeCheck={handleInputChangeCheck}
              setAdmins={setData}
              admins={data}
            />
          ) : (
            <div className="bg-gray-100 p-6 rounded-lg text-center">
              <p className="text-lg text-gray-600">
                No tienes permisos para crear nuevos administradores
              </p>
              <p className="mt-4 text-gray-500">
                Si necesitas acceso, por favor contacta a un administrador plus.
              </p>
            </div>
          )}
          <AdminList administradores={data} isAdminPlus={isAdminPlus} setAdmins={setData} />
        </>
      )}
    </div>
  );
}

export default AdminContent;
