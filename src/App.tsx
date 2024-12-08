import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import PersonalRegister from "./views/PersonalRegister/PersonalRegister";
import Inventario from "./views/Inventario/Inventario";
import PartesInmediatos from "./views/ParteInmmediato/PartesInmediatos";
import ParteActualizado from "./views/ParteActualizado/ParteActualizado";
import PrivateRoute from "./routers/PrivateRoute/PrivateRoute";
import PublicRoute from "./routers/PublicRoute/PublicRoute";
import Layout from "./layout/Layout";
import { useUsers } from "./contexts/UsersContext/UsersContext";
import Reportes from "./views/Reportes/Reportes";
import ReporteNovedades from "./views/Reportes/ReportesNovedades";
import CuadroDeMandoContainer from "./views/CuadrodeMando/CuadroDeMandoContainer";
import ReportesKPI from "./views/Reportes/ReportesKPI";
import ParteGeneral from "./views/ParteGeneral/ParteGeneral";

import InventarioRegister from "./views/InventatioRegister/InventarioRegister";
import FormInventarioRegister from "./views/InventatioRegister/FormInventarioRegister";
import FormInventarioEdit from "./views/InventatioRegister/FormInventarioEdit";

function App() {
  const { users } = useUsers();
  const currentLocalStorageUser = localStorage.getItem("user");
  const currentUser = currentLocalStorageUser
    ? users.find(
        (user) => user.email === JSON.parse(currentLocalStorageUser).email,
      )
    : null;

  const tiposGanado = [
    "Bovino",
    "Cuyicola",
    "Porcino",
    "Avicola",
    "Equino",
    "Psicola",
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Layout unidad={"dsds"} />
        </PrivateRoute>
      ),
      children: [
        {
          path: "Reportes-KPI",
          element: (
            <PrivateRoute requiredRole="Administrador">
              <ReportesKPI />
            </PrivateRoute>
          ),
        },
        {
          path: "parte-general",
          element: (
            <PrivateRoute requiredRole="Administrador">
              <ParteGeneral />
            </PrivateRoute>
          ),
        },
        {
          path: "registro-personal",
          element: (
            <PrivateRoute requiredRole="Administrador">
              <PersonalRegister />
            </PrivateRoute>
          ),
        },
        {
          path: "reportes",
          element: (
            <PrivateRoute requiredRole="Administrador">
              <Reportes />
            </PrivateRoute>
          ),
        },
        {
          path: "cuadro-de-mando",
          element: (
            <PrivateRoute requiredRole="Administrador">
              <CuadroDeMandoContainer />
            </PrivateRoute>
          ),
        },
        {
          path: "reportes-novedades",
          element: (
            <PrivateRoute requiredRole="Administrador">
              <ReporteNovedades />
            </PrivateRoute>
          ),
        },

        {
          path: "inventario",
          element: (
            <PrivateRoute requiredRole="Administrador">
              <InventarioRegister />
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
    {
      path: "*",
      element: <div>404 - Página no encontrada</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
