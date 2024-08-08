import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { usePartesInmediatos } from "../../contexts/PartesInmediatos/PartesInmediatosContext";

const novedadesTipos = [
  "DECESO",
  "NACIMIENTO",
  "DESCARTE",
  "FALTA",
  "INSEMINACION",
  "PREGESTACION",
  "GESTACION",
  "COMPRA",
  "VENTA",
];

const unidades = [
  "BBE I",
  "BPE II",
  "BPE III",
  "BPE IV",
  "BPE V",
  "BPE VI",
  "BPE VII",
  "HARAS DEL EJERCITO",
];

const types = ["Cuyicola", "Bovino", "Equino", "Avicola", "Porcino", "Psicola"];

const ReporteNovedades = () => {
  const { partesInmediatos } = usePartesInmediatos();
  const [selectedUnidad, setSelectedUnidad] = useState(null);
  const parteInmediato = partesInmediatos;

  const processNovedades = () => {
    return unidades.map((unidad) => {
      const unidadNovedades = parteInmediato.filter(
        (item) => item.unidad === unidad,
      );
      const novedadesPorTipoGanado = types.map((tipoGanado) => {
        const novedadesPorTipo = novedadesTipos.map((tipo) => {
          const novedades = unidadNovedades.filter(
            (item) =>
              item.novedad.toUpperCase() === tipo &&
              item.tipoGanado.toUpperCase() === tipoGanado.toUpperCase(),
          );
          return {
            tipo,
            novedades,
          };
        });
        return {
          tipoGanado,
          novedadesPorTipo,
        };
      });
      return {
        unidad,
        novedadesPorTipoGanado,
      };
    });
  };

  const novedadesData = processNovedades();

  const generateChartData = (unidad, novedadesPorTipoGanado) => {
    const labels = novedadesTipos;
    const datasets = novedadesPorTipoGanado.map((tipoGanadoData) => {
      return {
        label: `${tipoGanadoData.tipoGanado}`,
        data: tipoGanadoData.novedadesPorTipo.map((n) => n.novedades.length),
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255,
        )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
        borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255,
        )}, ${Math.floor(Math.random() * 255)}, 1)`,
        borderWidth: 1,
      };
    });

    return {
      labels,
      datasets,
    };
  };

  const handleUnidadClick = (unidad) => {
    setSelectedUnidad(unidad);
  };

  const handleBackClick = () => {
    setSelectedUnidad(null);
  };

  if (selectedUnidad) {
    const unidadData = novedadesData.find(
      (data) => data.unidad === selectedUnidad,
    );

    return (
      <div className="p-6 bg-gray-100">
        <button
          onClick={handleBackClick}
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Regresar
        </button>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Unidad: {unidadData.unidad}
          </h2>
          <div className="mb-6">
            <Bar
              data={generateChartData(
                unidadData.unidad,
                unidadData.novedadesPorTipoGanado,
              )}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: `Novedades en ${unidadData.unidad}`,
                  },
                },
              }}
            />
          </div>
          {unidadData.novedadesPorTipoGanado.map((tipoGanadoData, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                {tipoGanadoData.tipoGanado}
              </h3>
              {tipoGanadoData.novedadesPorTipo.map((novedad, i) => (
                <div key={i} className="mb-4">
                  <h4 className="text-xl font-semibold mb-2 text-gray-600">
                    {novedad.tipo}
                  </h4>
                  {novedad.novedades.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border rounded-lg overflow-hidden shadow-md">
                        <thead>
                          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-4 text-left">Nro</th>
                            <th className="py-3 px-4 text-left">Fecha</th>
                            <th className="py-3 px-4 text-left">Motivo</th>
                            <th className="py-3 px-4 text-left">Código</th>
                            <th className="py-3 px-4 text-left">Raza</th>
                            <th className="py-3 px-4 text-left">Color</th>
                            <th className="py-3 px-4 text-left">Sexo</th>
                            <th className="py-3 px-4 text-left">Categoría</th>
                            <th className="py-3 px-4 text-left">Tipo Ganado</th>
                            <th className="py-3 px-4 text-left">Unidad</th>
                            <th className="py-3 px-4 text-left">Nro Arete</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                          {novedad.novedades.map((item, idx) => (
                            <tr
                              key={idx}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="py-3 px-4 text-left">
                                {item.nro}
                              </td>
                              <td className="py-3 px-4 text-left">
                                {item.fechaSuceso}
                              </td>
                              <td className="py-3 px-4 text-left">
                                {item.motivo}
                              </td>
                              <td className="py-3 px-4 text-left">
                                {item.codigo}
                              </td>
                              <td className="py-3 px-4 text-left">
                                {item.raza}
                              </td>
                              <td className="py-3 px-4 text-left">
                                {item.color}
                              </td>
                              <td className="py-3 px-4 text-left">
                                {item.sexo}
                              </td>
                              <td className="py-3 px-4 text-left">
                                {item.categoria}
                              </td>
                              <td className="py-3 px-4 text-left">
                                {item.tipoGanado}
                              </td>
                              <td className="py-3 px-4 text-left">
                                {item.unidad}
                              </td>
                              <td className="py-3 px-4 text-left">
                                {item.nroArete}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-600">
                      No hay novedades de tipo {novedad.tipo} para{" "}
                      {tipoGanadoData.tipoGanado} en esta unidad.
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 grid grid-cols-2 gap-6">
      {novedadesData.map((data, index) => (
        <div
          key={index}
          onClick={() => handleUnidadClick(data.unidad)}
          className="cursor-pointer bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Unidad: {data.unidad}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ReporteNovedades;
