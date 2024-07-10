import React from "react";
import Table from "../../components/Table/Table";

const WeaponMovementHistory = () => {
  const header = [
    "ID",
    "Fecha",
    "Tipo de Movimiento",
    "Código del Artículo",
    "Descripción del Artículo",
    "Cantidad",
    "Solicitante",
    "Motivo",
    "Estado del Artículo",
    "Observaciones",
  ];

  const body = [
    {
      id: 1,
      fecha: "2024-07-09 14:32",
      tipoDeMovimiento: "Entrada",
      codigo: "4524324324",
      descripcion: "Fusil AK47",
      cantidad: 10,
      solicitante: "Luis Banda",
      motivo: "Reabastecimiento",
      estado: "Operable",
      observaciones: "Ninguna",
    },
    {
      id: 2,
      fecha: "2024-07-10 10:15",
      tipoDeMovimiento: "Salida",
      codigo: "4524324324",
      descripcion: "Fusil AK47",
      cantidad: 5,
      solicitante: "Carlos Quispe",
      motivo: "Práctica de Tiro",
      estado: "Operable",
      observaciones: "Ninguna",
    },
    // Puedes agregar más registros aquí
  ];

  return (
    <>
      <Table header={header} body={body} />
    </>
  );
};

export default WeaponMovementHistory;
