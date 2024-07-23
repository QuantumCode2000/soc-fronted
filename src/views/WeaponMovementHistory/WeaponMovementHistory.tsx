import Table from "../../components/Table/Table";
import { headerMovimientos } from "../../data/headers";
import { useMovements } from "../../contexts/MovementsContext/MovementsContenx";
import Button from "../../components/Button/Button";
import Content from "../../components/Content/Content";
const WeaponMovementHistory = () => {
  const { movements } = useMovements();
  console.log(movements);
  return (
    <>
      <Content>
        <Table header={headerMovimientos} body={movements} />
      </Content>
      {/* <div className="flex justify-end mt-4 ">
        <Button textStyle={""} text={"Registrar Salida"} />
      </div> */}
    </>
  );
};

export default WeaponMovementHistory;
