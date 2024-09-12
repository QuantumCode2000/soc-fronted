import React, { useMemo } from "react";
import { Chart } from "react-chartjs-2";
import { useInventory } from "../../contexts/InventoryContext/InventoryContext";

interface ChartPorRazaProps {
  selectedTipoGanado: string;
  selectedUnidad: string;
}

const ChartPorRaza: React.FC<ChartPorRazaProps> = ({
  selectedTipoGanado,
  selectedUnidad,
}) => {
  const { inventario } = useInventory();

  const dataPorRaza = useMemo(() => {
    const razas = inventario
      .filter(
        (item) =>
          item.tipoGanado === selectedTipoGanado &&
          item.unidad === selectedUnidad,
      )
      .map((item) => item.raza);

    const razasUnicas = [...new Set(razas)];
    const cantidades = razasUnicas.map(
      (raza) => razas.filter((r) => r === raza).length,
    );

    return { razas: razasUnicas, cantidades };
  }, [inventario, selectedTipoGanado, selectedUnidad]);

  const chartData = {
    labels: dataPorRaza.razas,
    datasets: [
      {
        label: "Cantidad por Raza",
        data: dataPorRaza.cantidades,
        backgroundColor: "#8E44AD",
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

export default ChartPorRaza;
