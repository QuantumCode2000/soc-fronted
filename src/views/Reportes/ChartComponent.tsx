import React, { useRef, useEffect } from "react";
import Chart, { ChartType, ChartData, ChartOptions } from "chart.js/auto";

interface ChartComponentProps {
  type: ChartType;
  data: ChartData;
  options: ChartOptions;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  type,
  data,
  options,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        // Destruir la instancia anterior del gráfico si existe
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type,
          data,
          options,
        });
      }
    }

    // Limpiar la instancia del gráfico al desmontar el componente
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
