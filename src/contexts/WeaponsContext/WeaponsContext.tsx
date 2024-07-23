import React, { createContext, useContext, useState, ReactNode } from "react";
import { weapons as importedWeapons } from "../../data/data";

interface Weapon {
  codigo: string;
  tipoDeArma: string;
  estado: string;
  clasificacion: string;
  propietario: string;
  nroSerie: string;
  modelo: string;
  procedencia: string;
  calibre: string;
  marca: string;
  nroCargadores: string;
  gestionDeDotacion: string;
}

interface WeaponsContextProps {
  weapons: Weapon[];
  addWeapon: (weapon: Weapon) => void;
  removeWeapon: (codigo: string) => void;
  updateWeapon: (weapon: Weapon) => void;
  getAllWeapons: () => Weapon[];
  getWeaponByCodigo: (codigo: string) => Weapon | undefined;
}

const WeaponsContext = createContext<WeaponsContextProps | undefined>(
  undefined,
);

const WeaponsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weapons, setWeapons] = useState<Weapon[]>(importedWeapons);

  const addWeapon = (weapon: Weapon) => {
    setWeapons((prevWeapons) => [...prevWeapons, weapon]);
  };

  const removeWeapon = (codigo: string) => {
    setWeapons((prevWeapons) =>
      prevWeapons.filter((weapon) => weapon.codigo !== codigo),
    );
  };

  const updateWeapon = (updatedWeapon: Weapon) => {
    setWeapons((prevWeapons) =>
      prevWeapons.map((weapon) =>
        weapon.codigo === updatedWeapon.codigo ? updatedWeapon : weapon,
      ),
    );
  };

  const getAllWeapons = (): Weapon[] => {
    return weapons;
  };

  const getWeaponByCodigo = (codigo: string): Weapon | undefined => {
    return weapons.find((weapon) => weapon.codigo === codigo);
  };

  return (
    <WeaponsContext.Provider
      value={{
        weapons,
        addWeapon,
        removeWeapon,
        updateWeapon,
        getAllWeapons,
        getWeaponByCodigo,
      }}
    >
      {children}
    </WeaponsContext.Provider>
  );
};

const useWeapons = (): WeaponsContextProps => {
  const context = useContext(WeaponsContext);
  if (context === undefined) {
    throw new Error("useWeapons must be used within a WeaponsProvider");
  }
  return context;
};

export { WeaponsProvider, useWeapons };
