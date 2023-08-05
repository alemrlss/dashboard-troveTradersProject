import BlockUser from "./BlockUser";
import BlockedUsersList from "./BlockUserList";

function BlocksContent() {
  const usuariosBloqueados = [
    {
      email: "usuario1@example.com",
      nombre: "Juan",
      apellido: "Pérez",
    },
    {
      email: "usuario2@example.com",
      nombre: "María",
      apellido: "Gómez",
    },
    {
      email: "usuario3@example.com",
      nombre: "Carlos",
      apellido: "González",
    },
    {
      email: "usuario4@example.com",
      nombre: "Laura",
      apellido: "Sánchez",
    },
    {
      email: "usuario5@example.com",
      nombre: "Ana",
      apellido: "López",
    },
    {
      email: "usuario6@example.com",
      nombre: "Pedro",
      apellido: "Ramírez",
    },
    {
      email: "usuario7@example.com",
      nombre: "Sofía",
      apellido: "Martínez",
    },
    {
      email: "usuario8@example.com",
      nombre: "Luis",
      apellido: "García",
    },
    {
      email: "usuario9@example.com",
      nombre: "Diana",
      apellido: "Ortega",
    },
    {
      email: "usuario10@example.com",
      nombre: "Jorge",
      apellido: "Hernández",
    },
    {
      email: "usuario11@example.com",
      nombre: "Carmen",
      apellido: "Torres",
    },
    {
      email: "usuario12@example.com",
      nombre: "Fernando",
      apellido: "Díaz",
    },
    {
      email: "usuario13@example.com",
      nombre: "Marta",
      apellido: "Reyes",
    },
    {
      email: "usuario14@example.com",
      nombre: "Pablo",
      apellido: "Vargas",
    },
    {
      email: "usuario15@example.com",
      nombre: "Lucía",
      apellido: "Mendoza",
    },
    {
      email: "usuario16@example.com",
      nombre: "Ricardo",
      apellido: "Fernández",
    },
    {
      email: "usuario17@example.com",
      nombre: "Adriana",
      apellido: "Silva",
    },
    {
      email: "usuario18@example.com",
      nombre: "Emilio",
      apellido: "Navarro",
    },
    {
      email: "usuario19@example.com",
      nombre: "Gabriela",
      apellido: "Rojas",
    },
    {
      email: "usuario20@example.com",
      nombre: "Mario",
      apellido: "Ortiz",
    },
  ];
  return (
    <div>
      <BlockUser />
      <BlockedUsersList usuariosBloqueados={usuariosBloqueados} />
    </div>
  );
}

export default BlocksContent;
