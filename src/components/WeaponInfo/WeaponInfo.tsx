import React, { useEffect, useState } from "react";

function WeaponInfo({
  weaponCode,
  setWeaponCode,
  fetchWeaponDetails,
  weaponDetails,
  setWeaponDetails,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (weaponCode.length === 10) {
      setLoading(true);
      fetchWeaponDetails();
      setLoading(false);
    } else {
      setWeaponDetails(null);
    }
  }, [weaponCode, fetchWeaponDetails, setWeaponDetails]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Información del Arma</h2>
      <input
        type="text"
        value={weaponCode}
        onChange={(e) => setWeaponCode(e.target.value)}
        placeholder="Código del Arma"
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
      />
      {loading ? (
        <p className="mt-4 text-blue-500">Cargando...</p>
      ) : weaponDetails ? (
        <div className="mt-4">
          <p>
            <strong>Código:</strong> {weaponDetails.codigo}
          </p>
          <p>
            <strong>Tipo de Arma:</strong> {weaponDetails.tipoDeArma}
          </p>
          <p>
            <strong>Estado:</strong> {weaponDetails.estado}
          </p>
          <p>
            <strong>Clasificación:</strong> {weaponDetails.clasificacion}
          </p>
          <p>
            <strong>Propietario:</strong> {weaponDetails.propietario}
          </p>
          <p>
            <strong>Nro Serie:</strong> {weaponDetails.nroSerie}
          </p>
          <p>
            <strong>Modelo:</strong> {weaponDetails.modelo}
          </p>
          <p>
            <strong>Procedencia:</strong> {weaponDetails.procedencia}
          </p>
          <p>
            <strong>Calibre:</strong> {weaponDetails.calibre}
          </p>
          <p>
            <strong>Marca:</strong> {weaponDetails.marca}
          </p>
          <p>
            <strong>Nro Cargadores:</strong> {weaponDetails.nroCargadores}
          </p>
          <p>
            <strong>Gestión de Dotación:</strong>{" "}
            {weaponDetails.gestionDeDotacion}
          </p>
        </div>
      ) : (
        <p className="mt-4 text-red-500">
          Ingrese un código de 10 dígitos para buscar la información del arma.
        </p>
      )}
    </div>
  );
}

export default WeaponInfo;
