import React, { useMemo } from "react";
import { Chart } from "react-chartjs-2";
import { usePartesInmediatos } from "../../contexts/PartesInmediatos/PartesInmediatosContext";
import { useInventory } from "../../contexts/InventoryContext/InventoryContext";

const calculateAge = (birthdate: string) => {
  const birthDate = new Date(birthdate);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  return age;
};

interface ChartDecesosPorEdadProps {
  selectedTipoGanado: string;
  selectedUnidad: string;
}

const ChartDecesosPorEdad: React.FC<ChartDecesosPorEdadProps> = ({
  selectedTipoGanado,
  selectedUnidad,
}) => {
  const { partesInmediatos } = usePartesInmediatos();

  const dataDecesosPorEdad = useMemo(() => {
    const rango0_1 = partesInmediatos.filter(
      (item) =>
        item.novedad === "Deceso" &&
        calculateAge(item.fechaNac) <= 1 &&
        item.tipoGanado === selectedTipoGanado &&
        item.unidad === selectedUnidad,
    ).length;

    const rango1_3 = partesInmediatos.filter(
      (item) =>
        item.novedad === "Deceso" &&
        calculateAge(item.fechaNac) > 1 &&
        calculateAge(item.fechaNac) <= 3 &&
        item.tipoGanado === selectedTipoGanado &&
        item.unidad === selectedUnidad,
    ).length;

    const rango3mas = partesInmediatos.filter(
      (item) =>
        item.novedad === "Deceso" &&
        calculateAge(item.fechaNac) > 3 &&
        item.tipoGanado === selectedTipoGanado &&
        item.unidad === selectedUnidad,
    ).length;

    return { rango0_1, rango1_3, rango3mas };
  }, [partesInmediatos, selectedTipoGanado, selectedUnidad]);

  const chartData = {
    labels: ["0-1 años", "1-3 años", "3+ años"],
    datasets: [
      {
        label: "Decesos por Edad",
        data: [
          dataDecesosPorEdad.rango0_1,
          dataDecesosPorEdad.rango1_3,
          dataDecesosPorEdad.rango3mas,
        ],
        backgroundColor: ["#EF9A9A", "#F48FB1", "#CE93D8"],
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Chart type="bar" data={chartData} options={options} />;
};

export default ChartDecesosPorEdad;
