import React, { useEffect, useMemo, useState } from "react";
import { useInventory } from "../../contexts/InventoryContext/InventoryContext";
import { usePartesInmediatos } from "../../contexts/PartesInmediatos/PartesInmediatosContext";
import ChartComponent from "./ChartComponent";
import Percent from "./Percent";
import Speedometer from "./Speedometer";
import "./Reportes.styles.css";
import ChartDecesosPorEdad from "./ChartDecesosPorEdad";
import ChartPorEdad from "./ChartPorEdad";
import ChartPorRaza from "./ChartPorRaza";
import ChartPorSexo from "./ChartPorSexo";
const tipoGanado = [
  "Bovino",
  "Porcino",
  "Equino",
  "Cuyicola",
  "Avicola",
  "Psicola",
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

const countEventsByMonth = (
  partesInmediatos: any[],
  eventType: string,
  tipoGanado: string,
  unidad: string,
) => {
  const eventsByMonth = Array(12).fill(0);
  partesInmediatos.forEach((item) => {
    if (
      item.novedad === eventType &&
      item.tipoGanado === tipoGanado &&
      item.unidad === unidad
    ) {
      const month = new Date(item.fechaSuceso).getMonth();
      eventsByMonth[month] += 1;
    }
  });
  return eventsByMonth;
};

const ReportesKPI: React.FC = () => {
  const { inventario } = useInventory();
  const { partesInmediatos } = usePartesInmediatos();
  const [selectedTipoGanado, setSelectedTipoGanado] = useState<string | null>(
    null,
  );
  const [selectedUnidad, setSelectedUnidad] = useState<string | null>(null);
  const [percent, setPercent] = useState(0);
  const [nacimientosPrevistos, setNacimientosPrevistos] = useState(0);
  const [nacimientosRegistrados, setNacimientosRegistrados] = useState(0);
  const [decesosRegistrados, setDecesosRegistrados] = useState(0);
  const [ventasRegistradas, setVentasRegistradas] = useState(0);

  const indiceNacimiento = 0.4;

  useEffect(() => {
    if (selectedTipoGanado && selectedUnidad) {
      const calcularVacas = () => {
        const vacas = inventario.filter(
          (item) =>
            item.sexo === "Hembra" &&
            item.enInventario === "Si" &&
            item.tipoGanado === selectedTipoGanado &&
            item.unidad === selectedUnidad &&
            new Date().getFullYear() - new Date(item.fechaNac).getFullYear() >
              3,
        );

        setNacimientosPrevistos(vacas.length * indiceNacimiento);
      };

      const calcularNacimientos = () => {
        const nacimientos = partesInmediatos.filter(
          (item) =>
            item.novedad === "Nacimiento" &&
            item.tipoGanado === selectedTipoGanado &&
            item.unidad === selectedUnidad,
        );
        setNacimientosRegistrados(nacimientos.length);
      };

      const calcularDecesos = () => {
        const muertes = partesInmediatos.filter(
          (item) =>
            item.novedad === "Deceso" &&
            item.tipoGanado === selectedTipoGanado &&
            item.unidad === selectedUnidad,
        );
        setDecesosRegistrados(muertes.length);
      };

      const calcularVentas = () => {
        const ventas = partesInmediatos.filter(
          (item) =>
            item.novedad === "Venta" &&
            item.tipoGanado === selectedTipoGanado &&
            item.unidad === selectedUnidad,
        );
        setVentasRegistradas(ventas.length);
      };

      calcularNacimientos();
      calcularVacas();
      calcularDecesos();
      calcularVentas();
    }
  }, [inventario, partesInmediatos, selectedTipoGanado, selectedUnidad]);

  const dataNacimientos = useMemo(() => {
    if (!selectedTipoGanado || !selectedUnidad) return null;
    const birthsByMonth = countEventsByMonth(
      partesInmediatos,
      "Nacimiento",
      selectedTipoGanado,
      selectedUnidad,
    );
    return {
      labels: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      datasets: [
        {
          label: "Nacimientos por Mes",
          data: birthsByMonth,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  }, [partesInmediatos, selectedTipoGanado, selectedUnidad]);

  const dataDecesos = useMemo(() => {
    if (!selectedTipoGanado || !selectedUnidad) return null;
    const deathsByMonth = countEventsByMonth(
      partesInmediatos,
      "Deceso",
      selectedTipoGanado,
      selectedUnidad,
    );
    return {
      labels: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      datasets: [
        {
          label: "Decesos por Mes",
          data: deathsByMonth,
          fill: false,
          borderColor: "rgb(192, 75, 75)",
          tension: 0.1,
        },
      ],
    };
  }, [partesInmediatos, selectedTipoGanado, selectedUnidad]);

  const dataVentas = useMemo(() => {
    if (!selectedTipoGanado || !selectedUnidad) return null;
    const salesByMonth = countEventsByMonth(
      partesInmediatos,
      "Venta",
      selectedTipoGanado,
      selectedUnidad,
    );
    return {
      labels: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      datasets: [
        {
          label: "Ventas por Mes",
          data: salesByMonth,
          fill: false,
          borderColor: "rgb(75, 75, 192)",
          tension: 0.1,
        },
      ],
    };
  }, [partesInmediatos, selectedTipoGanado, selectedUnidad]);

  const options: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-green-50">
      <div className="mb-4">
        {tipoGanado.map((tipo, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white py-2 px-4 rounded m-2"
            onClick={() => setSelectedTipoGanado(tipo)}
          >
            {tipo}
          </button>
        ))}
      </div>
      {selectedTipoGanado && (
        <div className="mb-4">
          <h1 className="text-xl font-semibold mb-2">Selecciona la Unidad:</h1>
          {unidades.map((unidad, index) => (
            <button
              key={index}
              className="bg-green-500 text-white py-2 px-4 rounded m-2"
              onClick={() => setSelectedUnidad(unidad)}
            >
              {unidad}
            </button>
          ))}
        </div>
      )}
      {selectedTipoGanado && selectedUnidad && (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Reportes para {selectedTipoGanado} en {selectedUnidad}
          </h1>
          <div className="grid grid-cols-12 grid-rows-3 gap-4 h-[400px] items-center justify-center p-5 bg-white rounded-lg shadow-lg">
            <div className="col-span-3 row-span-3">
              <Percent
                isNacimiento={true}
                cantidadActual={nacimientosRegistrados}
                cantidadMaxima={parseInt(nacimientosPrevistos.toFixed(0), 10)}
                setPercent={setPercent}
              />
            </div>
            <div className="col-span-6 row-span-3 col-start-4">
              <div className="bg-white">
                <ChartComponent
                  type="line"
                  data={dataNacimientos}
                  options={options}
                />
              </div>
            </div>
            <div className="col-span-3 row-span-3 col-start-10">
              <Speedometer
                speed={nacimientosRegistrados}
                infoText="Nacimientos"
                maxSpeed={nacimientosPrevistos}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 grid-rows-3 gap-4 h-[400px] items-center justify-center p-5 bg-white rounded-lg shadow-lg">
            <div className="col-span-3 row-span-3">
              <Percent
                cantidadActual={decesosRegistrados}
                cantidadMaxima={100}
                setPercent={setPercent}
              />
            </div>
            <div className="col-span-6 row-span-3 col-start-4">
              <div className="bg-white">
                <ChartComponent
                  type="line"
                  data={dataDecesos}
                  options={options}
                />
              </div>
            </div>
            <div className="col-span-3 row-span-3 col-start-10">
              <Speedometer
                speed={decesosRegistrados}
                infoText="Decesos"
                maxSpeed={100}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4 bg-gray-100 rounded-lg shadow-lg">
            <div className="flex items-center justify-center  text-white font-bold text-xl h-96 rounded-lg shadow-md">
              <ChartPorSexo
                selectedTipoGanado={selectedTipoGanado}
                selectedUnidad={selectedUnidad}
              />
            </div>
            <div className="flex items-center justify-center  text-white font-bold text-xl h-96 rounded-lg shadow-md">
              <ChartPorRaza
                selectedTipoGanado={selectedTipoGanado}
                selectedUnidad={selectedUnidad}
              />
            </div>
            <div className="flex items-center justify-center  text-white font-bold text-xl h-96 rounded-lg shadow-md">
              <ChartDecesosPorEdad
                selectedTipoGanado={selectedTipoGanado}
                selectedUnidad={selectedUnidad}
              />
            </div>
            <div className="flex items-center justify-center  text-white font-bold text-xl h-96 rounded-lg shadow-md">
              <ChartPorEdad
                selectedTipoGanado={selectedTipoGanado}
                selectedUnidad={selectedUnidad}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportesKPI;
