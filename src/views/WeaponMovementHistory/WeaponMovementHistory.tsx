import Table from "../../components/Table/Table";
import { headerMovimientos } from "../../data/headers";
import { useMovements } from "../../contexts/MovementsContext/MovementsContenx";
import Button from "../../components/Button/Button";
const WeaponMovementHistory = () => {
  const { movements } = useMovements();
  console.log(movements);
  return (
    <>
      <div className="flex flex-col md:flex-row h-[90%]">
        <Table header={headerMovimientos} body={movements} />
      </div>
      {/* <div className="flex justify-end mt-4 ">
        <Button textStyle={""} text={"Registrar Salida"} />
      </div> */}
    </>
  );
};

export default WeaponMovementHistory;
