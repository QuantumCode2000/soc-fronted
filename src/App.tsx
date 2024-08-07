import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import PersonalRegister from "./views/PersonalRegister/PersonalRegister";
import Inventario from "./views/Inventario/Inventario";
import PartesInmediatos from "./views/ParteInmmediato/PartesInmediatos";
import ParteActualizado from "./views/ParteActualizado/ParteActualizado";
import PrivateRoute from "./routers/PrivateRoute/PrivateRoute";
import PublicRoute from "./routers/PublicRoute/PublicRoute";
import Layout from "./layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "registro-personal",
        element: (
          <PrivateRoute requiredRole="Administrador">
            <PersonalRegister />
          </PrivateRoute>
        ),
      },
      {
        path: "inventario",
        element: (
          <PrivateRoute requiredRole="Administrador">
            <Inventario />
          </PrivateRoute>
        ),
      },
      {
        path: "parte-inmediato",
        element: (
          <PrivateRoute requiredRole="Administrador">
            <PartesInmediatos />
          </PrivateRoute>
        ),
      },
      {
        path: "parte-actualizado",
        element: (
          <PrivateRoute requiredRole="Administrador">
            <ParteActualizado />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <PublicRoute />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    path: "unauthorized",
    element: <div>No estás autorizado para ver esta página</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
