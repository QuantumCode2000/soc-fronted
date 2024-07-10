import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Unidades from "./views/Unidades/Unidades";
import Reportes from "./views/Reportes/Reportes";
import WeaponExit from "./views/WeaponExit/WeaponExit";
import WeaponEntry from "./views/WeaponEntry/WeaponEntry";
import WeaponMovementHistory from "./views/WeaponMovementHistory/WeaponMovementHistory";
import Layout from "./layout/Layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "unidades",
        element: <Unidades />,
      },
      {
        path: "reportes",
        element: <Reportes />,
      },
      {
        path: "armas-salida",
        element: <WeaponExit />,
      },
      {
        path: "armas-entrada",
        element: <WeaponEntry />,
      },
      {
        path: "historial-movimientos",
        element: <WeaponMovementHistory />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
