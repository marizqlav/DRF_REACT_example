import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  //1) creamos el estado del formulario de registro
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password2: "", //confirmacion de contraseña(atributo adicional que no viene en el backend)
  });

  //para redireccionar al usuario
  let navegate = useNavigate();

  //2) declaramos estado de los errores para validar los campos del formulario
  const [errors, setErrors] = useState({});

  //3) creamos las instancias de los atributos de los campos del formulario
  const { first_name, last_name, email, username, password, password2 } = form;

  //4)creamos la funcion que se encargara de actualizar el estado del formulario
  function onInputChange(e) {
    //onInputChange == handleChange
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({});
  }

  //5) creamos la funcion que se encargara de enviar los datos del formulario
  async function handleSubmit(e) {
    //onFormSubmit == handleSubmit
    e.preventDefault();
    Swal.fire({
      title: "¿Estas seguro de que quieres registrarte?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        //8)invocar a la funcion de validacion
        const errors = validateForm();

        //9)comprobar si el tamaño de JSON de los errores es >0  para actualizar el estado de los errores(=>existen errores)
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          return;
        }

        const response = await fetch("http://127.0.0.1:8000/auth/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        //6)validamos los cambios del data
        if (response.status === 400) {
          const data = await response.json();
          setErrors(data);
          return;
        }
        navegate("/login");

        Swal.fire({
          title: "Registrado",
          text: "te has registrado con exito, debes de iniciar sesion para autenticarte",
          icon: "success",
        });
      } else if (result.isDenied) {
        navegate("/");
      }
    });
  }

  //7) crear la funcion auxiliar que se encargara de validar las validaciones extra que no se valida en el backend
  function validateForm() {
    let errors = {};
    //RN-1: first_name campo obligatorio
    if (!form.first_name) {
      errors.first_name = "El campo nombre es obligatorio";
      //RN-2: first_name mas de 3 caracteres
    } else if (form.first_name.length <= 3) {
      errors.first_name = "El campo nombre debe de tener mas de 3 caracteres";
    }
    //RN-3: msima RN q la RN 1 pero pal last_name
    if (!form.last_name) {
      errors.last_name = "El campo apellido es obligatorio";
      //RN-4: misma RN q la RN 2 pero pal last_name
    } else if (form.last_name.length <= 3) {
      errors.last_name = "El campo apellido debe de tener mas de 3 caracteres";
    }
    //RN-5: email validando q sea de gmail, outlook y hotmail sabiedno q esta es la fun en python:
    //r'^\w+([.-]?\w+)*@(gmail|hotmail|outlook)\.com$
    if (!form.email) {
      errors.email = "El campo email es obligatorio";
    } else if (
      !/^\w+([.-]?\w+)*@(gmail|hotmail|outlook)\.com$/.test(form.email)
    ) {
      errors.email = "El campo email debe de ser de gmail, outlook o hotmail";
    }
    //RN-6) password = password2//validar q las contraseñas sean iguales
    if (form.password !== form.password2) {
      errors.password2 = "Las contraseñas no coinciden";
    }

    return errors;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 m-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Registro de usuario
        </h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* llamada a la funcion que se encargara de hacer el login a la API*/}
          <div className="mb-4">
            <label
              htmlFor="Nombre de usuario"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Escribe tu nombre de usuario"
              name="first_name" // nombre del atributo de la entidad del backend
              value={first_name} // valor del atributo de la entidad del backend
              onChange={(e) => onInputChange(e)} // llamada a la funcion que se encargara de actualizar el estado de la entidad
            />
            {/* validacion del campo del formulario */}
            {errors.first_name && (
              <p className="text-red-500 text-xs italic">{errors.first_name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="Apellidos"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Apellidos del usuario
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Introduce tus apellidos"
              name="last_name" // nombre del atributo de la entidad del backend
              value={last_name} // valor del atributo de la entidad del backend
              onChange={(e) => onInputChange(e)} // llamada a la funcion que se encargara de actualizar el estado de la entidad
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs italic">{errors.last_name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="Username"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Username del usuario
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Introduce tu username"
              name="username" // nombre del atributo de la entidad del backend
              value={username} // valor del atributo de la entidad del backend
              onChange={(e) => onInputChange(e)} // llamada a la funcion que se encargara de actualizar el estado de la entidad
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">{errors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="Contraseña"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Escribe tu contraseña"
              name="password" // nombre del atributo de la entidad del backend
              value={password} // valor del atributo de la entidad del backend
              onChange={(e) => onInputChange(e)} // llamada a la funcion que se encargara de actualizar el estado de la entidad
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="Contraseña2"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Repite la contraseña
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Repite tu contraseña"
              name="password2" // nombre del atributo de la entidad del backend
              value={password2} // valor del atributo de la entidad del backend
              onChange={(e) => onInputChange(e)} // llamada a la funcion que se encargara de actualizar el estado de la entidad
            />
            {errors.password2 && (
              <p className="text-red-500 text-xs italic">{errors.password2}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="Email"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Email del usuario
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Escribe tu email"
              name="email" // nombre del atributo de la entidad del backend
              value={email} // valor del atributo de la entidad del backend
              onChange={(e) => onInputChange(e)} // llamada a la funcion que se encargara de actualizar el estado de la entidad
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-auto px-2 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Registrarse
            </button>
            <Link
              className="w-auto px-1 py-3 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
              to="/"
            >
              Cancelar
            </Link>
            <Link
              className="w-auto px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline text-center"
              to="/login"
            >
              Ya tienes cuenta? Inicia sesion
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
