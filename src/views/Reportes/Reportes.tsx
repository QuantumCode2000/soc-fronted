import React from "react";
import ChartComponent from "./ChartComponent";
import { ChartType, ChartOptions, Chart } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useInventory } from "../../contexts/InventoryContext/InventoryContext";

Chart.register(ChartDataLabels);

const generateChartData = (data: number[], label: string) => ({
  type: "pie" as ChartType,
  data: {
    labels: ["Cuyicola", "Bovino", "Equino", "Avicola", "Porcino", "Psicola"],
    datasets: [
      {
        label,
        data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
        borderAlign: "inner",
        borderJoinStyle: "round",
        borderRadius: 5,
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        hoverBorderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        hoverBorderWidth: 3,
        hoverOffset: 10,
        offset: [5, 10, 15, 20, 25, 30],
        rotation: 45,
        spacing: 2,
        weight: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: label },
      datalabels: {
        color: "white",
        formatter: (value: number) => value.toString(),
        font: {
          weight: "bold",
        },
      },
    },
    cutout: "50%",
    radius: "100%",
    animation: {
      animateRotate: true,
      animateScale: false,
    },
  } as ChartOptions,
});

const processInventory = (inventory) => {
  const units = Array.from(new Set(inventory.map((item) => item.unidad)));
  const types = [
    "Cuyicola",
    "Bovino",
    "Equino",
    "Avicola",
    "Porcino",
    "Psicola",
  ];

  return units.map((unit) => {
    const counts = types.map(
      (type) =>
        inventory.filter(
          (item) =>
            item.unidad === unit &&
            item.tipoGanado === type &&
            item.enInventario === "Si",
        ).length,
    );
    return {
      unit,
      counts,
    };
  });
};

const Reportes: React.FC = () => {
  const { inventario } = useInventory();
  const processedData = processInventory(inventario);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {processedData.map((data, index) => (
        <div key={index} className="bg-white p-4 shadow-lg rounded-lg">
          <ChartComponent
            type={generateChartData(data.counts, `Unidad ${data.unit}`).type}
            data={generateChartData(data.counts, `Unidad ${data.unit}`).data}
            options={
              generateChartData(data.counts, `Unidad ${data.unit}`).options
            }
          />
        </div>
      ))}
    </div>
  );
};

export default Reportes;
