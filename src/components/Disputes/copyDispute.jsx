/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState } from "react";
import { useEffect } from "react";
import { SocketContext } from "../../contexts/socketContext";
import axios from "axios";
function DisputesContent() {
  const socket = useContext(SocketContext);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/messages/" + `64f086d47cfbdf5846f73b44`
        );
        const oldMessages = response.data;
        setMessages(oldMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);
  useEffect(() => {
    if (!socket) return;
    socket.emit("joinTradeRoom", `64f086d47cfbdf5846f73b44`);
    socket.on("message", handleMessageReceived);

    return () => {
      // Desuscribirse del evento al desmontar el componente
      socket.off("message", handleMessageReceived);
    };
  }, [socket]);

  const handleMessageReceived = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };
  const handleSendMessage = () => {
    if (!socket || !newMessage) return;

    // Enviar mensaje al servidor
    socket.emit("sendMessage", {
      tradeId: `64f086d47cfbdf5846f73b44`,
      message: newMessage,
      username: `admin`,
    });

    setNewMessage("");
  };
  const handleJoin = () => {};
  return (
    <div>
      <h2>Disputes Content</h2>
      <button className="bg-blue-500 p-3 text-white" onClick={handleJoin}>
        Entrar a la sala especifica
      </button>
      <div className="w-full md:w-1/4 px-4 relative">
        <div className="bg-slate-100 rounded-lg p-4 mb-4">
          <h1 className="text-3xl font-bold mb-1 text-gray-900 text-center">
            Trade Chat
          </h1>
          <p className="text-center font-semibold text-gray-600 text-sm">
            Ponte de acuerdo con la otra parte para seguir con el tradeo...
          </p>
        </div>

        <div className="border border-gray-300 p-4 mb-4 max-w-md h-96 overflow-y-auto bg-white rounded-lg shadow-md mx-auto">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 `}>
              <strong className="text-gray-700">{message.username}:</strong>{" "}
              {message.message}
            </div>
          ))}
        </div>

        <form
          onClick={(e) => {
            e.preventDefault();
          }}
          className="flex w-full mx-auto"
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
  );
}

export default DisputesContent;
