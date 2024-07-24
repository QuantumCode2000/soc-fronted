import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import FormParteInmediato from "./FormParteInmediato";
import { usePartesInmediatos } from "../../contexts/PartesInmediatos/PartesInmediatosContext";
import { useInventory } from "../../contexts/InventoryContext/InventoryContext";
import Content from "../../components/Content/Content";

const headersPartesInmediatos = {
  nro: "Nº",
  novedad: "Novedad",
  fechaSuceso: "Fecha Suceso",
  nroArete: "Nº Arete",
  raza: "Raza",
  color: "Color",
  marcaCarimbo: "Marca y Carimbo",
  sexo: "Sexo",
  categoria: "Categoría",
  fechaNac: "Fecha Nacimiento",
  edadActual: "Edad Actual (años)",
  motivo: "Motivo",
  acciones: "Acciones",
};

const renderCell = (item, key, handleEdit) => {
  switch (key) {
    case "acciones":
      return (
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleEdit(item.nroArete)}
        >
          Editar
        </button>
      );
    default:
      return item[key];
  }
};

const PartesInmediatos = () => {
  const [isModalOpen, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    novedad: "",
    fechaSuceso: "",
    nroArete: "",
    raza: "",
    color: "",
    marcaCarimbo: "",
    sexo: "",
    categoria: "",
    fechaNac: "",
    edadActual: "",
    motivo: "",
  });
  const [errors, setErrors] = useState({});
  const { partesInmediatos, addParteInmediatoItem, updateParteInmediatoItem } =
    usePartesInmediatos();
  const { inventario } = useInventory();

  const closeModal = () => {
    setOpenModal(false);
    setIsEdit(false);
    setFormData({
      novedad: "",
      fechaSuceso: "",
      nroArete: "",
      raza: "",
      color: "",
      marcaCarimbo: "",
      sexo: "",
      categoria: "",
      fechaNac: "",
      edadActual: "",
      motivo: "",
    });
    setErrors({});
  };

  const openModal = () => {
    setOpenModal(true);
    setIsEdit(false);
    setFormData({
      novedad: "",
      fechaSuceso: "",
      nroArete: "",
      raza: "",
      color: "",
      marcaCarimbo: "",
      sexo: "",
      categoria: "",
      fechaNac: "",
      edadActual: "",
      motivo: "",
    });
    setErrors({});
  };

  const handleEdit = (nroArete) => {
    const item = partesInmediatos.find((item) => item.nroArete === nroArete);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.novedad) newErrors.novedad = "Novedad es requerida";
    if (!formData.fechaSuceso)
      newErrors.fechaSuceso = "Fecha Suceso es requerida";
    if (!formData.nroArete) newErrors.nroArete = "Nº Arete es requerido";
    if (!formData.raza) newErrors.raza = "Raza es requerida";
    if (!formData.color) newErrors.color = "Color es requerido";
    if (!formData.marcaCarimbo)
      newErrors.marcaCarimbo = "Marca y Carimbo es requerido";
    if (!formData.sexo) newErrors.sexo = "Sexo es requerido";
    if (!formData.categoria) newErrors.categoria = "Categoría es requerida";
    if (!formData.fechaNac)
      newErrors.fechaNac = "Fecha de Nacimiento es requerida";
    if (!formData.edadActual) newErrors.edadActual = "Edad Actual es requerida";
    if (!formData.motivo) newErrors.motivo = "Motivo es requerido";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (isEdit) {
        updateParteInmediatoItem(formData);
      } else {
        addParteInmediatoItem(formData);
      }
      closeModal();
    }
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
        onConfirm={handleSubmit}
      >
        <FormParteInmediato
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isEdit={isEdit}
        />
      </Modal>
    </>
  );
};

export default PartesInmediatos;
