import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import FormInventario from "./FormInventario";
import FormUpdateInventario from "./FormUpdateInventario"; // Importamos el nuevo formulario
import { useInventory } from "../../contexts/InventoryContext/InventoryContext";
import Content from "../../components/Content/Content";

const headersInventario = {
  nro: "N°",
  nombreUnidad: "Nombre de la Unidad",
  codigo: "Código",
  raza: "Raza",
  color: "Color",
  marcaCarimbo: "Marca y Carimbo",
  sexo: "Sexo",
  categoria: "Categoría",
  fechaNac: "Fecha de Nacimiento",
  edadActual: "Edad Actual (años)",
  acciones: "Acciones",
};

const renderCell = (item, key, handleEdit) => {
  switch (key) {
    case "acciones":
      return (
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleEdit(item.codigo)}
        >
          Editar
        </button>
      );
    default:
      return item[key];
  }
};

const Inventario = () => {
  const [isModalOpen, setOpenModal] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false); // Estado para el modal de edición
  const [formData, setFormData] = useState({
    nro: "",
    nombreUnidad: "",
    codigo: "",
    raza: "",
    color: "",
    marcaCarimbo: "",
    sexo: "",
    categoria: "",
    fechaNac: "",
    edadActual: "",
  });
  const [errors, setErrors] = useState({});
  const { inventario, addInventarioItem, updateInventarioItem } =
    useInventory();

  const closeModal = () => {
    setOpenModal(false);
    setFormData({
      nro: "",
      nombreUnidad: "",
      codigo: "",
      raza: "",
      color: "",
      marcaCarimbo: "",
      sexo: "",
      categoria: "",
      fechaNac: "",
      edadActual: "",
    });
    setErrors({});
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setFormData({
      nro: "",
      nombreUnidad: "",
      codigo: "",
      raza: "",
      color: "",
      marcaCarimbo: "",
      sexo: "",
      categoria: "",
      fechaNac: "",
      edadActual: "",
    });
    setErrors({});
  };

  const openModal = () => {
    setOpenModal(true);
    setFormData({
      nro: "",
      nombreUnidad: "",
      codigo: "",
      raza: "",
      color: "",
      marcaCarimbo: "",
      sexo: "",
      categoria: "",
      fechaNac: "",
      edadActual: "",
    });
    setErrors({});
  };

  const openEditModal = (codigo) => {
    const item = inventario.find((item) => item.codigo === codigo);
    if (item) {
      setFormData(item);
      setEditModalOpen(true);
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
    if (!formData.nombreUnidad)
      newErrors.nombreUnidad = "Nombre de la Unidad es requerido";
    if (!formData.codigo) newErrors.codigo = "Código es requerido";
    if (!formData.raza) newErrors.raza = "Raza es requerida";
    if (!formData.color) newErrors.color = "Color es requerido";
    if (!formData.marcaCarimbo)
      newErrors.marcaCarimbo = "Marca y Carimbo es requerido";
    if (!formData.sexo) newErrors.sexo = "Sexo es requerido";
    if (!formData.categoria) newErrors.categoria = "Categoría es requerida";
    if (!formData.fechaNac)
      newErrors.fechaNac = "Fecha de Nacimiento es requerida";
    if (!formData.edadActual) newErrors.edadActual = "Edad Actual es requerida";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (isEditModalOpen) {
        updateInventarioItem(formData);
        closeEditModal();
      } else {
        addInventarioItem(formData);
        closeModal();
      }
    }
  };

  return (
    <>
      <Content>
        <Table
          header={headersInventario}
          body={inventario}
          renderCell={(item, key) => renderCell(item, key, openEditModal)}
        />
      </Content>
      <div className="flex justify-end mt-4">
        <Button text={"Agregar Item"} onClick={openModal} />
      </div>
      <Modal
        title={"Agregar Item"}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleSubmit}
      >
        <FormInventario
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Modal>
      <Modal
        title={"Editar Item"}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onConfirm={handleSubmit}
      >
        <FormUpdateInventario
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
};

export default Inventario;
