import React from "react";
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

// Unidades para las que se generarán las tablas
const unidades = [
  "BBE I",
  "BPE II",
  "BPE III",
  "BPE IV",
  "BPE V",
  "BPE VI",
  "BPE VII",
];

const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const getCategorias = () => {
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
};

const ParteGeneral = () => {
  const { inventario } = useInventory();
  const { partesInmediatos } = usePartesInmediatos();

  const calcularDatosTabla = (unidad) => {
    const categorias = getCategorias();

    const inventarioFiltrado = inventario.filter(
      (item) => item.tipoGanado === "Bovino" && item.unidad === unidad,
    );
    const partesInmediatosFiltrados = partesInmediatos.filter(
      (item) => item.tipoGanado === "Bovino" && item.unidad === unidad,
    );

    const asignarCategoria = (item) => {
      const edad = calculateAge(item.fechaNac);
      if (edad <= 1) {
        return item.sexo === "Macho" ? "TERNEROS" : "TERNERAS";
      } else if (edad <= 3) {
        return item.sexo === "Macho" ? "TORILLOS" : "VAQUILLAS";
      } else if (edad <= 10) {
        return item.sexo === "Macho" ? "TOROS" : "VACAS";
      } else {
        return "BUEYES";
      }
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

  return (
    <Content>
      <div className="flex flex-col">
        {unidades.map((unidad, index) => {
          const datosTabla = calcularDatosTabla(unidad);
          return (
            <div key={index} className="mb-10">
              <h2 className="text-xl font-bold mb-4">{unidad}</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      {Object.values(headersParteActualizado).map(
                        (title, index) => (
                          <th
                            key={index}
                            className="py-2 px-4 bg-gray-800 text-white border-b border-gray-200 text-left text-sm uppercase font-semibold"
                          >
                            {title}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {datosTabla.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={`border-b ${
                          rowIndex % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                        } ${
                          row.detalle === "Ef. Total"
                            ? "bg-yellow-200 font-bold"
                            : ""
                        }`}
                      >
                        {Object.keys(headersParteActualizado).map(
                          (key, colIndex) => (
                            <td
                              key={colIndex}
                              className={`py-2 px-4 text-sm ${
                                key === "efectivoInventario" ||
                                key === "efectivoActual"
                                  ? "bg-green-100 font-semibold"
                                  : "text-gray-800"
                              }`}
                            >
                              {row[key]}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </Content>
  );
};

export default ParteGeneral;
