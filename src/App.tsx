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
import Cortes from "./views/Cortes/Cortes";
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
          path: "registro-personal",
          element: (
            <PrivateRoute requiredRole="administrador">
              <PersonalRegister />
            </PrivateRoute>
          ),
        },
        {
          path: "inventario",
          element: (
            <PrivateRoute requiredRole="administrador">
              <InventarioRegister />
            </PrivateRoute>
          ),
        },
        {
          path: "Registrar-pedidos",
          element: (
            <PrivateRoute requiredRole="administrador">
              <PedidosRegister />
            </PrivateRoute>
          ),
        },
        {
          path: "pedidos",
          element: (
            <PrivateRoute requiredRole="administrador">
              <Pedidos />
            </PrivateRoute>
          ),
        },
        {
          path: "cortes",
          element: (
            <PrivateRoute requiredRole="administrador">
              <Cortes />
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
