import Table from "../../components/Table/Table";
import { useInventory } from "../../contexts/InventoryContext/InventoryContext";
import Content from "../../components/Content/Content";

const headersInventario = {
  nro: "N°",
  nombreUnidad: "Nombre de la Unidad",
  codigo: "Código",
  raza: "Raza",
  color: "Color",
  marcaCarimbo: "Marca y Carimbo",
  sexo: "Sexo",
  categoria: "Categoría",
  fechaNac: "Fecha de Nacimiento",
  edadActual: "Edad Actual (años)",
  tipoGanado: "Tipo de Ganado",
  enInventario: "En Inventario",
  unidad: "Unidad",
};

const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const renderCell = (item, key) => {
  if (key === "edadActual") {
    return calculateAge(item.fechaNac);
  }
  return item[key];
};

const Inventario = () => {
  const { inventario } = useInventory();

  return (
    <Content>
      <Table
        header={headersInventario}
        body={inventario}
        renderCell={renderCell}
      />
    </Content>
  );
};

export default Inventario;
