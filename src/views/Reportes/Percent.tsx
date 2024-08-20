import React from "react";

interface PercentProps {
  cantidadActual: number;
  cantidadMaxima: number;
  label: string;
}

const Percent: React.FC<PercentProps> = ({
  cantidadActual,
  cantidadMaxima,
  setPercent,
  isNacimiento,
}) => {
  const percent = (cantidadActual / cantidadMaxima) * 100;
  setPercent(percent);
  const circumference = 2 * Math.PI * 120; // Circunferencia para el SVG del círculo

  return (
    <div className="flex flex-col items-center justify-center text-gray-900 bg-white p-2">
      <div className="relative flex items-center justify-center w-full h-full">
        <svg className="transform -rotate-90 w-72 h-72">
          <circle
            cx="145"
            cy="145"
            r="120"
            stroke="currentColor"
            strokeWidth="30"
            fill="transparent"
            className="text-gray-300"
          />
          <circle
            cx="145"
            cy="145"
            r="120"
            stroke="currentColor"
            strokeWidth="30"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (percent / 100) * circumference}
            className="text-blue-500"
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-5xl font-semibold">{`${Math.round(
            percent,
          )}%`}</span>
          <div className="text-lg text-gray-700 mt-2">{`${cantidadActual} / ${cantidadMaxima} I.Z.`}</div>
          {isNacimiento && (
            
            <div className="text-lg text-gray-700 mt-2">{`${cantidadActual} / ${cantidadMaxima} IA.`}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Percent;
