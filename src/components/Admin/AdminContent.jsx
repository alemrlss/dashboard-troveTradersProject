/* eslint-disable no-unused-vars */
import React from "react";
import AdminRegistrationForm from "./AdminRegistrationForm";
import AdminList from "./AdminList";

function AdminContent() {
  const administradores = [
    {
      id: 1,
      name: "Admin1",
      email: "admin1@example.com",
      hasAdminPermissions: true,
    },
    {
      id: 2,
      name: "Admin2",
      email: "admin2@example.com",
      hasAdminPermissions: false,
    },
    {
      id: 3,
      name: "Admin3",
      email: "admin3@example.com",
      hasAdminPermissions: false,
    },
    {
      id: 5,
      name: "Admin5",
      email: "admin5@example.com",
      hasAdminPermissions: true,
    },
    {
      id: 6,
      name: "Admin6",
      email: "admin6@example.com",
      hasAdminPermissions: true,
    },
    // Agrega más administradores aquí si lo deseas
  ];
  return (
    <div>
      <AdminRegistrationForm />
      <AdminList administradores={administradores} />
    </div>
  );
}

export default AdminContent;
