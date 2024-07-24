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
    text: "Gestión de Ganado",
    options: [
      {
        to: "/registro-ganado",
        icon: <FaBuildingFlag />,
        text: "Registro Ganado",
      },
      {
        to: "/parte-inmediato",
        icon: <FaBuildingFlag />,
        text: "Parte Inmediato",
      },
      {
        to: "parte-actualizado",
        icon: <FaBuildingFlag />,
        text: "Parte Actualizado",
      },
    ],
  },
];

export { options };
