import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

// Definición de la interfaz para partes inmediatos
interface ParteInmediatoItem {
  id: number;
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
  addParteInmediatoItem: (item: ParteInmediatoItem) => Promise<void>;
  updateParteInmediatoItem: (item: Partial<ParteInmediatoItem>) => Promise<void>;
  fetchPartesInmediatos: () => Promise<void>;
}

// Creación del contexto de partes inmediatos
const PartesInmediatosContext = createContext<
  PartesInmediatosContextProps | undefined
>(undefined);

// Proveedor del contexto de partes inmediatos
const PartesInmediatosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [partesInmediatos, setPartesInmediatos] = useState<ParteInmediatoItem[]>([]);

  // Función para obtener todos los partes inmediatos del backend
  const fetchPartesInmediatos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/partes");
      setPartesInmediatos(response.data);
    } catch (error) {
      console.error("Error fetching partes inmediatos:", error);
    }
  };

  // Cargar partes inmediatos al montar el componente
  useEffect(() => {
    fetchPartesInmediatos();
  }, []);

  // Función para agregar un nuevo parte inmediato
  const addParteInmediatoItem = async (newItem: ParteInmediatoItem) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/partes",
        newItem,
      );
      setPartesInmediatos((prevItems) => [...prevItems, response.data]);
    } catch (error) {
      console.error("Error adding parte inmediato:", error);
      throw new Error("Error adding parte inmediato");
    }
  };

  // Función para actualizar un parte inmediato existente
  const updateParteInmediatoItem = async (updatedItem: Partial<ParteInmediatoItem>) => {
    const { id, ...rest } = updatedItem;
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/partes/${id}`,
        rest,
      );
      setPartesInmediatos((prevItems) =>
        prevItems.map((item) => (item.id === id ? response.data : item)),
      );
    } catch (error) {
      console.error("Error updating parte inmediato:", error);
      throw new Error("Error updating parte inmediato");
    }
  };

  // Proveedor del contexto con el estado y funciones
  return (
    <PartesInmediatosContext.Provider
      value={{
        partesInmediatos,
        addParteInmediatoItem,
        updateParteInmediatoItem,
        fetchPartesInmediatos,
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
