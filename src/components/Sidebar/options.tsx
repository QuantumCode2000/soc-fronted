// import { FaBuildingFlag } from "react-icons/fa6";
// const options = [
//   {
//     text: "Gestión de Personal",
//   },
//   {
//     to: "/registro-personal",
//     icon: <FaBuildingFlag />,
//     text: "Registro Personal",
//   },
//   {
//     text: "Gestión de Armas",
//   },
//   {
//     to: "/armas-salida",
//     icon: <FaBuildingFlag />,
//     text: "Armas Salida",
//   },
//   {
//     to: "/armas-entrada",
//     icon: <FaBuildingFlag />,
//     text: "Armas Entrada",
//   },
//   {
//     to: "/historial-movimientos",
//     icon: <FaBuildingFlag />,
//     text: "Historial Movimientos",
//   },
//   {
//     to: "/registro-armas",
//     icon: <FaBuildingFlag />,
//     text: "Registro Armas",
//   },
// ];

// export { options };
import { FaBuildingFlag } from "react-icons/fa6";

const options = [
  {
    text: "Gestión de Personal",
    options: [
      {
        to: "/registro-personal",
        icon: <FaBuildingFlag />,
        text: "Registro Personal",
      },
    ],
  },
  {
    text: "Gestión de Armas",
    options: [
      {
        to: "/armas-salida",
        icon: <FaBuildingFlag />,
        text: "Armas Salida",
      },
      {
        to: "/armas-entrada",
        icon: <FaBuildingFlag />,
        text: "Armas Entrada",
      },
      {
        to: "/historial-movimientos",
        icon: <FaBuildingFlag />,
        text: "Historial Movimientos",
      },
      {
        to: "/registro-armas",
        icon: <FaBuildingFlag />,
        text: "Registro Armas",
      },
    ],
  },
];

export { options };
