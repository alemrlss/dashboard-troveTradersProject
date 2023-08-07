import { FaGithub } from "react-icons/fa";
function Repositories() {
  return (
    <div className="sm:hidden p-4 bg-white shadow-lg mt-2">
      <h2 className="text-sm font-semibold mb-2">Repositorios</h2>
      <div className="flex flex-col">
        {/* Enlaces a los repositorios de cada desarrollador */}
        <a
          href="https://github.com/alemrlss/client_troveTradersProject"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 text-xs mb-2"
        >
          <FaGithub className="inline-block mr-1" />
          Client_troveTradersProject
        </a>
        <a
          href="https://github.com/alemrlss/server_troveTradersProject"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 text-xs mb-2"
        >
          <FaGithub className="inline-block mr-1" />
          Server_troveTradersProject
        </a>
        <a
          href="https://github.com/alemrlss/dashboard-troveTradersProject"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 text-xs mb-2"
        >
          <FaGithub className="inline-block mr-1" />
          Dashboard_troveTradersProject
        </a>
      </div>
    </div>
  );
}

export default Repositories;
