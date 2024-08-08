import React, { useState, useEffect } from "react";
import CuadroDeMando from "./CuadroDeMando";
import { usePartesInmediatos } from "../../contexts/PartesInmediatos/PartesInmediatosContext";

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

const CuadroDeMandoContainer: React.FC = () => {
  const { partesInmediatos } = usePartesInmediatos();
  const [selectedTipoGanado, setSelectedTipoGanado] = useState<string | null>(
    null,
  );
  const [dataNacimientos, setDataNacimientos] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    if (selectedTipoGanado) {
      const nacimientos = unidades.reduce((acc, unidad) => {
        acc[unidad] = countNacimientos(unidad, selectedTipoGanado);
        return acc;
      }, {} as { [key: string]: number });
      setDataNacimientos(nacimientos);
    }
  }, [selectedTipoGanado, partesInmediatos]);

  const handleTipoGanadoClick = (tipo: string) => {
    setSelectedTipoGanado(tipo);
  };

  const countNacimientos = (unidad: string, tipoGanado: string) => {
    return partesInmediatos.filter(
      (item) =>
        item.unidad === unidad &&
        item.tipoGanado === tipoGanado &&
        item.novedad === "Nacimiento",
    ).length;
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="mb-4">
        {tipoGanado.map((tipo, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white py-2 px-4 rounded m-2"
            onClick={() => handleTipoGanadoClick(tipo)}
          >
            {tipo}
          </button>
        ))}
      </div>
      <h1 className="text-2xl font-bold mb-4">{selectedTipoGanado}</h1>

      {selectedTipoGanado && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unidades.map((unidad, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <CuadroDeMando
                title={`Unidad: ${unidad}`}
                data={dataNacimientos[unidad] || 0}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CuadroDeMandoContainer;
