import React from "react";
import { useInventory } from "../../contexts/InventoryContext/InventoryContext";
import { usePartesInmediatos } from "../../contexts/PartesInmediatos/PartesInmediatosContext";
import Content from "../../components/Content/Content";

interface Categoria {
  rango: string;
  efectivoInventario: number;
  deceso: number;
  descarte: number;
  nacimiento: number;
  compra: number;
  falta: number;
  venta: number;
  efectivoActual: number;
  efectivoVerificado: number; // Nuevo campo para Ef. Verificado
  observaciones: string;
}

const headersParteActualizado = {
  detalle: "Detalle",
  rango: "Rango",
  efectivoInventario: "Ef. Inventario",
  deceso: "Deceso",
  descarte: "Descarte",
  compra: "Compra",
  falta: "Falta",
  efectivoActual: "Efectivo Actual",
  efectivoVerificado: "Ef. Verificado",
};

const headersNacimientos = {
  detalle: "Detalle",
  rango: "Rango",
  nacimiento: "Nacimiento",
};

const headersHembras = {
  detalle: "Detalle",
  efectivo: "Efectivo",
  subtotalGc: "SUBTOTAL GC",
  total: "Total",
  nacimientoFecha: "NACIM. A LA FECHA",
  ejecucion: "% EJEC.",
  meta2024: "META 2024",
};

const calculateAge = (birthdate: string): number => {
  const birthDate = new Date(birthdate);
  const currentDate = new Date();
  const yearDifference = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();
  const dayDifference = currentDate.getDate() - birthDate.getDate();
  let age = yearDifference;
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age -= 1;
  }
  const months = monthDifference < 0 ? 12 + monthDifference : monthDifference;
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const days = dayDifference < 0 ? daysInMonth + dayDifference : dayDifference;

  const ageInDecimals = age + months / 12 + days / (12 * daysInMonth);

  return parseFloat(ageInDecimals.toFixed(2));
};

const getCategorias = (
  tipoGanado: string,
): { [key: string]: Categoria } | undefined => {
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
        efectivoVerificado: 0,
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
        efectivoVerificado: 0,
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
        efectivoVerificado: 0,
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
        efectivoVerificado: 0,
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
        efectivoVerificado: 0,
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
        efectivoVerificado: 0,
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
        efectivoVerificado: 0,
        observaciones: "",
      },
    };
  }
  return undefined;
};

interface ParteActualizadoProps {
  unidad: string;
  tipoGanado: string;
}

