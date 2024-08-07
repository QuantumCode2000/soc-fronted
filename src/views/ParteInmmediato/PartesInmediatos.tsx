import { useState } from "react";
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import FormParteInmediato from "./FormParteInmediato";
import { usePartesInmediatos } from "../../contexts/PartesInmediatos/PartesInmediatosContext";
import Content from "../../components/Content/Content";

const headersPartesInmediatos = {
  nro: "Nº",
  novedad: "Novedad",
  fechaSuceso: "Fecha Suceso",
  nroArete: "Nº Arete",
  codigo: "Código",
  raza: "Raza",
  color: "Color",
  marcaCarimbo: "Marca y Carimbo",
  sexo: "Sexo",
  categoria: "Categoría",
  fechaNac: "Fecha Nacimiento",
  edadActual: "Edad Actual (años)",
  motivo: "Motivo",
  unidad: "Unidad",
  acciones: "Acciones",
};

const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const renderCell = (item, key, handleEdit) => {
  switch (key) {
    case "acciones":
      return (
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleEdit(item.nro)}
        >
          Editar
        </button>
      );
    case "edadActual":
      return calculateAge(item.fechaNac);
    default:
      return item[key];
  }
};

const firstState = {
  novedad: "",
  fechaSuceso: "",
  nroArete: "",
  codigo: "",
  raza: "",
  color: "",
  marcaCarimbo: "",
  sexo: "",
  categoria: "",
  fechaNac: "",
  motivo: "",
  unidad: "",
};

const PartesInmediatos = () => {
  const [isModalOpen, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(firstState);
  const { partesInmediatos, addParteInmediatoItem, updateParteInmediatoItem } =
    usePartesInmediatos();

  const closeModal = () => {
    setOpenModal(false);
    setIsEdit(false);
    setFormData(firstState);
  };

  const openModal = () => {
    setOpenModal(true);
    setIsEdit(false);
    setFormData({
      ...firstState,
      nro: partesInmediatos.length + 1,
      enInventario: "Si",
      nombreUnidad: "BBE II",
      tipoGanado: "Vacuno",
    });
  };

  const handleEdit = (nro) => {
    const item = partesInmediatos.find((item) => item.nro === nro);
    if (item) {
      setFormData(item);
      setIsEdit(true);
      setOpenModal(true);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    if (isEdit) {
      updateParteInmediatoItem(formData);
    } else {
      if (formData.novedad === "NACIMIENTO" || formData.novedad === "COMPRA") {
        formData.motivo = formData.novedad;
      }
      addParteInmediatoItem(formData);
    }
    closeModal();
  };

  return (
    <>
      <Content>
        <Table
          header={headersPartesInmediatos}
          body={partesInmediatos}
          renderCell={(item, key) => renderCell(item, key, handleEdit)}
        />
      </Content>
      <div className="flex justify-end mt-4">
        <Button text={"Registrar Parte Inmediato"} onClick={openModal} />
      </div>
      <Modal
        title={isEdit ? "Editar Parte Inmediato" : "Registrar Parte Inmediato"}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <FormParteInmediato
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
};

export default PartesInmediatos;
