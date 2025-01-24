import { MdOutlineInventory } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";

const optionsAdmin = [
  // {
  //   text: " Personal",
  //   options: [
  //     {
  //       to: "/registro-personal",
  //       icon: <RiUserSettingsFill />,
  //       text: "Registro Personal",
  //     },
  //   ],
  // },
  // {
  //   text: "Cortes",
  //   options: [
  //     {
  //       to: "/cortes",
  //       icon: <RiUserSettingsFill />,
  //       text: "Cortes",
  //     },
  //   ],
  // },
  {
    text: "Inventario",
    options: [
      {
        to: "/Inventario",
        icon: <MdOutlineInventory />,
        text: "Inventario",
      },
    ],
  },
  {
    text: "Pedidos",
    options: [
      // {
      //   to: "/Registrar-Pedidos",
      //   icon: <BiSolidReport />,
      //   text: "Registrar Pedidos",
      // },
      {
        to: "/Pedidos",
        icon: <BiSolidReport />,
        text: "Pedidos",
      },
    ],
  },
];

export { optionsAdmin };
