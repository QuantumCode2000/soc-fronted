import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import PersonalRegister from "./views/PersonalRegister/PersonalRegister";
import Inventario from "./views/Inventario/Inventario";
import PartesInmediatos from "./views/ParteInmmediato/PartesInmediatos";
import ParteActualizado from "./views/ParteActualizado/ParteActualizado";
import PrivateRoute from "./routers/PrivateRoute/PrivateRoute";
import PublicRoute from "./routers/PublicRoute/PublicRoute";
import Layout from "./layout/Layout";
import { useUsers } from "./contexts/UsersContext/UsersContext";

function App() {
  const { users } = useUsers();
  const currentLocalStorageUser = localStorage.getItem("user");
  const currentUser = currentLocalStorageUser
    ? users.find(
        (user) => user.email === JSON.parse(currentLocalStorageUser).email,
      )
    : null;
  const unidad = currentUser?.unidad;

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
          <Layout unidad={unidad}/>
        </PrivateRoute>
      ),
      children: currentUser
        ? [
            {
              path: "registro-personal",
              element: (
                <PrivateRoute requiredRole="Administrador">
                  <PersonalRegister />
                </PrivateRoute>
              ),
            },
            ...tiposGanado.flatMap((tipoGanado) => [
              {
                path: `inventario/${tipoGanado.toLowerCase()}/${unidad}`,
                element: (
                  <PrivateRoute requiredRole="Personal">
                    <Inventario unidad={unidad} tipoGanado={tipoGanado} />
                  </PrivateRoute>
                ),
              },
              {
                path: `parte-inmediato/${tipoGanado.toLowerCase()}/${unidad}`,
                element: (
                  <PrivateRoute requiredRole="Personal">
                    <PartesInmediatos unidad={unidad} tipoGanado={tipoGanado} />
                  </PrivateRoute>
                ),
              },
              {
                path: `parte-actualizado/${tipoGanado.toLowerCase()}/${unidad}`,
                element: (
                  <PrivateRoute requiredRole="Personal">
                    <ParteActualizado unidad={unidad} tipoGanado={tipoGanado} />
                  </PrivateRoute>
                ),
              },
            ]),
          ]
        : [],
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

  return <RouterProvider router={router} />;
}

export default App;
