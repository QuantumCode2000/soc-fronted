import React, { createContext, useContext, useState, ReactNode } from "react";
import { movimientos } from "../../data/movements";
interface Movement {
  id: number;
  fecha: string;
  tipoDeMovimiento: string;
  codigo: string;
  solicitante: string;
  motivo: string;
}

interface MovementsContextProps {
  movements: Movement[];
  addMovement: (movement: Movement) => void;
  removeMovement: (id: number) => void;
  updateMovement: (movement: Movement) => void;
}

const MovementsContext = createContext<MovementsContextProps | undefined>(
  undefined,
);

const MovementsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [movements, setMovements] = useState<Movement[]>(movimientos);

  const addMovement = (movement: Movement) => {
    setMovements((prevMovements) => [...prevMovements, movement]);
  };

  const removeMovement = (id: number) => {
    setMovements((prevMovements) =>
      prevMovements.filter((movement) => movement.id !== id),
    );
  };

  const updateMovement = (updatedMovement: Movement) => {
    setMovements((prevMovements) =>
      prevMovements.map((movement) =>
        movement.id === updatedMovement.id ? updatedMovement : movement,
      ),
    );
  };

  return (
    <MovementsContext.Provider
      value={{ movements, addMovement, removeMovement, updateMovement }}
    >
      {children}
    </MovementsContext.Provider>
  );
};

const useMovements = (): MovementsContextProps => {
  const context = useContext(MovementsContext);
  if (context === undefined) {
    throw new Error("useMovements must be used within a MovementsProvider");
  }
  return context;
};

export { MovementsProvider, useMovements };
