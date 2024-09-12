import React, { useMemo } from "react";
import { Chart } from "react-chartjs-2";
import { useInventory } from "../../contexts/InventoryContext/InventoryContext";

const calculateAge = (birthdate: string) => {
  const birthDate = new Date(birthdate);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  return age;
};

interface ChartPorEdadProps {
  selectedTipoGanado: string;
  selectedUnidad: string;
}

const ChartPorEdad: React.FC<ChartPorEdadProps> = ({
  selectedTipoGanado,
  selectedUnidad,
}) => {
  const { inventario } = useInventory();

  const dataPorEdad = useMemo(() => {
    const rango0_1 = inventario.filter(
      (item) =>
        calculateAge(item.fechaNac) <= 1 &&
        item.tipoGanado === selectedTipoGanado &&
        item.unidad === selectedUnidad,
    ).length;

    const rango1_3 = inventario.filter(
      (item) =>
        calculateAge(item.fechaNac) > 1 &&
        calculateAge(item.fechaNac) <= 3 &&
        item.tipoGanado === selectedTipoGanado &&
        item.unidad === selectedUnidad,
    ).length;

    const rango3mas = inventario.filter(
      (item) =>
        calculateAge(item.fechaNac) > 3 &&
        item.tipoGanado === selectedTipoGanado &&
        item.unidad === selectedUnidad,
    ).length;

    return { rango0_1, rango1_3, rango3mas };
  }, [inventario, selectedTipoGanado, selectedUnidad]);

  const chartData = {
    labels: ["0-1 años", "1-3 años", "3+ años"],
    datasets: [
      {
        label: "Cantidad por Edad",
        data: [dataPorEdad.rango0_1, dataPorEdad.rango1_3, dataPorEdad.rango3mas],
        backgroundColor: ["#66BB6A", "#FFCA28", "#EF5350"],
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

export default ChartPorEdad;
