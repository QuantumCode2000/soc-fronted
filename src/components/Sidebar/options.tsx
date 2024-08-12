import { CgNotes } from "react-icons/cg";
import { MdOutlineInventory } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { BiSolidReport } from "react-icons/bi";

const optionsGeneration = (unidad: string) => {
  return [
    {
      text: "Ganado Bovino",
      options: [
        {
          to: `/inventario/bovino/${unidad}`,
          icon: <MdOutlineInventory />,
          text: "Inventario",
        },
        {
          to: `/parte-inmediato/bovino/${unidad}`,
          icon: <CgNotes />,
          text: "Parte Inmediato",
        },
        {
          to: `parte-actualizado/bovino/${unidad}`,
          icon: <RxUpdate />,
          text: "Parte Actualizado",
        },
      ],
    },
    {
      text: "Ganado Cuyicola",
      options: [
        {
          to: `/inventario/cuyicola/${unidad}`,
          icon: <MdOutlineInventory />,
          text: "Inventario",
        },
        {
          to: `/parte-inmediato/cuyicola/${unidad}`,
          icon: <CgNotes />,
          text: "Parte Inmediato",
        },
        {
          to: `parte-actualizado/cuyicola/${unidad}`,
          icon: <RxUpdate />,
          text: "Parte Actualizado",
        },
      ],
    },
    {
      text: "Ganado Porcino",
      options: [
        {
          to: `/inventario/porcino/${unidad}`,
          icon: <MdOutlineInventory />,
          text: "Inventario",
        },
        {
          to: `/parte-inmediato/porcino/${unidad}`,
          icon: <CgNotes />,
          text: "Parte Inmediato",
        },
        {
          to: `parte-actualizado/porcino/${unidad}`,
          icon: <RxUpdate />,
          text: "Parte Actualizado",
        },
      ],
    },
    {
      text: "Ganado Avicola",
      options: [
        {
          to: `/inventario/avicola/${unidad}`,
          icon: <MdOutlineInventory />,
          text: "Inventario",
        },
        {
          to: `/parte-inmediato/avicola/${unidad}`,
          icon: <CgNotes />,
          text: "Parte Inmediato",
        },
        {
          to: `parte-actualizado/avicola/${unidad}`,
          icon: <RxUpdate />,
          text: "Parte Actualizado",
        },
      ],
    },
    {
      text: "Ganado Equino",
      options: [
        {
          to: `/inventario/equino/${unidad}`,
          icon: <MdOutlineInventory />,
          text: "Inventario",
        },
        {
          to: `/parte-inmediato/equino/${unidad}`,
          icon: <CgNotes />,
          text: "Parte Inmediato",
        },
        {
          to: `parte-actualizado/equino/${unidad}`,
          icon: <RxUpdate />,
          text: "Parte Actualizado",
        },
      ],
    },
    {
      text: "Ganado Psicola",
      options: [
        {
          to: `/inventario/psicola/${unidad}`,
          icon: <MdOutlineInventory />,
          text: "Inventario",
        },
        {
          to: `/parte-inmediato/psicola/${unidad}`,
          icon: <CgNotes />,
          text: "Parte Inmediato",
        },
        {
          to: `parte-actualizado/psicola/${unidad}`,
          icon: <RxUpdate />,
          text: "Parte Actualizado",
        },
      ],
    },
  ];
};

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
  {
    text: "Reportes",
    options: [
      {
        to: "/reportes",
        icon: <BiSolidReport />,
        text: "Reportes",
      },
      {
        to: "/reportes-novedades",
        icon: <BiSolidReport />,
        text: "Reportes Novedades",
      },
    ],
  },
  {
    text: "Cuadro de Mando ",
    options: [
      {
        to: "/cuadro-de-mando",
        icon: <BiSolidReport />,
        text: "Cuadro de Mando",
      },
    ],
  },
];

export { optionsAdmin, optionsGeneration };
