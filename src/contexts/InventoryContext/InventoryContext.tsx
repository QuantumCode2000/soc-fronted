import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

// Definición de la interfaz para el inventario
interface InventarioItem {
  id: number;
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
}

interface InventoryContextProps {
  inventario: InventarioItem[];
  addInventarioItem: (item: InventarioItem) => Promise<void>;
  updateInventarioItem: (item: Partial<InventarioItem>) => Promise<void>;
  fetchInventario: () => Promise<void>;
}

// Creación del contexto de inventario
const InventoryContext = createContext<InventoryContextProps | undefined>(
  undefined,
);

const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inventario, setInventario] = useState<InventarioItem[]>([]);

  // Función para obtener todos los elementos del inventario del backend
  const fetchInventario = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/inventarios",
      );
      setInventario(response.data);
    } catch (error) {
      console.error("Error fetching inventario:", error);
    }
  };

  // Cargar inventario al montar el componente
  useEffect(() => {
    fetchInventario();
  }, []);

  // Función para agregar un elemento al inventario
  const addInventarioItem = async (newItem: InventarioItem) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/inventarios",
        newItem,
      );
      setInventario((prevItems) => [...prevItems, response.data]);
    } catch (error) {
      console.error("Error adding inventario item:", error);
      throw new Error("Error adding inventario item");
    }
  };

  // Función para actualizar un elemento del inventario
  const updateInventarioItem = async (updatedItem: Partial<InventarioItem>) => {
    const { id, ...rest } = updatedItem;
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/inventarios/${id}`,
        rest,
      );
      setInventario((prevItems) =>
        prevItems.map((item) => (item.id === id ? response.data : item)),
      );
    } catch (error) {
      console.error("Error updating inventario item:", error);
      throw new Error("Error updating inventario item");
    }
  };

  return (
    <InventoryContext.Provider
      value={{
        inventario,
        addInventarioItem,
        updateInventarioItem,
        fetchInventario,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

const useInventory = (): InventoryContextProps => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};

export { InventoryProvider, useInventory };
export type { InventarioItem };
