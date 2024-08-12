import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import FormParteInmediato from "./FormParteInmediato";
import { usePartesInmediatos } from "../../contexts/PartesInmediatos/PartesInmediatosContext";
import { useInventory } from "../../contexts/InventoryContext/InventoryContext";
import Content from "../../components/Content/Content";

const headersPartesInmediatos = {
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
  enInventario: "",
  unidad: "",
  tipoGanado: "",
};

const PartesInmediatos = ({ tipoGanado, unidad }) => {
  const [isModalOpen, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(firstState);
  const { partesInmediatos, addParteInmediatoItem, updateParteInmediatoItem } =
    usePartesInmediatos();
  const { inventario, addInventarioItem, updateInventarioItem } =
    useInventory();

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
      enInventario: "Si",
      tipoGanado: tipoGanado,
      unidad: unidad,
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
      if (formData.novedad === "Nacimiento" || formData.novedad === "Compra") {
        formData.motivo = formData.novedad;
        const { novedad, motivo, fechaSuceso, ...rest } = formData;
        addInventarioItem(rest);
      } else if (
        formData.novedad === "Deceso" ||
        formData.novedad === "Descarte" ||
        formData.novedad === "Falta" ||
        formData.novedad === "Venta"
      ) {
        const itemIndex = inventario.findIndex(
          (item) => item.nroArete === formData.nroArete,
        );
        if (itemIndex !== -1) {
          const updatedItem = { ...inventario[itemIndex], enInventario: "No" };
          updateInventarioItem(updatedItem);
        }
      }
      addParteInmediatoItem(formData);
    }
    closeModal();
  };

  const partesInmediatosFiltered = partesInmediatos.filter(
    (item) => item.tipoGanado === tipoGanado && item.unidad === unidad,
  );

  return (
    <>
      <Content>
        <Table
          header={headersPartesInmediatos}
          body={partesInmediatosFiltered}
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
          tipoGanado={tipoGanado}
        />
      </Modal>
    </>
  );
};

export default PartesInmediatos;
