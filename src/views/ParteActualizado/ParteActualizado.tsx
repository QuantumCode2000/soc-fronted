import { useInventory } from "../../contexts/InventoryContext/InventoryContext";
import { usePartesInmediatos } from "../../contexts/PartesInmediatos/PartesInmediatosContext";
import Content from "../../components/Content/Content";

const headersParteActualizado = {
  detalle: "Detalle",
  rango: "Rango",
  efectivoInventario: "Ef. Inventario",
  deceso: "Deceso",
  descarte: "Descarte",
  nacimiento: "Nacimiento",
  compra: "Compra",
  falta: "Falta",
  venta: "Venta",
  efectivoActual: "Efectivo Actual",
  observaciones: "Obs.",
};

const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const getCategorias = (tipoGanado) => {
  if (tipoGanado === "Bovino") {
    return {
      TERNEROS: {
        rango: "0 - 1 AÑO",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      TERNERAS: {
        rango: "0 - 1 AÑO",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
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
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      VAQUILLAS: {
        rango: "1 - 3 AÑOS",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
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
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      VACAS: {
        rango: "3 - 10 AÑOS",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      BUEYES: {
        rango: "1 AÑO ADELANTE",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
    };
  } else if (tipoGanado === "Cuyicola") {
    return {
      HEMBRA_REPRODUCTOR: {
        rango: "12 SEM - 2 AÑOS",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      MACHO_REPRODUCTOR: {
        rango: "12 SEM - 2 AÑOS",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      RECRIA_HEMBRA: {
        rango: "2 - 12 SEM",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      RECRIA_MACHO: {
        rango: "2 - 12 SEM",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      GAZAPOS: {
        rango: "0 - 2 SEM",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
    };
  } else if (tipoGanado === "Equino") {
    return {
      MACHOS: {
        rango: "1 > AÑOS",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      HEMBRAS: {
        rango: "1 > AÑOS",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      CRIAS_MACHOS: {
        rango: "0 - 1 AÑO",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      CRIAS_HEMBRAS: {
        rango: "0 - 1 AÑO",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
    };
  } else if (tipoGanado === "Porcino") {
    return {
      LECHONES_HEMBRAS: {
        rango: "0 - 90 DIAS",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      LECHONES_MACHOS: {
        rango: "0 - 90 DIAS",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      HEMBRAS_DE_ENGORDE: {
        rango: "90 - 150 DIAS",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      MACHOS_DE_ENGORDE: {
        rango: "90 - 150 DIAS",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      REEMPLAZO_REPROD_HEMBRAS: {
        rango: "150 - 730 DIAS (2 AÑOS)",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      REEMPLAZO_REPROD_MACHOS: {
        rango: "150 - 730 DIAS (2 AÑOS)",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      HEMBRAS_REPRODUCTORAS: {
        rango: "2 - 10 AÑOS",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      MACHOS_REPRODUCTORES: {
        rango: "2 - 10 AÑOS",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
      CERDOS_MAYORES: {
        rango: "10 AÑOS >",
        efectivoInventario: 0,
        deceso: 0,
        descarte: 0,
        nacimiento: 0,
        compra: 0,
        falta: 0,
        venta: 0,
        efectivoActual: 0,
        observaciones: "",
      },
    };
  } else if (tipoGanado === "Avicola") {
    return {
      // Agrega las categorías y rangos de edad para aves aquí
    };
  } else if (tipoGanado === "Piscicola") {
    return {
      // Agrega las categorías y rangos de edad para peces aquí
    };
  }
};

const ParteActualizado = ({ unidad, tipoGanado }) => {
  const { inventario } = useInventory();
  const { partesInmediatos } = usePartesInmediatos();

  const inventarioFiltrado = inventario.filter(
    (item) => item.unidad === unidad && item.tipoGanado === tipoGanado,
  );
  const partesInmediatosFiltrados = partesInmediatos.filter(
    (item) => item.unidad === unidad && item.tipoGanado === tipoGanado,
  );

  const calcularDatosTabla = () => {
    const categorias = getCategorias(tipoGanado);

    const asignarCategoria = (item) => {
      const edad = calculateAge(item.fechaNac);
      if (tipoGanado === "Bovino") {
        if (edad <= 1) {
          return item.sexo === "Macho" ? "TERNEROS" : "TERNERAS";
        } else if (edad <= 3) {
          return item.sexo === "Macho" ? "TORILLOS" : "VAQUILLAS";
        } else if (edad <= 10) {
          return item.sexo === "Macho" ? "TOROS" : "VACAS";
        } else {
          return "BUEYES";
        }
      } else if (tipoGanado === "Cuyicola") {
        if (edad <= 2 / 12) {
          return "GAZAPOS";
        } else if (edad <= 1) {
          return item.sexo === "MACHO" ? "RECRIA_MACHO" : "RECRIA_HEMBRA";
        } else {
          return item.sexo === "MACHO"
            ? "MACHO_REPRODUCTOR"
            : "HEMBRA_REPRODUCTOR";
        }
      } else if (tipoGanado === "Equino") {
        if (edad <= 1) {
          return item.sexo === "MACHO" ? "CRIAS_MACHOS" : "CRIAS_HEMBRAS";
        } else {
          return item.sexo === "MACHO" ? "MACHOS" : "HEMBRAS";
        }
      } else if (tipoGanado === "Porcino") {
        if (edad <= 90 / 365) {
          return item.sexo === "MACHO" ? "LECHONES_MACHOS" : "LECHONES_HEMBRAS";
        } else if (edad <= 150 / 365) {
          return item.sexo === "MACHO"
            ? "MACHOS_DE_ENGORDE"
            : "HEMBRAS_DE_ENGORDE";
        } else if (edad <= 730 / 365) {
          return item.sexo === "MACHO"
            ? "REEMPLAZO_REPROD_MACHOS"
            : "REEMPLAZO_REPROD_HEMBRAS";
        } else if (edad <= 10) {
          return item.sexo === "MACHO"
            ? "MACHOS_REPRODUCTORES"
            : "HEMBRAS_REPRODUCTORAS";
        } else {
          return "CERDOS_MAYORES";
        }
      }
      // Agrega más condiciones para otros tipos de ganado según sea necesario
    };

    inventarioFiltrado.forEach((item) => {
      const categoria = categorias[asignarCategoria(item)];
      if (categoria) {
        categoria.efectivoInventario += 1;
        categoria.efectivoActual += 1;
      }
    });

    partesInmediatosFiltrados.forEach((item) => {
      const categoria = categorias[asignarCategoria(item)];
      if (categoria) {
        switch (item.novedad) {
          case "Deceso":
            categoria.deceso += 1;
            categoria.efectivoActual -= 1;
            break;
          case "Descarte":
            categoria.descarte += 1;
            categoria.efectivoActual -= 1;
            break;
          case "Nacimiento":
            categoria.nacimiento += 1;
            break;
          case "Compra":
            categoria.compra += 1;
            break;
          case "Falta":
            categoria.falta += 1;
            categoria.efectivoActual -= 1;
            break;
          case "Venta":
            categoria.venta += 1;
            categoria.efectivoActual -= 1;
            break;
          default:
            break;
        }
      }
    });

    const total = {
      detalle: "Ef. Total",
      rango: "",
      efectivoInventario: 0,
      deceso: 0,
      descarte: 0,
      nacimiento: 0,
      compra: 0,
      falta: 0,
      venta: 0,
      efectivoActual: 0,
      observaciones: "",
    };

    const datosTabla = Object.keys(categorias).map((key) => {
      const categoria = categorias[key];
      total.efectivoInventario += categoria.efectivoInventario;
      total.deceso += categoria.deceso;
      total.descarte += categoria.descarte;
      total.nacimiento += categoria.nacimiento;
      total.compra += categoria.compra;
      total.falta += categoria.falta;
      total.venta += categoria.venta;
      total.efectivoActual += categoria.efectivoActual;
      return {
        detalle: key,
        rango: categoria.rango,
        efectivoInventario: categoria.efectivoInventario,
        deceso: categoria.deceso,
        descarte: categoria.descarte,
        nacimiento: categoria.nacimiento,
        compra: categoria.compra,
        falta: categoria.falta,
        venta: categoria.venta,
        efectivoActual: categoria.efectivoActual,
        observaciones: categoria.observaciones,
      };
    });

    datosTabla.push(total);

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
                  className="py-2 px-4 bg-gray-800 text-white border-b border-gray-200 text-left text-sm uppercase font-semibold"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datosTabla.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-b ${
                  rowIndex % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                } ${
                  row.detalle === "Ef. Total" ? "bg-yellow-200 font-bold" : ""
                }`}
              >
                {Object.keys(headersParteActualizado).map((key, colIndex) => (
                  <td
                    key={colIndex}
                    className={`py-2 px-4 text-sm ${
                      key === "efectivoInventario" || key === "efectivoActual"
                        ? "bg-green-100 font-semibold"
                        : "text-gray-800"
                    }`}
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
