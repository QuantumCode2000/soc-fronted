import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { parteInmediato as initialParteInmediato } from "../../data/parteinmediato";

// Definición de la interfaz para partes inmediatos
interface ParteInmediatoItem {
  nro: number;
  novedad: string;
  motivo: string;
  nombreUnidad: string;
  codigo: string;
  raza: string;
  color: string;
  marcaCarimbo: string;
  sexo: string;
  categoria: string;
  fechaNac: string;
  tipoGanado: string;
  enInventario: string;
  unidad: string;
  nroArete: string;
  fechaSuceso: string;
}

interface PartesInmediatosContextProps {
  partesInmediatos: ParteInmediatoItem[];
  addParteInmediatoItem: (item: ParteInmediatoItem) => void;
  updateParteInmediatoItem: (item: ParteInmediatoItem) => void;
}

// Creación del contexto de partes inmediatos
const PartesInmediatosContext = createContext<
  PartesInmediatosContextProps | undefined
>(undefined);

// Proveedor del contexto de partes inmediatos
const PartesInmediatosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [partesInmediatos, setPartesInmediatos] = useState<
    ParteInmediatoItem[]
  >(() => {
    const storedData = localStorage.getItem("partesInmediatos");
    return storedData ? JSON.parse(storedData) : initialParteInmediato;
  });

  // Efecto para actualizar el localStorage cuando los partes inmediatos cambian
  useEffect(() => {
    localStorage.setItem("partesInmediatos", JSON.stringify(partesInmediatos));
  }, [partesInmediatos]);

  // Función para calcular el próximo nro
  const calculateNextNro = () => {
    if (partesInmediatos.length === 0) return 1;
    return Math.max(...partesInmediatos.map((item) => item.nro)) + 1;
  };

  // Función para agregar un elemento a partes inmediatos
  const addParteInmediatoItem = (newItem: ParteInmediatoItem) => {
    newItem.nro = calculateNextNro();
    newItem.enInventario = "Si";
    // newItem.nombreUnidad = "BBE II";
    // newItem.tipoGanado = "Vacuno";
    setPartesInmediatos((prevItems) => [...prevItems, newItem]);
  };

  // Función para actualizar un elemento de partes inmediatos
  const updateParteInmediatoItem = (updatedItem: ParteInmediatoItem) => {
    setPartesInmediatos((prevItems) =>
      prevItems.map((item) =>
        item.nro === updatedItem.nro ? updatedItem : item,
      ),
    );
  };

  // Proveedor del contexto con el estado y funciones
  return (
    <PartesInmediatosContext.Provider
      value={{
        partesInmediatos,
        addParteInmediatoItem,
        updateParteInmediatoItem,
      }}
    >
      {children}
    </PartesInmediatosContext.Provider>
  );
};

// Hook para usar el contexto de partes inmediatos
const usePartesInmediatos = (): PartesInmediatosContextProps => {
  const context = useContext(PartesInmediatosContext);
  if (!context) {
    throw new Error(
      "usePartesInmediatos must be used within a PartesInmediatosProvider",
    );
  }
  return context;
};

export { PartesInmediatosProvider, usePartesInmediatos };
export type { ParteInmediatoItem };
