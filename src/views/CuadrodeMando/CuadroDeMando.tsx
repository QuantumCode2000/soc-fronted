import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsSolidGauge from "highcharts/modules/solid-gauge";

// Inicializa los módulos de Highcharts
HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

const CuadroDeMando: React.FC<{ title: string; data: number }> = ({
  title,
  data,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<Highcharts.Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = Highcharts.chart(chartRef.current, {
        chart: {
          type: "gauge",
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false,
          height: "80%",
        },
        title: {
          text: title,
        },
        pane: {
          startAngle: -90,
          endAngle: 89.9,
          background: null,
          center: ["50%", "75%"],
          size: "110%",
        },
        yAxis: {
          min: 0,
          max: 200,
          tickPixelInterval: 72,
          tickPosition: "inside",
          tickColor:
            Highcharts.defaultOptions.chart?.backgroundColor || "#FFFFFF",
          tickLength: 20,
          tickWidth: 2,
          minorTickInterval: null,
          labels: {
            distance: 20,
            style: {
              fontSize: "14px",
            },
          },
          lineWidth: 0,
          plotBands: [
            {
              from: 0,
              to: 130,

              color: "#DF5353", // red
              thickness: 20,
            },
            {
              from: 150,
              to: 200,
              color: "#55BF3B", // green

              thickness: 20,
            },
            {
              from: 120,
              to: 160,
              color: "#DDDF0D", // yellow

              thickness: 20,
            },
          ],
        },
        series: [
          {
            name: "-",
            data: [data],
            tooltip: {
              valueSuffix: " Nacimientos",
            },
            dataLabels: {
              format: "{y} Nacimientos",
              borderWidth: 0,
              color:
                (Highcharts.defaultOptions.title &&
                  Highcharts.defaultOptions.title.style &&
                  Highcharts.defaultOptions.title.style.color) ||
                "#333333",
              style: {
                fontSize: "16px",
              },
            },
            dial: {
              radius: "80%",
              backgroundColor: "gray",
              baseWidth: 12,
              baseLength: "0%",
              rearLength: "0%",
            },
            pivot: {
              backgroundColor: "gray",
              radius: 6,
            },
          },
        ],
      });
    }
  }, [title]);

  useEffect(() => {
    if (chartInstance.current) {
      const point = chartInstance.current.series[0].points[0];
      point.update(data);
    }
  }, [data]);

  return <div id="container" ref={chartRef} />;
};

export default CuadroDeMando;
