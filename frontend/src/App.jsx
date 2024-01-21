import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//local layout imports
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//local pages imports
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import TaskDetail from "./pages/TaskDetail";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register";
import Subscription from "./components/Subscription";
import SuccessSubcripion from "./components/SuccessSubcripion";

//authentification and routes
import { AuthContextProvider } from "./context/authContext";
import PublicRoute from "./context/routes/PublicRoute";
import PrivateRoute from "./context/routes/PrivateRoute";

export default function App() {
  return (
    <div>
      <AuthContextProvider>
        <Router>
          <Navbar />
          <Routes>
            {/*RUTAS PUBLICAS */}
            <Route path="/" element={<PublicRoute />}>
              <Route index element={<Home />} />
              {/*CRUD DE TAREAS */}
              {/*LISTA TAREAS */}
              <Route path="/tasks" element={<Tasks />} />
              {/*SHOW DE TAREA */}
              <Route path="/task/:id" element={<TaskDetail />} />
              {/*CREAR TAREA */}
              <Route path="/createtask" element={<CreateTask />} />
              {/*EDITAR TAREA */}
              <Route path="/edittask/:id" element={<EditTask />} />
              {/*CRUD DE PROYECTOS */}
              {/*LISTA PROYECTOS */}
              <Route path="/projects" element={<Projects />} />
              {/*SHOW DE PROYECTO */}
              <Route path="/project/:id" element={<ProjectDetail />} />
              {/*CREAR PROYECTO */}
              <Route path="/createproject" element={<CreateProject />} />
              {/*EDITAR PROYECTO */}
              <Route path="/editproject/:id" element={<EditProject />} />
              {/*Login and register */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            {/*Subcripciones */}
            <Route
              path="/payments/:suscriptionName/:suscriptionPrice"
              element={<Subscription />}
            />
            <Route path="/payment/success" element={<SuccessSubcripion />} />
          </Routes>
          <Footer />
        </Router>
      </AuthContextProvider>
    </div>
  );
}