const ParteActualizado: React.FC<ParteActualizadoProps> = ({
  unidad,
  tipoGanado,
}) => {
  const { inventario } = useInventory();
  const { partesInmediatos } = usePartesInmediatos();

  const inventarioFiltrado = inventario.filter(
    (item: any) => item.unidad === unidad && item.tipoGanado === tipoGanado,
  );
  const partesInmediatosFiltrados = partesInmediatos.filter(
    (item: any) => item.unidad === unidad && item.tipoGanado === tipoGanado,
  );

  const calcularDatosTabla = () => {
    const categorias = getCategorias(tipoGanado);

    const asignarCategoria = (item: any): string | undefined => {
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
      }
      return undefined;
    };

    inventarioFiltrado.forEach((item: any) => {
      const categoriaKey = asignarCategoria(item);
      if (categoriaKey && categorias) {
        const categoria = categorias[categoriaKey];
        categoria.efectivoInventario += 1;
        categoria.efectivoActual += 1;
        if (calculateAge(item.fechaNac) >= 1) {
          categoria.efectivoVerificado += 1;
        }
      }
    });

    partesInmediatosFiltrados.forEach((item: any) => {
      const categoriaKey = asignarCategoria(item);
      if (categoriaKey && categorias) {
        const categoria = categorias[categoriaKey];
        switch (item.novedad) {
          case "Deceso":
            categoria.deceso += 1;
            categoria.efectivoActual -= 1;
            if (calculateAge(item.fechaNac) >= 1) {
              categoria.efectivoVerificado -= 1;
            }
            break;
          case "Descarte":
            categoria.descarte += 1;
            categoria.efectivoActual -= 1;
            if (calculateAge(item.fechaNac) >= 1) {
              categoria.efectivoVerificado -= 1;
            }
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
            if (calculateAge(item.fechaNac) >= 1) {
              categoria.efectivoVerificado -= 1;
            }
            break;
          case "Venta":
            categoria.venta += 1;
            categoria.efectivoActual -= 1;
            if (calculateAge(item.fechaNac) >= 1) {
              categoria.efectivoVerificado -= 1;
            }
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
      efectivoVerificado: 0,
      deceso: 0,
      descarte: 0,
      nacimiento: 0,
      compra: 0,
      falta: 0,
      venta: 0,
      efectivoActual: 0,
      observaciones: "",
    };

    const datosTabla = categorias
      ? Object.keys(categorias).map((key) => {
          const categoria = categorias[key];
          total.efectivoInventario += categoria.efectivoInventario;
          total.efectivoVerificado += categoria.efectivoVerificado;
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
            efectivoVerificado: categoria.efectivoVerificado,
            deceso: categoria.deceso,
            descarte: categoria.descarte,
            nacimiento: categoria.nacimiento,
            compra: categoria.compra,
            falta: categoria.falta,
            venta: categoria.venta,
            efectivoActual: categoria.efectivoActual,
            observaciones: categoria.observaciones,
          };
        })
      : [];

    datosTabla.push(total);

    return datosTabla;
  };

  const calcularDatosNacimientos = () => {
    const categorias = getCategorias(tipoGanado);

    return [
      {
        detalle: "TERNEROS",
        rango: categorias?.TERNEROS?.rango || "",
        nacimiento: categorias?.TERNEROS?.nacimiento || 0,
      },
      {
        detalle: "TERNERAS",
        rango: categorias?.TERNERAS?.rango || "",
        nacimiento: categorias?.TERNERAS?.nacimiento || 0,
      },
    ];
  };

  const calcularDatosHembras = () => {
    return [
      {
        detalle: "VACIAS P/MONTA",
        efectivo: 41,
        subtotalGc: 55,
        total: 121,
        nacimientoFecha: 0,
        ejecucion: "0%",
        meta2024: 44,
      },
      {
        detalle: "VACIAS POR LACTANCIA",
        efectivo: 13,
        subtotalGc: 0,
        total: 0,
        nacimientoFecha: 0,
        ejecucion: "0%",
        meta2024: 0,
      },
      {
        detalle: "PRE GESTACIÓN MONTA",
        efectivo: 0,
        subtotalGc: 0,
        total: 0,
        nacimientoFecha: 0,
        ejecucion: "0%",
        meta2024: 0,
      },
      {
        detalle: "PRE GESTACIÓN INSEMIN",
        efectivo: 0,
        subtotalGc: 0,
        total: 0,
        nacimientoFecha: 1,
        ejecucion: "2%",
        meta2024: 44,
      },
      {
        detalle: "GESTACION CONFIRMADA MONTA",
        efectivo: 33,
        subtotalGc: 56,
        total: 56,
        nacimientoFecha: 0,
        ejecucion: "0%",
        meta2024: 0,
      },
      {
        detalle: "GESTACION CONFIRMADA INSEMIN",
        efectivo: 23,
        subtotalGc: 0,
        total: 0,
        nacimientoFecha: 0,
        ejecucion: "0%",
        meta2024: 0,
      },
      {
        detalle: "NO APTAS",
        efectivo: 10,
        subtotalGc: 10,
        total: 10,
        nacimientoFecha: 0,
        ejecucion: "0%",
        meta2024: 0,
      },
    ];
  };

  const datosTabla = calcularDatosTabla();
  const datosNacimientos = calcularDatosNacimientos();
  const datosHembras = calcularDatosHembras();

  return (
    <Content>
      <div className=" h-full w-full">
        <div className="overflow-x-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Parte del Ganado
          </h3>
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
                        key === "efectivoInventario" ||
                        key === "efectivoVerificado" ||
                        key === "efectivoActual"
                          ? "bg-green-100 font-semibold"
                          : "text-gray-800"
                      }`}
                    >
                      {row[key as keyof typeof headersParteActualizado]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Parte Nacimientos */}
        <div className="overflow-x-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Parte Nacimientos
          </h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                {Object.values(headersNacimientos).map((title, index) => (
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
              {datosNacimientos.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`border-b ${
                    rowIndex % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                  }`}
                >
                  {Object.keys(headersNacimientos).map((key, colIndex) => (
                    <td
                      key={colIndex}
                      className="py-2 px-4 text-sm text-gray-800"
                    >
                      {row[key as keyof typeof headersNacimientos]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Parte Hembras */}
        <div className="overflow-x-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Parte Hembras
          </h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                {Object.values(headersHembras).map((title, index) => (
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
              {datosHembras.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`border-b ${
                    rowIndex % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                  }`}
                >
                  {Object.keys(headersHembras).map((key, colIndex) => (
                    <td
                      key={colIndex}
                      className="py-2 px-4 text-sm text-gray-800"
                    >
                      {row[key as keyof typeof headersHembras]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Content>
  );
};

export default ParteActualizado;
