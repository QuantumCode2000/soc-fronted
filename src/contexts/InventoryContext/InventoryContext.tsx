import React, { createContext, useContext, useState, ReactNode } from "react";
import { inventario as initialInventario } from "../../data/inventario";
import { partesInmediatos as initialParteInmediato } from "../../data/parteinmediato";
import { parteActualizado as initialParteActualizado } from "../../data/parteactualizado";

const InventoryContext = createContext();

const InventoryProvider = ({ children }) => {
  const [inventario, setInventario] = useState(initialInventario);
  const [parteInmediato, setParteInmediato] = useState(initialParteInmediato);
  const [parteActualizado, setParteActualizado] = useState(
    initialParteActualizado,
  );

  const addInventarioItem = (item) => setInventario([...inventario, item]);
  const updateInventarioItem = (updatedItem) => {
    setInventario(
      inventario.map((item) =>
        item.codigo === updatedItem.codigo ? updatedItem : item,
      ),
    );
  };

  const addParteInmediatoItem = (item) =>
    setParteInmediato([...parteInmediato, item]);
  const updateParteInmediatoItem = (updatedItem) => {
    setParteInmediato(
      parteInmediato.map((item) =>
        item.nroArete === updatedItem.nroArete ? updatedItem : item,
      ),
    );
  };

  const addParteActualizadoItem = (item) =>
    setParteActualizado([...parteActualizado, item]);
  const updateParteActualizadoItem = (updatedItem) => {
    setParteActualizado(
      parteActualizado.map((item) =>
        item.detalle === updatedItem.detalle ? updatedItem : item,
      ),
    );
  };

  return (
    <InventoryContext.Provider
      value={{
        inventario,
        parteInmediato,
        parteActualizado,
        addInventarioItem,
        updateInventarioItem,
        addParteInmediatoItem,
        updateParteInmediatoItem,
        addParteActualizadoItem,
        updateParteActualizadoItem,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};

export { InventoryProvider, useInventory };
