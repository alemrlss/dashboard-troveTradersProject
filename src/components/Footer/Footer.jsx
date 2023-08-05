const Footer = () => {
    return (
      <footer className="bg-gray-200 p-4 text-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} TroveTraders. Todos los derechos reservados.
        </p>
        <div className="flex justify-center mt-2">
          <a href="#" className="text-blue-500 hover:underline mx-2">
            Términos de uso
          </a>
          <span className="text-gray-400 mx-2">|</span>
          <a href="#" className="text-blue-500 hover:underline mx-2">
            Política de privacidad
          </a>
          <span className="text-gray-400 mx-2">|</span>
          <a href="#" className="text-blue-500 hover:underline mx-2">
            Contáctanos
          </a>
        </div>
      </footer>
    );
  };
  
  export default Footer;