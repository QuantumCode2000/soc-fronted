import Table from "../../components/Table/Table";
import { headersWeapons } from "../../data/headers";
import { useWeapons } from "../../contexts/WeaponsContext/WeaponsContext";
import Button from "../../components/Button/Button";
const WeaponRegister = () => {
  const { weapons } = useWeapons();
  return (
    <>
      <div className="flex flex-col md:flex-row h-[90%]">
        <Table header={headersWeapons} body={weapons} />
      </div>
      <div className="flex justify-end mt-4 ">
        <Button textStyle={""} text={"Registrar Salida"} />
      </div>
    </>
  );
};

export default WeaponRegister;
