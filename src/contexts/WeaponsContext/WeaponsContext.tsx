import React, { createContext, useContext, useState, ReactNode } from "react";

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
}

const WeaponsContext = createContext<WeaponsContextProps | undefined>(
  undefined,
);

const WeaponsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weapons, setWeapons] = useState<Weapon[]>([
    {
      codigo: "4524324324",
      tipoDeArma: "fusil",
      estado: "operable",
      clasificacion: "organica",
      propietario: "Luis bandara",
      nroSerie: "4324234",
      modelo: "ak47",
      procedencia: "austria",
      calibre: "2",
      marca: "styer",
      nroCargadores: "1",
      gestionDeDotacion: "2016",
    },
    {
      codigo: "4524324325",
      tipoDeArma: "subfusil",
      estado: "operable",
      clasificacion: "organica",
      propietario: "Luis bandara",
      nroSerie: "4324234",
      modelo: "ak47",
      procedencia: "austria",
      calibre: "2",
      marca: "styer",
      nroCargadores: "1",
      gestionDeDotacion: "2016",
    },
  ]);

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

  return (
    <WeaponsContext.Provider
      value={{ weapons, addWeapon, removeWeapon, updateWeapon }}
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
