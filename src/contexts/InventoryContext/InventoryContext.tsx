import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { inventario as initialInventario } from "../../data/inventario";

// Definición de la interfaz para el inventario
interface InventarioItem {
  nro: number;
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
  addInventarioItem: (item: InventarioItem) => void;
  updateInventarioItem: (item: InventarioItem) => void;
}

// Creación del contexto de inventario
const InventoryContext = createContext<InventoryContextProps | undefined>(
  undefined,
);

const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inventario, setInventario] = useState<InventarioItem[]>(() => {
    const storedInventario = localStorage.getItem("inventario");
    return storedInventario ? JSON.parse(storedInventario) : initialInventario;
  });

  useEffect(() => {
    localStorage.setItem("inventario", JSON.stringify(inventario));
  }, [inventario]);

  // Función para agregar un elemento al inventario
  const addInventarioItem = (newItem: InventarioItem) => {
    setInventario([...inventario, newItem]);
  };

  // Función para actualizar un elemento del inventario
  const updateInventarioItem = (updatedItem: InventarioItem) => {
    setInventario(
      inventario.map((item) =>
        item.nroArete === updatedItem.nroArete ? updatedItem : item,
      ),
    );
  };

  return (
    <InventoryContext.Provider
      value={{ inventario, addInventarioItem, updateInventarioItem }}
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
