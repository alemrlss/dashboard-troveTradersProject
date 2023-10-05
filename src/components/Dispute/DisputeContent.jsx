/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { format } from "date-fns";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { SocketContext } from "../../contexts/socketContext";
function DisputeContent({ id }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [dataSeller, setDataSeller] = useState(null);
  const [dataBuyer, setDataBuyer] = useState(null);
  const [dataPost, setDataPost] = useState(null);
  const [error, setError] = useState(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [disputeAlerts, setDisputeAlerts] = useState([]);

  const [dataProofsSeller, setDataProofsSeller] = useState(false);
  const [dataProofsBuyer, setDataProofsBuyer] = useState(false);
  const socket = useContext(SocketContext);

  const [errorDays, setErrorDays] = useState("");
  const [successDays, setSuccessDays] = useState("");

  const predefinedOptionsPay = [
    {
      id: 1,
      label: "Pedirle pruebas al vendedor de que no ha recibido el pago",
      event: "alert",
      recipient: "vendedor",
      message:
        "Por favor, envíe pruebas de que no ha recibido el pago de el comprador.",
    },
    {
      id: 2,
      label: "Pedirle pruebas al comprador que si ha realizado el pago",
      event: "alert",
      recipient: "comprador",
      message: "Por favor, envíe pruebas de que el pago ha sido realizado.",
    },
  ];

  const predefinedOptionsReceived = [
    {
      id: 1,
      label:
        "Pedirle pruebas al vendedor de que ha enviado/entregado el producto",
      event: "alertReceived",
      recipient: "vendedor",
      message:
        "Por favor, envíe pruebas de que el producto ha sido enviado/entregado",
    },
    {
      id: 2,
      label:
        "Pedirle pruebas al comprador de que el vendedor no le ha entregado/enviado el producto",
      event: "alertReceived",
      recipient: "comprador",
      message:
        "Por favor, envíe pruebas de que el vendedor no le ha entregado el producto.",
    },
  ];

  const [messageSuccess, setMessageSuccess] = useState("");
  const [showPruebas, setShowPruebas] = useState(false);

  const togglePruebas = () => {
    setShowPruebas(!showPruebas);
  };

  const [selectedOption, setSelectedOption] = useState("");

  const [successText, setSuccessText] = useState("");
  const [errorText, setErrorText] = useState("");
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  useEffect(() => {
    if (!socket) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/disputes/${id}`
        );
        const responseDataSeller = await axios.get(
          `http://localhost:3001/users/${response.data.sellerId}`
        );
        const responseDataBuyer = await axios.get(
          `http://localhost:3001/users/${response.data.buyerId}`
        );

        const responseDataPost = await axios.get(
          `http://localhost:3001/posts/${response.data.postID}`
        );

        const responseDataMessages = await axios.get(
          `http://localhost:3001/messages/${response.data.tradeId}`
        );
        setMessages(responseDataMessages.data);
        setDataSeller(responseDataSeller.data);
        setDataBuyer(responseDataBuyer.data);
        setDataPost(responseDataPost.data);

        console.log(data);
        const disputeAlertsData = response.data.alerts || [];
        setDisputeAlerts(disputeAlertsData);
        setData(response.data);
        setDataProofsBuyer(response.data.proofBuyer);
        setDataProofsSeller(response.data.proofSeller);
        setLoading(false);
        setError(false);

        socket.emit("joinTradeRoom", `${response.data.tradeId}`);
        socket.on("message", handleMessageReceived);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
    setLoading(true);

    return () => {
      // Desuscribirse del evento al desmontar el componente
      socket.off("message", handleMessageReceived);
    };
  }, [id, socket]);

  const handleSendMessage = () => {
    if (!socket || !newMessage) return;
    socket.emit("sendMessage", {
      tradeId: data.tradeId,
      message: newMessage,
      username: "ADMIN",
    });
    setNewMessage("");
  };

  const handleMessageReceived = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleSubmitPay = async (e) => {
    e.preventDefault();
    if (selectedOption) {
      const { event, recipient, message } = predefinedOptionsPay.find(
        (option) => option.label === selectedOption
      );

      // Emitir el evento socket correspondiente
      if (event === "alert") {
        try {
          const role = `${recipient}`;

          const response = await axios.post(
            `http://localhost:3001/disputes/${data._id}`,
            {
              role: role,
              message: message,
              disputeId: data._id,
            }
          );
          const responseDisputeTrade = await axios.post(
            `http://localhost:3001/users/disputes/${data.tradeId}/${data.sellerId}/${data.buyerId}`,
            {
              role: role,
              message: message,
              disputeId: data._id,
            }
          );
          console.log(responseDisputeTrade.data);
          console.log(response.data);

          setSuccessText("Alerta enviada correctamente.");

          socket.emit(event, { tradeId: data.tradeId, role, message });
        } catch (error) {
          if (error.response && error.response.status === 400) {
            setErrorText("Error: Ya se envió una alerta a este destinatario.");
          } else {
            setErrorText(
              "Error desconocido. Por favor, inténtalo de nuevo más tarde."
            );
          }
        }
      }
    }
  };
  const handleSubmitReceived = async (e) => {
    e.preventDefault();
    if (selectedOption) {
      const { event, recipient, message } = predefinedOptionsReceived.find(
        (option) => option.label === selectedOption
      );

      // Emitir el evento socket correspondiente
      if (event === "alertReceived") {
        try {
          const role = `${recipient}`;
          const response = await axios.post(
            `http://localhost:3001/disputes/${data._id}`,
            {
              role: role,
              message: message,
              disputeId: data._id,
            }
          );
          const responseDisputeTrade = await axios.post(
            `http://localhost:3001/users/disputes/${data.tradeId}/${data.sellerId}/${data.buyerId}`,
            {
              role: role,
              message: message,
              disputeId: data._id,
            }
          );
          console.log(responseDisputeTrade.data);
          console.log(response.data);

          setSuccessText("Alerta enviada correctamente.");

          socket.emit(event, { tradeId: data.tradeId, role, message });
        } catch (error) {
          if (error.response && error.response.status === 400) {
            setErrorText("Error: Ya se envió una alerta a este destinatario.");
          } else {
            setErrorText(
              "Error desconocido. Por favor, inténtalo de nuevo más tarde."
            );
          }
        }
      }
    }
  };

  const handleDeleteProof = async (disputeId, role) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/disputes/${disputeId}/deleteProof/${role}`
      );
      console.log(response.data);
      setShowPruebas(!showPruebas);

      if (role === "vendedor") {
        setDataProofsSeller(null);
      }
      if (role === "comprador") {
        setDataProofsBuyer(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelAdmin = async () => {
    const message = "El Administrador ha decidido cancelar el trade";
    try {
      await axios.post(
        `http://localhost:3001/users/trades/${data.tradeId}/${data.sellerId}/${data.buyerId}/cancel`
      );
      await axios.delete(`http://localhost:3001/disputes/${data._id}`);

      socket.emit("adminCancel", {
        tradeId: data.tradeId,
        message,
        role: "Administrador",
      });
      setMessageSuccess(
        "El trade ha sido cancelado con exito. Redirijiendo a las  Disputas..."
      );
      setTimeout(() => {
        navigate("/dashboard/disputas");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinueTrade = async () => {
    const message = "El Administrador ha decidido continuar el trade";
    try {
      const response = await axios.post(
        `http://localhost:3001/users/trades/${data.tradeId}/${data.sellerId}/${data.buyerId}/continue`
      );
      console.log(response.data);
      await axios.delete(`http://localhost:3001/disputes/${data._id}`);

      socket.emit("adminContinue", {
        tradeId: data.tradeId,
        message,
        role: "Administrador",
      });
      setMessageSuccess(
        "El trade continuara con Exito. Se le ha notificado a los integrantes del trade. Redirijiendo a las Disputas..."
      );
      setTimeout(() => {
        navigate("/dashboard/disputas");
      }, 10000);
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedOptionTime, setSelectedOptionTime] = useState(""); // Estado para almacenar la opción seleccionada.
  const handleSetDeliveryTime = async () => {
    if (!selectedOptionTime) {
      // Muestra una alerta o un mensaje de error al usuario
      setErrorDays("Seleccione un tiempo de entrega");
      console.log(errorDays);
      return; // No realiza la acción si no se seleccionó ninguna opción.
    }

    // Supongamos que tienes los siguientes datos disponibles
    const idTrade = data.tradeId;
    const idSeller = data.sellerId;
    const idBuyer = data.buyerId;
    const days = selectedOptionTime; // El valor de tiempo seleccionado

    try {
      // Realiza la primera solicitud POST a la ruta de usuarios
      const userResponse = await axios.post(
        `http://localhost:3001/users/trades/${idTrade}/${idSeller}/${idBuyer}/deliverDate`,
        {
          days: days,
        }
      );
      console.log(userResponse.data);
      // Realiza la segunda solicitud POST a la ruta de disputas
      const disputeResponse = await axios.post(
        `http://localhost:3001/disputes/${data._id}/deliverDate`,
        {
          days: days,
        }
      );
      console.log(disputeResponse.data);
      const message = "Se le ha establecido un tiempo de entrega al Vendedor";
      socket.emit("deliverTime", { tradeId: data.tradeId, message: message });
      setSuccessDays("Se le ha establecido un tiempo de entrega al Vendedor");
    } catch (error) {
      // Manejar cualquier error que ocurra en ambas solicitudes
      console.error("Error en una o ambas solicitudes:", error);
    }
  };
  return (
    <div>
      {error && (
        <div className="h-screen flex justify-center items-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md my-4">
            <h3 className="font-semibold">Error</h3>
            <p>Lo sentimos, ocurrió un error al cargar la disputa.</p>
          </div>
        </div>
      )}
      {loading && <Loader />}
      {data && (
        <div>
          <h2 className="text-2xl text-center md:text-left font-semibold">
            Información de la disputa
          </h2>

          <div className="bg-white p-4 shadow-md rounded-md my-4">
            <div className="mb-4">
              <h3 className="text-lg md:text-xl font-semibold">Publicación</h3>
              <p className="text-gray-600 text-lg md:text-xl">
                {dataPost.title}
              </p>
              <p className="text-gray-400 text-sm md:text-lg">
                {dataPost.description}
              </p>
            </div>
            <div className="flex justify-between">
              <div className="">
                <div className="mb-4">
                  <h3 className=" font-semibold text-lg md:text-xl">Precio</h3>
                  <p className="text-gray-600 text-sm md:text-xl">
                    {dataPost.price}
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold text-lg md:text-xl">Fotos</h3>
                  <div className="flex space-x-2 text-sm md:text-xl">
                    {" "}
                    Foto 1, Foto 2, Foto 3
                  </div>
                </div>
              </div>
              <div>
                {" "}
                <div className="mb-4">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Categoria
                  </h3>
                  <p className="text-gray-600 text-sm md:text-xl">Deportes</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Creado desde
                  </h3>
                  <p className="text-gray-600 text-sm md:text-xl">
                    {format(new Date(dataPost.createdAt), "dd/MM/yyyy")}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold">Motivo:</h2>
              <p className="text-red-600 text-lg md:text-xl">
                {data.reason === "pago"
                  ? "El vendedor aun no ha recibido el pago"
                  : "El comprador no ha recibido el objeto"}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center mb-6">
            <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
              <div className="flex items-start bg-white rounded-lg shadow-lg p-6">
                <div className="w-1/4">
                  <img
                    src={`http://localhost:3001/image/profile/${dataSeller.imageProfile}`}
                    alt="Foto del vendedor"
                    className="w-20 h-20 rounded-full mb-4 border-4 border-white"
                  />
                  <div className="flex items-center">
                    <FaStar className="h-6 w-6 text-yellow-500 mr-1" />
                    <span className="text-yellow-500 font-bold text-lg">
                      {dataSeller.rating}/5
                    </span>
                  </div>
                </div>
                <div className="w-3/4 pl-6">
                  <h2 className="text-xl md:text-2xl font-bold mb-2">
                    {dataSeller.name} {dataSeller.lastName}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">Vendedor</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
              <div className="flex items-start bg-white rounded-lg shadow-lg p-6">
                <div className="w-1/4">
                  <img
                    src={`http://localhost:3001/image/profile/${dataBuyer.imageProfile}`}
                    alt="Foto del comprador"
                    className="w-20 h-20 rounded-full mb-4 border-4 border-white"
                  />
                  <div className="flex items-center">
                    <FaStar className="h-6 w-6 text-yellow-500 mr-1" />
                    <span className="text-yellow-500 font-bold text-lg">
                      {dataBuyer.rating}/5
                    </span>
                  </div>
                </div>
                <div className="w-3/4 pl-6">
                  <h2 className=" font-bold mb-2 text-xl md:text-2xl">
                    {dataBuyer.name} {dataBuyer.lastName}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">Comprador</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-center md:justify-end  mt-4 mr-4">
              {" "}
              {/* Mueve el botón aquí y agrega una margen superior */}
              <button
                onClick={togglePruebas}
                className="flex items-center bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 mb-2 rounded focus:outline-none"
              >
                Pruebas de los integrantes
                <FaChevronDown className="ml-1" />
              </button>
            </div>
            {showPruebas && (
              <div className="bg-white p-4 shadow-md rounded-md my-4 animate-fade-down animate-duration-500">
                {dataProofsSeller || dataProofsBuyer ? (
                  <div className="flex justify-between ">
                    {console.log(dataProofsBuyer, dataProofsSeller)}
                    {dataProofsSeller && (
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-center">
                          Vendedor:
                        </h3>
                        <img
                          src={`http://localhost:3001/images/proofs/${data.proofSeller}`}
                          alt="Prueba del Vendedor"
                          className="mt-2 rounded-lg  h-48 w-48"
                        />
                        <div className="mt-2">
                          <a
                            href={`http://localhost:3001/images/proofs/${data.proofSeller}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline mr-4 "
                          >
                            Ver imagen
                          </a>
                          <button
                            onClick={() =>
                              handleDeleteProof(data._id, "vendedor")
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2"
                          >
                            Eliminar Prueba
                          </button>
                        </div>
                      </div>
                    )}
                    {dataProofsBuyer && (
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-center">
                          Comprador:{" "}
                        </h3>
                        <img
                          src={`http://localhost:3001/images/proofs/${data.proofBuyer}`}
                          alt="Prueba del Comprador"
                          className="mt-2 rounded-lg shadow-md h-48 w-48"
                        />
                        <div className="mt-2">
                          <a
                            href={`http://localhost:3001/images/proofs/${data.proofBuyer}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline mr-4"
                          >
                            Ver imagen
                          </a>
                          <button
                            onClick={() =>
                              handleDeleteProof(data._id, "comprador")
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2"
                          >
                            Eliminar Prueba
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p>No se han cargado pruebas aún. </p>
                )}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 ">
            <div className="chat">
              <div className="w-full px-4 relative">
                <div className="bg-slate-100 rounded-lg p-4">
                  <h1 className="text-3xl font-bold mb-1 text-gray-900 text-center">
                    Trade Chat
                  </h1>
                  <p className="text-center font-semibold text-gray-600 text-xs">
                    Puedes supervisar el chat aqui..
                  </p>
                  <p className="text-center font-semibold text-gray-600 text-xs">
                    Si envias un mensaje, se enviará como ADMIN
                  </p>
                </div>

                <div className="border border-gray-300 p-4 mb-4 max-w-md h-56 overflow-y-auto bg-white rounded-lg shadow-md mx-auto">
                  {messages.map((message, index) => (
                    <div key={index} className={`mb-2 `}>
                      <strong className="text-gray-700">
                        {message.username}:
                      </strong>{" "}
                      {message.message}
                    </div>
                  ))}
                </div>
                <form
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="flex w-full mx-auto mb-4"
                >
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 mr-2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    placeholder="Escribe un mensaje..."
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            </div>
            <div className="alert">
              {data.reason === "pago" && (
                <div className="bg-white p-4 shadow-md rounded-md mb-4">
                  <form onSubmit={handleSubmitPay}>
                    <div className="mb-2">
                      <label
                        htmlFor="alertOptions"
                        className="block font-semibold text-sm md:text-lg"
                      >
                        Mensaje de Alerta:
                      </label>
                      <p className="text-gray-400 text-sm mb-2">
                        Nota: Solo podras enviarle la alerta a los integrantes
                        del trade una sola vez. Si necesitas pedirle pruebas de
                        nuevo, puedes eliminar la imagen y volverla a pedir por
                        el Chat
                      </p>
                      <div className="flex flex-col">
                        {predefinedOptionsPay.map((option) => (
                          <label
                            key={option.id}
                            className="text-2xl mb-2 italic"
                          >
                            <input
                              type="radio"
                              name="alertOptions"
                              value={option.label}
                              checked={selectedOption === option.label}
                              onChange={() => {
                                handleOptionChange(option.label);
                                setErrorText("");
                                setSuccessText("");
                              }}
                              className="mr-2"
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md text-sm"
                      >
                        Enviar Alerta
                      </button>
                      {errorText && (
                        <p className="text-red-500 text-sm mt-2">{errorText}</p>
                      )}
                      {successText && (
                        <p className="text-green-500 text-sm mt-2">
                          {successText}
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              )}
              {data.reason === "recibo" && (
                <div className="bg-white p-4 shadow-md rounded-md mb-4">
                  <form onSubmit={handleSubmitReceived}>
                    <div className="mb-2">
                      <label
                        htmlFor="alertOptions"
                        className="block font-semibold text-sm md:text-lg"
                      >
                        Mensaje de Alerta:
                      </label>
                      <p className="text-gray-400 text-sm mb-2">
                        Nota: Solo podras enviarle la alerta a los integrantes
                        del trade una sola vez. Si necesitas pedirle pruebas de
                        nuevo, puedes eliminar la imagen y volverla a pedir por
                        el Chat
                      </p>
                      <div className="flex flex-col">
                        {predefinedOptionsReceived.map((option) => (
                          <label
                            key={option.id}
                            className="text-2xl mb-2 italic"
                          >
                            <input
                              type="radio"
                              name="alertOptions"
                              value={option.label}
                              checked={selectedOption === option.label}
                              onChange={() => {
                                handleOptionChange(option.label);
                                setErrorText("");
                                setSuccessText("");
                              }}
                              className="mr-2"
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md text-sm"
                      >
                        Enviar Alerta
                      </button>
                      {errorText && (
                        <p className="text-red-500 text-sm mt-2">{errorText}</p>
                      )}
                      {successText && (
                        <p className="text-green-500 text-sm mt-2">
                          {successText}
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {/*!! BOTONES DE RESOLUCION */}
              {data.reason === "pago" && (
                <div className="flex justify-center pt-6 mb-6">
                  <button
                    onClick={handleCancelAdmin}
                    type="submit"
                    className="m-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md text-sx md:text-sm"
                  >
                    Cancelar Trade
                  </button>
                  <button
                    type="submit"
                    className="m-2 bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-md text-sx md:text-sm"
                  >
                    Bloquear / Denunciar
                  </button>
                  <button
                    onClick={handleContinueTrade}
                    type="submit"
                    className="m-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md text-sx md:text-sm"
                  >
                    Continuar Trade
                  </button>
                </div>
              )}

              {data.reason === "recibo" && (
                <div className="flex flex-col mb-2 md:mb-5">
                  <div className="flex justify-evenly items-center">
                    <div className="flex flex-col m-4 md:flex md:flex-row ">
                      <select
                        className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 m-1 px-3 rounded-md text-sm leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => {
                          setSelectedOptionTime(e.target.value);
                          setErrorDays("");
                          setSuccessDays("");
                        }}
                      >
                        <option value="">
                          Seleccione un tiempo de entrega
                        </option>
                        <option value="1">1 día</option>
                        <option value="5">5 días</option>
                        <option value="10">10 días</option>
                        <option value="15">15 días</option>
                        <option value="20">20 días</option>
                      </select>
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md text-sm focus:outline-none focus:shadow-outline"
                        onClick={handleSetDeliveryTime}
                      >
                        Establecer tiempo
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md text-xs mt-2 md:text-sm focus:outline-none focus:shadow-outline"
                      onClick={handleContinueTrade}
                    >
                      Continuar Trade
                    </button>
                  </div>
                  <p className="text-red-500 text-center"> {errorDays}</p>
                  <p className="text-green-500 text-center"> {successDays}</p>
                </div>
              )}

              {messageSuccess && (
                <p className="text-green-500 text-center text-lg font-bold animate-fade-down animate-duration-100">
                  {messageSuccess}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisputeContent;
