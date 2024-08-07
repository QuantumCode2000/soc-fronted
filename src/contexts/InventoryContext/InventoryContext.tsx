import React, { createContext, useContext, useState, ReactNode } from "react";
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

// Proveedor del contexto de inventario
const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inventario, setInventario] =
    useState<InventarioItem[]>(initialInventario);

  // Función para agregar un elemento al inventario
  const addInventarioItem = (newItem: InventarioItem) => {
    setInventario([...inventario, newItem]);
  };

  // Función para actualizar un elemento del inventario
  const updateInventarioItem = (updatedItem: InventarioItem) => {
    setInventario(
      inventario.map((item) =>
        item.codigo === updatedItem.codigo ? updatedItem : item,
      ),
    );
  };

  // Proveedor del contexto con el estado y funciones
  return (
    <InventoryContext.Provider
      value={{ inventario, addInventarioItem, updateInventarioItem }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

// Hook para usar el contexto de inventario
const useInventory = (): InventoryContextProps => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};

export { InventoryProvider, useInventory };
export type { InventarioItem };
