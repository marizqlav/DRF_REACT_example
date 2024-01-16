import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
} from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("access_token") ?? false
  );

  /*
    // LÓGICA DE LOS ROLES EN EL CONTEXT ///////

  /const [role, setRole] = useState(
    localStorage.getItem("role") ?? {
      isCaptain: false,
      isSupervisor: false,
    }
  );

  const { isCaptain, isSupervisor } = role;/
  //!!!!!!!!!!!!!!!!!AGREGAR TODO EL CÓDIGO COMENTADO EN EL CASO DE QUE TENGAS ROLES EN TU MODELO DE USUARIO!!!
  // CADA OBJETO QUE LE ENVIAMOS AL ESTADO DEL ROL ES UN ROL DEL BACKEND CON EL MISMO NOMBRE
  // INSTANCIAR EL ESTADO DEL ROL EN EL "const {isCaptain, isSupervisor} = role;" EN EL CASO DE QUE HAYA MAS ROLES

     */

  const login = useCallback(function (
    token_access,
    token_refresh
    //, role /*pasarñe en el login el rol del usuario con el que estemos en el caso que aplique la logica de los roles para el contexto*/
  ) {
    localStorage.setItem("access_token", token_access);
    localStorage.setItem("refresh_token", token_refresh);
    //localStorage.setItem("role", role); // si se usa la logica de los roles, descomentar esta linea
    setIsAuthenticated(true);
    //setRole(role); // si se usa la logica de los roles, descomentar esta linea
  }, []);

  const logout = useCallback(function () {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    //localStorage.removeItem("role"); // si se usa la logica de los roles, descomentar esta linea
    setIsAuthenticated(false);
    //setRole({ isCaptain: false, isSupervisor: false }); // si se usa la logica de los roles, descomentar esta linea
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      //isCaptain, // si se usa la logica de los roles, descomentar esta linea
      //isSupervisor, // si se usa la logica de los roles, descomentar esta linea
    }),
    [isAuthenticated, login, logout /*isCaptain, isSupervisor*/]
    // si se usa la logica de los roles, descomentar esta linea
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuthContext() {
  return useContext(AuthContext);
}
