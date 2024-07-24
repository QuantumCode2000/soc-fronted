import { CgNotes } from "react-icons/cg";
import { MdOutlineInventory } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";

const options = [
  {
    text: " Personal",
    options: [
      {
        to: "/registro-personal",
        icon: <RiUserSettingsFill />,
        text: "Registro Personal",
      },
    ],
  },
  {
    text: "Gestión de Ganado",
    options: [
      {
        to: "/inventario",
        icon: <MdOutlineInventory />,
        text: "Inventario",
      },
      {
        to: "/parte-inmediato",
        icon: <CgNotes />,
        text: "Parte Inmediato",
      },
      {
        to: "parte-actualizado",
        icon: <RxUpdate />,
        text: "Parte Actualizado",
      },
    ],
  },
];

export { options };
