import { FaBuildingFlag } from "react-icons/fa6";
import { TfiDashboard } from "react-icons/tfi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
const options = [
  // {
  //   to: "/unidades",
  //   icon: <FaBuildingFlag />,
  //   text: "Unidades",
  // },
  // {
  //   to: "/",
  //   icon: <TfiDashboard />,
  //   text: "Cuadro de Mando",
  // },
  // {
  //   to: "/reportes",
  //   icon: <HiOutlineDocumentReport />,
  //   text: "Reportes",
  // },
  {
    to: "/",
    icon: <TbLogout />,
    text: "Salir",
  },
  {
    to: "armas-salida",
    icon: <FaBuildingFlag />,
    text: "Armas Salida",
  },
  {
    to: "armas-entrada",
    icon: <FaBuildingFlag />,
    text: "Armas Entrada",
  },
  {
    to: "historial-movimientos",
    icon: <FaBuildingFlag />,
    text: "Historial Movimientos",
  },
  {
    to: "registro-armas",
    icon: <FaBuildingFlag />,
    text: "Registro Armas",
  },
  {
    to: "registro-personal",
    icon: <FaBuildingFlag />,
    text: "Registro Personal",
  },
];

export { options };
