import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Modal from "../../components/Modal/Modal";
import { InventarioItem } from "../../contexts/InventarioContext/interfaceInventario";
const estados = ["Disponible", "No disponible"];

interface FormInventarioRegisterProps {
  formData: InventarioItem;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: () => void;
}

const FormInventarioRegister: React.FC<FormInventarioRegisterProps> = ({
  formData,
  handleChange,
  handleSubmit,
}) => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [localErrors, setLocalErrors] = useState<Partial<InventarioItem>>({});

  const validateForm = () => {
    const newErrors: Partial<InventarioItem> = {};
    if (!formData.iDLamina) newErrors.iDLamina = "ID de lámina es requerido";
    if (!formData.tipoLamina)
      newErrors.tipoLamina = "Tipo de lámina es requerido";
    if (!formData.dimensionesLamina)
      newErrors.dimensionesLamina = "Dimensiones de la lámina son requeridas";
    if (!formData.cantidadDisponible)
      newErrors.cantidadDisponible = "Cantidad disponible es requerida";
    if (!formData.espesor) newErrors.espesor = "Espesor es requerido";
    if (!formData.color) newErrors.color = "Color es requerido";
    if (!formData.fechaIngreso)
      newErrors.fechaIngreso = "Fecha de ingreso es requerida";
    return newErrors;
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setConfirmModalOpen(true);
    } else {
      setLocalErrors(errors);
    }
  };

  const handleConfirmSubmit = () => {
    setConfirmModalOpen(false);
    handleSubmit();
  };

  const handleCloseModal = () => {
    setConfirmModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleConfirm}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Input
          id="iDLamina"
          label="ID Lámina"
          placeholder="Ingrese el ID de la lámina"
          value={formData.iDLamina}
          onChange={handleChange}
          error={localErrors.iDLamina}
        />
        <Input
          id="tipoLamina"
          label="Tipo de Lámina"
          placeholder="Ingrese el tipo de lámina"
          value={formData.tipoLamina}
          onChange={handleChange}
          error={localErrors.tipoLamina}
        />
        <Input
          id="dimensionesLamina"
          label="Dimensiones de la Lámina"
          placeholder="Ingrese las dimensiones de la lámina"
          value={formData.dimensionesLamina}
          onChange={handleChange}
          error={localErrors.dimensionesLamina}
        />
        <Input
          id="cantidadDisponible"
          label="Cantidad Disponible"
          placeholder="Ingrese la cantidad disponible"
          value={formData.cantidadDisponible}
          onChange={handleChange}
          error={localErrors.cantidadDisponible}
        />
        <Input
          id="espesor"
          label="Espesor"
          placeholder="Ingrese el espesor"
          value={formData.espesor}
          onChange={handleChange}
          error={localErrors.espesor}
        />
        <Input
          id="color"
          label="Color"
          placeholder="Ingrese el color"
          value={formData.color}
          onChange={handleChange}
          error={localErrors.color}
        />
        <Input
          type="date"
          id="fechaIngreso"
          label="Fecha de Ingreso"
          placeholder="Ingrese la fecha de ingreso"
          value={formData.fechaIngreso}
          onChange={handleChange}
          error={localErrors.fechaIngreso}
        />
        <Select
          id="estado"
          label="Estado"
          options={estados}
          value={formData.estado}
          onChange={handleChange}
        />
        <div className="flex justify-end mt-4 col-span-1 md:col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Registrar
          </button>
        </div>
      </form>

      {isConfirmModalOpen && (
        <Modal
          title="Confirmación"
          isOpen={isConfirmModalOpen}
          onClose={handleCloseModal}
        >
          <p>¿Está seguro de que desea registrar este ítem?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleConfirmSubmit}
            >
              Confirmar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FormInventarioRegister;
