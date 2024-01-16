import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditProject() {
  //1)declarar el estado inicial de la entidad
  const [project, setProject] = useState({
    title: "",
    description: "",
    done: false,
    tasks: [], // atribde rel MtM
  });

  //para redireccionar al usuario
  let navigate = useNavigate();

  //2)pillamos id
  const { id } = useParams();

  //3)desplegamos los errores del formulario
  const [errors, setErrors] = useState({});

  // 4) creamos las instancias de los atributos de la entidad SIN RELACION MtM
  const { title, description } = project;

  //5)creamos la funcion que se encargara de actualizar el estado de la entidad
  function handleChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setProject({
      ...project,
      [e.target.name]: value,
    });
    //limpiamos los errores
    setErrors({});
  }

  //6)hacemos peticion a la API(show) para obtener la entidad
  async function getProjectById() {
    const response = await fetch(`https://mario.pythonanywhere.com/api/projects/${id}/`, {
      method: "GET",
    });
    const data = await response.json();
    setProject(data);
  }

  //7)llamamos a la funcion en el useEfect(para que se cargen los datos al cargar la pagina)
  useEffect(() => {
    getProjectById();
  }, []);

  //8)creamos la funcion que se encarga de llamar al metodo de la API REST de editar
  async function editProject(e) {
    e.preventDefault();
    Swal.fire({
      title: "¿Estas seguro de que quieres editar el proyecto?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(
          `https://mario.pythonanywhere.com/api/projects/${id}/`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(project),
          }
        );

        //9)validamos los los campos de los errores
        if (response.status === 400) {
          const data = await response.json();
          setErrors(data);
          return;
        }
        navigate("/projects");
        Swal.fire({
          title: "Editar proyecto",
          text: "has editado el proyecto con exito",
          icon: "success",
        });
      } else if (result.isDenied) {
        navigate("/");
      }
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 m-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Editar proyecto</h2>
        <form onSubmit={(e) => editProject(e)}>
          {/* llamada a la funcion que se encargara de hacer el post a la api*/}
          <div className="mb-4">
            <label
              htmlFor="Titulo"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Titulo
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Escribe un titulo"
              name="title" // nombre del atributo de la entidad del backend
              value={title} // valor del atributo de la entidad del backend
              onChange={(e) => handleChange(e)} // llamada a la funcion que se encargara de actualizar el estado de la entidad
            />
            {/* validacion del campo del formulario */}
            {errors.title && (
              <p className="text-red-500 text-xs italic">{errors.title}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="Descripcion"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Descripcion
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Escribe una descripcion"
              name="description"
              value={description}
              onChange={(e) => handleChange(e)}
            />
            {/* validacion del campo del formulario */}
            {errors.description && (
              <p className="text-red-500 text-xs italic">
                {errors.description}
              </p>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-auto px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Editar proyecto
            </button>
            <Link
              className="w-auto px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
              to="/tasks"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
