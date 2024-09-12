import React, { useMemo } from "react";
import { Chart } from "react-chartjs-2";
import { useInventory } from "../../contexts/InventoryContext/InventoryContext";

interface ChartPorSexoProps {
  selectedTipoGanado: string;
  selectedUnidad: string;
}

const ChartPorSexo: React.FC<ChartPorSexoProps> = ({
  selectedTipoGanado,
  selectedUnidad,
}) => {
  const { inventario } = useInventory();

  const dataPorSexo = useMemo(() => {
    const machos = inventario.filter(
      (item) =>
        item.sexo === "Macho" &&
        item.tipoGanado === selectedTipoGanado &&
        item.unidad === selectedUnidad,
    ).length;

    const hembras = inventario.filter(
      (item) =>
        item.sexo === "Hembra" &&
        item.tipoGanado === selectedTipoGanado &&
        item.unidad === selectedUnidad,
    ).length;

    return { machos, hembras };
  }, [inventario, selectedTipoGanado, selectedUnidad]);

  const chartData = {
    labels: ["Machos", "Hembras"],
    datasets: [
      {
        label: "Cantidad por Sexo",
        data: [dataPorSexo.machos, dataPorSexo.hembras],
        backgroundColor: ["#4F98CA", "#EA4C89"],
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

export default ChartPorSexo;
