import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DisputesContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/disputes`);
        setLoading(false);
        setData(response.data);
      } catch (error) {
        console.log(error); // Manejar el error de manera apropiada.
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {data && (
        <div className="h-screen p-8">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
            Disputas pendientes
          </h2>

          {data.length === 0 ? (
            <div>No hay disputas pendientes por el momento</div>
          ) : (
            data.map((dispute) => (
              <div
                key={dispute._id}
                className="border p-4 mb-4 rounded bg-white shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{dispute.titlePost}</h3>
                  <button
                    className="bg-blue-500 text-white rounded px-2 py-1"
                    onClick={() => {
                      navigate(`/dispute/${dispute._id}`);
                    }}
                  >
                    Ver Disputa
                  </button>
                </div>
                <p className="text-center md:text-left">
                  <strong>Nombre del vendedor:</strong> {dispute.nameSeller}
                </p>
                <p className="text-center md:text-left">
                  <strong>Nombre del comprador:</strong> {dispute.nameBuyer}
                </p>
                <div className="text-center md:text-left flex">
                  <strong>Motivo:</strong>{" "}
                  <p className="text-red-600 font-bold pl-1">
                    {dispute.reason === "recibo"
                      ? "El comprador no ha recibido el producto"
                      : "El vendedor no ha recibido el pago"}
                  </p>
                </div>
                {dispute.adminResponsible && (
                  <p className="mt-2">
                    Administrador Responsable: {dispute.adminResponsible}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default DisputesContent;
