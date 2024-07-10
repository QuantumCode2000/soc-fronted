import React, { useState } from "react";
import WeaponInfo from "../../components/WeaponInfo/WeaponInfo";
import ApplicantInfo from "../../components/ApplicantInfo/ApplicantInfo";

const WeaponExit = () => {
  const [weaponCode, setWeaponCode] = useState("");
  const [weaponDetails, setWeaponDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const weaponData = [
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
    // Puedes agregar más armas aquí
  ];

  const fetchWeaponDetails = () => {
    setLoading(true);
    const details = weaponData.find((weapon) => weapon.codigo === weaponCode);
    setWeaponDetails(details);
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <WeaponInfo
            weaponCode={weaponCode}
            setWeaponCode={setWeaponCode}
            fetchWeaponDetails={fetchWeaponDetails}
            weaponDetails={weaponDetails}
            setWeaponDetails={setWeaponDetails}
            loading={loading}
          />
        </div>
        <div className="md:w-1/2 p-2">
          <ApplicantInfo />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={fetchWeaponDetails}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Registrar Salida
        </button>
      </div>
    </>
  );
};

export default WeaponExit;
