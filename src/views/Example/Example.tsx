import Table from "../../components/Table/Table";
import { weapons } from "../../data/data";
const renderCell = (item, key) => {
  switch (key) {
    case "acciones":
      return (
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white px-2 py-1 rounded">
            Ver
          </button>
          <button className="bg-red-500 text-white px-2 py-1 rounded">
            Eliminar
          </button>
        </div>
      );
    case "enlace":
      return (
        <a href={item[key]} className="text-blue-500 underline">
          {item[key]}
        </a>
      );
    default:
      return item[key];
  }
};

const Example = () => {
  const headers = {
    codigo: "Código",
    tipoDeArma: "Tipo de Arma",
    estado: "Estado",
    clasificacion: "Clasificación",
    propietario: "Propietario",
    acciones: "Acciones",
    enlace: "Enlace",
  };

  const data = weapons.map((weapon) => ({
    ...weapon,
    enlace: "https://example.com",
  }));

  return (
    <div className="container mx-auto p-6">
      <Table header={headers} body={data} renderCell={renderCell} />
    </div>
  );
};

export default Example;
