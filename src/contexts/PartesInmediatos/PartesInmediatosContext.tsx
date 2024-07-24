import React, { createContext, useContext, useState, ReactNode } from "react";
import { partesInmediatos as initialPartesInmediatos } from "../../data/parteinmediato";

const PartesInmediatosContext = createContext();

const PartesInmediatosProvider = ({ children }) => {
  const [partesInmediatos, setPartesInmediatos] = useState(
    initialPartesInmediatos,
  );

  const addParteInmediatoItem = (item) =>
    setPartesInmediatos([...partesInmediatos, item]);
  const updateParteInmediatoItem = (updatedItem) => {
    setPartesInmediatos(
      partesInmediatos.map((item) =>
        item.nroArete === updatedItem.nroArete ? updatedItem : item,
      ),
    );
  };

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

const usePartesInmediatos = () => {
  const context = useContext(PartesInmediatosContext);
  if (!context) {
    throw new Error(
      "usePartesInmediatos must be used within a PartesInmediatosProvider",
    );
  }
  return context;
};

export { PartesInmediatosProvider, usePartesInmediatos };
