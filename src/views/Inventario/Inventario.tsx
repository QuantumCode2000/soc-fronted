import Table from "../../components/Table/Table";
import { useInventory } from "../../contexts/InventoryContext/InventoryContext";
import Content from "../../components/Content/Content";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCircleXmark } from "react-icons/fa6";

const headersInventario = {
  nro: "N°",
  unidad: "Nombre de la Unidad",
  codigo: "Código",
  raza: "Raza",
  color: "Color",
  marcaCarimbo: "Marca y Carimbo",
  sexo: "Sexo",
  categoria: "Categoría",
  fechaNac: "Fecha de Nacimiento",
  edadActual: "Edad Actual",
  tipoGanado: "Tipo de Ganado",
  enInventario: "En Inventario",
};

const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const now = new Date();
  const years = now.getFullYear() - birthDate.getFullYear();
  const months = now.getMonth() - birthDate.getMonth();
  const days = now.getDate() - birthDate.getDate();

  let ageInMonths = years * 12 + months;

  if (days < 0) {
    ageInMonths -= 1;
  }

  const displayYears = Math.floor(ageInMonths / 12);
  const displayMonths = ageInMonths % 12;

  if (displayYears > 0) {
    return `${displayYears} año${
      displayYears > 1 ? "s" : ""
    } con ${displayMonths} mes${displayMonths > 1 ? "es" : ""}`;
  }
  return `${displayMonths} mes${displayMonths > 1 ? "es" : ""}`;
};

const renderCell = (item, key) => {
  if (key === "edadActual") {
    return calculateAge(item.fechaNac);
  }
  if (key === "enInventario") {
    return item.enInventario === "Si" ? (
      <IoIosCheckmarkCircle className="text-green-500" />
    ) : (
      <FaCircleXmark className="text-red-500" />
    );
  }
  return item[key];
};

const Inventario = ({ tipoGanado, unidad }) => {
  const { inventario } = useInventory();

  const inventarioFilter = inventario.filter(
    (item) => item.tipoGanado === tipoGanado && item.unidad === unidad,
  );

  return (
    <Content>
      <Table
        header={headersInventario}
        body={inventarioFilter}
        renderCell={renderCell}
      />
    </Content>
  );
};

export default Inventario;
