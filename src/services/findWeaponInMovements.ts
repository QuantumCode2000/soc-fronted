const findWeaponInMovements = (weaponCode, movements) => {
  const filteredMovements = movements.filter(
    (movement) => movement.codigo === weaponCode,
  );

  if (filteredMovements.length === 0) {
    return {
      message: "No se ha registrado ningún movimiento con el arma",
      isPending: false,
    };
  }

  const latestMovement = filteredMovements.reduce((latest, current) => {
    return new Date(latest.fechaSalida) > new Date(current.fechaSalida)
      ? latest
      : current;
  });

  const { fechaRegreso } = latestMovement;
  if (fechaRegreso === "Pendiente") {
    return {
      message: "El arma no ha regresado",
      movement: latestMovement,
      isPending: true,
    };
  } else {
    return {
      message: `El arma está dentro de las instalaciones`,
      movement: latestMovement,
      isPending: false,
    };
  }
};
export { findWeaponInMovements };