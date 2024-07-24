import { useInventory } from "../../contexts/InventoryContext/InventoryContext";
import { usePartesInmediatos } from "../../contexts/PartesInmediatos/PartesInmediatosContext";
import Content from "../../components/Content/Content";

const headersParteActualizado = {
  detalle: "DETALLE",
  rango: "RANGO",
  efectivoInventario: "EFECTIVO INVENTARIO",
  deceso: "DECESO",
  descarte: "DESCARTE",
  nacimiento: "NACIMIENTO",
  compra: "COMPRA",
  falta: "FALTA",
  efectivoActual: "EFECTIVO ACTUAL",
  observaciones: "OBS.",
};

const ParteActualizado = () => {
  const { inventario } = useInventory();
  const { partesInmediatos } = usePartesInmediatos();

  // Función para calcular los datos de la tabla a partir de los datos del inventario y partes inmediatos
  const calcularDatosTabla = () => {
    const categorias = {
      TERNEROS: {
        rango: "0 - 1 AÑO",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      TERNERAS: {
        rango: "",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      TORILLOS: {
        rango: "1 - 3 AÑOS",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      VAQUILLAS: {
        rango: "",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      TOROS: {
        rango: "3 - 10 AÑOS",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      VACAS: {
        rango: "",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      BUEYES: {
        rango: "1 año adelante",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
    };

    // Función para asignar la categoría según la edad y sexo
    const asignarCategoria = (item) => {
      const edad = parseFloat(item.edadActual);
      if (edad <= 1) {
        return item.sexo === "MACHO" ? "TERNEROS" : "TERNERAS";
      } else if (edad <= 3) {
        return item.sexo === "MACHO" ? "TORILLOS" : "VAQUILLAS";
      } else if (edad <= 10) {
        return item.sexo === "MACHO" ? "TOROS" : "VACAS";
      } else {
        return "BUEYES";
      }
    };

    // Rellenar datos de inventario
    inventario.forEach((item) => {
      const categoria = categorias[asignarCategoria(item)];
      if (categoria) {
        categoria.efectivoInventario += 1;
        categoria.efectivoActual += 1;
      }
    });

    // Rellenar datos de partes inmediatos
    partesInmediatos.forEach((item) => {
      const categoria = categorias[asignarCategoria(item)];
      if (categoria) {
        switch (item.novedad) {
          case "DECESO":
            categoria.deceso += 1;
            categoria.efectivoActual -= 1;
            break;
          case "DESCARTE":
            categoria.descarte += 1;
            categoria.efectivoActual -= 1;
            break;
          case "NACIMIENTO":
            categoria.nacimiento += 1;
            categoria.efectivoActual += 1;
            break;
          case "COMPRA":
            categoria.compra += 1;
            categoria.efectivoActual += 1;
            break;
          case "FALTA":
            categoria.falta += 1;
            categoria.efectivoActual -= 1;
            break;
          default:
            break;
        }
      }
    });

    // Convertir a un array para renderizar
    const datosTabla = Object.keys(categorias).map((key) => ({
      detalle: key,
      rango: categorias[key].rango,
      efectivoInventario: categorias[key].efectivoInventario,
      deceso: categorias[key].deceso,
      descarte: categorias[key].descarte,
      nacimiento: categorias[key].nacimiento,
      compra: categorias[key].compra,
      falta: categorias[key].falta,
      efectivoActual: categorias[key].efectivoActual,
      observaciones: categorias[key].observaciones,
    }));

    return datosTabla;
  };

  const datosTabla = calcularDatosTabla();

  return (
    <Content>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {Object.values(headersParteActualizado).map((title, index) => (
                <th
                  key={index}
                  className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datosTabla.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200">
                {Object.keys(headersParteActualizado).map((key, colIndex) => (
                  <td
                    key={colIndex}
                    className="py-2 px-4 text-sm text-gray-800"
                  >
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Content>
  );
};

export default ParteActualizado;
