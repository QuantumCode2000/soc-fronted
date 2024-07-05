import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Unidades from "./views/Unidades/Unidades";
import Reportes from "./views/Reportes/Reportes";
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
