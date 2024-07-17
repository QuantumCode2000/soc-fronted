import Table from "../../components/Table/Table";
import { headerMovimientos } from "../../data/headers";
import { useMovements } from "../../contexts/MovementsContext/MovementsContenx";
const WeaponMovementHistory = () => {
  const { movements } = useMovements();
  console.log(movements);
  return (
    <>
      <Table header={headerMovimientos} body={movements} />
    </>
  );
};

export default WeaponMovementHistory;
