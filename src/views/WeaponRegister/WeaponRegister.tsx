import { useState } from "react";
import Table from "../../components/Table/Table";
import { headersWeapons } from "../../data/headers";
import { useWeapons } from "../../contexts/WeaponsContext/WeaponsContext";
import Button from "../../components/Button/Button";
import Content from "../../components/Content/Content";
import Modal from "../../components/Modal/Modal";
import ModalData from "./ModalData";
import FormWeaponRegister from "./FormWeaponRegister";

const renderCell = (item, key, handleViewMore) => {
  switch (key) {
    case "acciones":
      return (
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => handleViewMore(item.codigo)}
          >
            Ver Mas
          </button>
        </div>
      );
    case "estado":
      return (
        <div className="flex space-x-2">
          {item[key] === "B/E" ? (
            <span className="bg-green-500 text-white px-2 py-1 rounded">
              {item[key]}
            </span>
          ) : item[key] === "R/E" ? (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded">
              {item[key]}
            </span>
          ) : (
            <span className="bg-red-500 text-white px-2 py-1 rounded">
              {item[key]}
            </span>
          )}
        </div>
      );
    default:
      return item[key];
  }
};

const WeaponRegister = () => {
  const { weapons, getWeaponByCodigo, addWeapon } = useWeapons();
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    codigo: "",
    nroarma: "",
    clasificacion: "",
    propietario: "",
    armamento: "",
    modelo: "",
    calibre: "",
    industria: "",
    estado: "",
    observations: "",
  });

  const [errors, setErrors] = useState({});

  const handleViewMore = (codigo) => {
    const weapon = getWeaponByCodigo(codigo);
    setSelectedWeapon(weapon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWeapon(null);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
    setFormData({
      codigo: "",
      nroarma: "",
      clasificacion: "",
      propietario: "",
      armamento: "",
      modelo: "",
      calibre: "",
      industria: "",
      estado: "",
      observations: "",
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.codigo) newErrors.codigo = "Código es requerido";
    if (!formData.nroarma) newErrors.nroarma = "Número de Arma es requerido";
    if (!formData.modelo) newErrors.modelo = "Modelo es requerido";
    if (!formData.calibre) newErrors.calibre = "Calibre es requerido";
    if (!formData.industria) newErrors.industria = "Industria es requerida";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      addWeapon(formData);
      closeRegisterModal();
    }
  };

  return (
    <>
      <Content>
        <Table
          header={headersWeapons}
          body={weapons}
          renderCell={(item, key) => renderCell(item, key, handleViewMore)}
        />
      </Content>

      {selectedWeapon && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Detalles del Arma"
          onConfirm={closeModal}
        >
          <ModalData data={selectedWeapon} titles={headersWeapons} />
        </Modal>
      )}

      <div className="flex justify-end mt-4">
        <Button
          textStyle={""}
          text={"Registrar Armamento"}
          onClick={openRegisterModal}
        />
      </div>

      <Modal
        title={"Registrar Armamento"}
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        onConfirm={handleSubmit}
        viewButton={true}
      >
        <FormWeaponRegister
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />
      </Modal>
    </>
  );
};

export default WeaponRegister;
