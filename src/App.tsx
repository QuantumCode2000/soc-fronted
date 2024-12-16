import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import PersonalRegister from "./views/PersonalRegister/PersonalRegister";
import PrivateRoute from "./routers/PrivateRoute/PrivateRoute";
import PublicRoute from "./routers/PublicRoute/PublicRoute";
import Layout from "./layout/Layout";
import { useUsers } from "./contexts/UsersContext/UsersContext";

import InventarioRegister from "./views/InventatioRegister/InventarioRegister";
import PedidosRegister from "./views/Pedidos/PedidosRegister";
import Pedidos from "./views/Pedidos/Pedidos";
function App() {
  const { users } = useUsers();
  const currentLocalStorageUser = localStorage.getItem("user");
  const currentUser = currentLocalStorageUser
    ? users.find(
        (user) => user.email === JSON.parse(currentLocalStorageUser).email,
      )
    : null;

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
              <p>q</p>
            </PrivateRoute>
          ),
        },
        {
          path: "parte-general",
          element: (
            <PrivateRoute requiredRole="Administrador">
              <p>q</p>
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
              <p>q</p>
            </PrivateRoute>
          ),
        },
        {
          path: "cuadro-de-mando",
          element: (
            <PrivateRoute requiredRole="Administrador">
              <p>q</p>
            </PrivateRoute>
          ),
        },
        {
          path: "reportes-novedades",
          element: (
            <PrivateRoute requiredRole="Administrador">
              <p>q</p>
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
        {
          path: "Registrar-pedidos",
          element: (
            <PrivateRoute requiredRole="Administrador">
              <PedidosRegister />
            </PrivateRoute>
          ),
        },
        {
          path: "pedidos",
          element: (
            <PrivateRoute requiredRole="Administrador">
              <Pedidos />
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
