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
    text: "Ganado Bovino",
    options: [
      {
        to: "/inventario/bovino/bee i",
        icon: <MdOutlineInventory />,
        text: "Inventario",
      },
      {
        to: "/parte-inmediato/bovino/bee i",
        icon: <CgNotes />,
        text: "Parte Inmediato",
      },
      {
        to: "parte-actualizado/bovino/bee i",
        icon: <RxUpdate />,
        text: "Parte Actualizado",
      },
    ],
  },
  {
    text: "Ganado Cuyicola",
    options: [
      {
        to: "/inventario/cuyicola/bee i",
        icon: <MdOutlineInventory />,
        text: "Inventario",
      },
      {
        to: "/parte-inmediato/cuyicola/bee i",
        icon: <CgNotes />,
        text: "Parte Inmediato",
      },
      {
        to: "parte-actualizado/cuyicola/bee i",
        icon: <RxUpdate />,
        text: "Parte Actualizado",
      },
    ],
  },
  {
    text: "Ganado Porcino",
    options: [
      {
        to: "/inventario/porcino/bee i",
        icon: <MdOutlineInventory />,
        text: "Inventario",
      },
      {
        to: "/parte-inmediato/porcino/bee i",
        icon: <CgNotes />,
        text: "Parte Inmediato",
      },
      {
        to: "parte-actualizado/porcino/bee i",
        icon: <RxUpdate />,
        text: "Parte Actualizado",
      },
    ],
  },
  {
    text: "Ganado Avicola",
    options: [
      {
        to: "/inventario/avicola/bee i",
        icon: <MdOutlineInventory />,
        text: "Inventario",
      },
      {
        to: "/parte-inmediato/avicola/bee i",
        icon: <CgNotes />,
        text: "Parte Inmediato",
      },
      {
        to: "parte-actualizado/avicola/bee i",
        icon: <RxUpdate />,
        text: "Parte Actualizado",
      },
    ],
  },
  {
    text: "Ganado Equino",
    options: [
      {
        to: "/inventario/equino/bee i",
        icon: <MdOutlineInventory />,
        text: "Inventario",
      },
      {
        to: "/parte-inmediato/equino/bee i",
        icon: <CgNotes />,
        text: "Parte Inmediato",
      },
      {
        to: "parte-actualizado/equino/bee i",
        icon: <RxUpdate />,
        text: "Parte Actualizado",
      },
    ],
  },
  {
    text: "Ganado Psicola",
    options: [
      {
        to: "/inventario/psicola/bee i",
        icon: <MdOutlineInventory />,
        text: "Inventario",
      },
      {
        to: "/parte-inmediato/psicola/bee i",
        icon: <CgNotes />,
        text: "Parte Inmediato",
      },
      {
        to: "parte-actualizado/psicola/bee i",
        icon: <RxUpdate />,
        text: "Parte Actualizado",
      },
    ],
  },
];

const optionsAdmin = [
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
];

export { options, optionsAdmin };
