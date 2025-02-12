import { MdOutlineInventory } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";

const optionsAdmin = [
  
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
      
      {
        to: "/Pedidos",
        icon: <BiSolidReport />,
        text: "Pedidos",
      },
    ],
  },
];

export { optionsAdmin };
