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
    text: "Parte General",
    options: [
      {
        to: "/parte-general",
        icon: <MdOutlineInventory />,
        text: "Visualizar Parte",
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
  {
    text: "KPI Reportes",
    options: [
      {
        to: "/reportes-kpi",
        icon: <BiSolidReport />,
        text: "KPI Reportes",
      },
    ],
  },
];

export { optionsAdmin, optionsGeneration };
