import React, { useState } from "react";
import { useInventarios } from "../../contexts/InventarioContext/InventarioContext";
import FormInventarioRegister from "./FormInventarioRegister";
import FormInventarioEdit from "./FormInventarioEdit";
import Table from "../../components/Table/Table";  
import Modal from "../../components/Modal/Modal"; 
import Button from "../../components/Button/Button"; 

const InventarioRegister: React.FC = () => {
  const {
    inventarios,
    formData,
    setFormData,
    handleChange,
    handleRegisterSubmit,
    handleEditSubmit,
    handleDelete,
  } = useInventarios(); // Asegúrate de asignar correctamente el contexto aquí.

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // Abrir el modal para registrar un nuevo inventario
  const openRegisterModal = () => {
    setFormData({
      id: 0,
      iDLamina: "",
      tipoLamina: "",
      dimensionesLamina: "",
      cantidadDisponible: "",
      espesor: "",
      color: "",
      fechaIngreso: "",
      estado: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: null,
    });
    setIsEdit(false);
    setIsModalOpen(true);
  };

  // Abrir el modal para editar un inventario existente
  const openEditModal = (id: number) => {
    const item = inventarios.find((inv) => inv.id === id);
    if (item) {
      setFormData(item);
      setIsEdit(true);
      setIsModalOpen(true);
    }
  };

  // Cerrar el modal y limpiar los datos del formulario
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      id: 0,
      iDLamina: "",
      tipoLamina: "",
      dimensionesLamina: "",
      cantidadDisponible: "",
      espesor: "",
      color: "",
      fechaIngreso: "",
      estado: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: null,
    });
  };

  return (
    <div>
      <Button onClick={openRegisterModal} text="Registrar Inventario" />
      <Table
        header={{
          iDLamina: "ID Lámina",
          tipoLamina: "Tipo Lámina",
          dimensionesLamina: "Dimensiones",
          cantidadDisponible: "Cantidad",
          espesor: "Espesor",
          color: "Color",
          fechaIngreso: "Fecha de Ingreso",
          estado: "Estado",
          actions: "Acciones",
        }}
        body={inventarios}
        renderCell={(item, key) =>
          key !== "actions" ? (
            item[key]
          ) : (
            <div className="flex gap-2">
              <Button onClick={() => openEditModal(item.id)} text="Editar" />
              <Button onClick={() => handleDelete(item.id)} text="Eliminar" />
            </div>
          )
        }
      />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isEdit ? (
          <FormInventarioEdit
            formData={formData}
            handleChange={handleChange}
            handleSubmit={() => handleEditSubmit(formData.id)}
          />
        ) : (
          <FormInventarioRegister
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleRegisterSubmit}
          />
        )}
      </Modal>
    </div>
  );
};

export default InventarioRegister;
