import { useState } from "react";
import WeaponInfo from "../../components/WeaponInfo/WeaponInfo";
import ApplicantInfo from "../../components/ApplicantInfo/ApplicantInfo";
import Button from "../../components/Button/Button";
import { weapons, users } from "../../data/data";
import { useMovements } from "../../contexts/MovementsContext/MovementsContenx";
import { findWeaponInMovements } from "../../services/findWeaponInMovements";
const WeaponExit = () => {
  const { movements, addMovement } = useMovements();
  const [weaponCode, setWeaponCode] = useState("");
  const [weaponDetails, setWeaponDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [applicantCI, setApplicantCI] = useState("");
  const [applicantInformation, setApplicantInformation] = useState(null);
  const [applicantLoading, setApplicantLoading] = useState(false);

  const fetchWeaponDetails = () => {
    setLoading(true);
    const details = weapons.find((weapon) => weapon.codigo === weaponCode);
    setWeaponDetails(details || null);
    setLoading(false);
  };

  const fetchApplicantInformation = () => {
    setApplicantLoading(true);
    const details = users.find((applicant) => applicant.ci === applicantCI);
    setApplicantInformation(details || null);
    setApplicantLoading(false);
  };

  const handleAddMovement = () => {
    const newMovement = {
      id: movements.length + 1,
      fechaSalida: `${new Date().getFullYear()}-${String(
        new Date().getMonth() + 1,
      ).padStart(2, "0")}-${String(new Date().getDate()).padStart(
        2,
        "0",
      )} ${String(new Date().getHours()).padStart(2, "0")}:${String(
        new Date().getMinutes(),
      ).padStart(2, "0")}`,
      fechaRegreso: "Pendiente",
      codigo: weaponCode,
      solicitante: applicantCI,
      motivo: "Reabastecimiento",
    };
    addMovement(newMovement);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-[90%]">
        <div className="md:w-1/2 p-2">
          <WeaponInfo
            weaponCode={weaponCode}
            setWeaponCode={setWeaponCode}
            fetchWeaponDetails={fetchWeaponDetails}
            weaponDetails={weaponDetails}
            setWeaponDetails={setWeaponDetails}
            loading={loading}
          />
          {weaponCode.length >= 7 ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  "
              role="alert"
            >
              <span className="font-medium">!</span>
              {findWeaponInMovements(weaponCode, movements).message}
            </div>
          ) : null}
        </div>
        <div className="md:w-1/2 p-2">
          <ApplicantInfo
            applicantCI={applicantCI}
            setApplicantCI={setApplicantCI}
            fetchApplicantInformation={fetchApplicantInformation}
            applicantInformation={applicantInformation}
            setApplicantInformation={setApplicantInformation}
            loading={applicantLoading}
          />
        </div>
      </div>

      {findWeaponInMovements(weaponCode, movements).isPending === true ? (
        <div className="flex justify-end mt-4 ">
          <Button
            textStyle={
              "bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50"
            }
            text={"Registrar Salida"}
          />
        </div>
      ) : (
        <div className="flex justify-end mt-4 ">
          <Button
            textStyle={""}
            text={"Registrar Salida"}
            onClick={handleAddMovement}
          />
        </div>
      )}
    </>
  );
};

export default WeaponExit;
