import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../authContext";

export default function ProtectedRoute() {
    const { isAuthenticated, /*isCaptain, isSupervisor */ } = useAuthContext();

    if (!isAuthenticated /*localStorage.getItem("role") !== "captain"*/
        ) {// cambiamos la condicion en funcion de que roles tienen permiso para acceder a la ruta
        return <Navigate to={"/"} />;
      }

    return (
        <div>
          <Outlet />
        </div>
      )
}
