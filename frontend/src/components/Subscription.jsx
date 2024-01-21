import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Subscription() {
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    email: "",
    username: "",
    phone: "",
  });

  const { suscriptionName, suscriptionPrice } = useParams();

  const [errors, setErrors] = useState({});

  const { name, last_name, email, username, phone } = form;

  function handleInput(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({});
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const customerResponse = await fetch(
      "http://localhost:8000/api/customer/",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const customerData = await customerResponse.json();

    let customerErrors = null;
    switch (customerResponse.status) {
      case 400:
        customerErrors = customerData;
        setErrors(customerErrors);
        break;
      case 201:
        break;
      case 500:
        customerErrors = customerData;
        setErrors(customerErrors);
        break;
      default:
        break;
    }

    const priceResponse = await fetch("http://localhost:8000/api/price/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        price: suscriptionPrice,
        name: suscriptionName,
      }),
    });

    const priceData = await priceResponse.json();
    try {
      if (!customerErrors) {
        const alert = await Swal.fire({
          title: "Datos de formulario correctos",
          text: "¿Desea continuar con el pago?",
          icon: "success",
          confirmButtonText: "Ok",
          denyButtonText: "No",
          showConfirmButton: true,
          showDenyButton: true,
        });
        if (alert.isConfirmed) {
          //aqui va la logica del fetch de la tarjeta(checkout)
          const checkoutResponse = await fetch(
            "http://localhost:8000/api/checkout/",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                customer_id: customerData["id del cliente"],
                price_id: priceData["id del precio"],
                success_url: "http://localhost:5173/payment/success/",
              }),
            }
          );
          const checkoutData = await checkoutResponse.json();
          console.log(checkoutData);
          window.location.href = checkoutData["url de la sesión"];
        }
      }
    } catch (error) {
      Swat.fire({
        title: "Imposible redireccionar a la pasarela de pago",
        text: "Debe de rellenar todos los campos del formulario correctamente",
        icon: "error",
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-center ">Formulario de suscripción</h1>
      <div className="w-full max-w-md p-8 m-4 bg-white rounded shadow-md">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label
              htmlFor="Nombre del usuario"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Nombre del usuario
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Nombre del usuario"
              name="name"
              value={name}
              onChange={(e) => handleInput(e)}
            />
            {errors.name && (
              <p className="text-xs italic text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="Apellidos del usuario"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Apellidos del usuario
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Apellidos del usuario"
              name="last_name"
              value={last_name}
              onChange={(e) => handleInput(e)}
            />
            {errors.last_name && (
              <p className="text-xs italic text-red-500">{errors.last_name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="Email del usuario"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Email del usuario
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Email del usuario"
              name="email"
              value={email}
              onChange={(e) => handleInput(e)}
            />
            {errors.email && (
              <p className="text-xs italic text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="Username del usuario"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Username del usuario
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Username del usuario"
              name="username"
              value={username}
              onChange={(e) => handleInput(e)}
            />
            {errors.username && (
              <p className="text-xs italic text-red-500">{errors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="Telefono del usuario"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Telefono del usuario
            </label>
            <input
              type="tel"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Telefono del usuario"
              name="phone"
              value={phone}
              onChange={(e) => handleInput(e)}
            />
            {errors.phone && (
              <p className="text-xs italic text-red-500">{errors.phone}</p>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-auto px-2 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus :outline-none focus:shadow-outline"
            >
              Redireccionar a la pasarela de pago
            </button>
            <Link
              className="w-auto px-2 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus :outline-none focus:shadow-outline"
              to={"/"}
            >
              Cancelar{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
