import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaHashtag,
  FaPaw,
  FaPalette,
  FaTags,
  FaVenusMars,
  FaListAlt,
  FaBirthdayCake,
  FaComment,
  FaBarcode,
} from "react-icons/fa";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Modal from "../../components/Modal/Modal";
import { useInventory } from "../../contexts/InventoryContext/InventoryContext";
import type { ParteInmediatoItem } from "../../contexts/PartesInmediatos/PartesInmediatosContext";

interface FormParteInmediatoProps {
  formData: ParteInmediatoItem;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: () => void;
  tipoGanado: string;
}

interface InventarioItem {
  id: number;
  nombreUnidad: string;
  codigo: string;
  raza: string;
  color: string;
  marcaCarimbo: string;
  sexo: string;
  categoria: string;
  fechaNac: string;
  tipoGanado: string;
  enInventario: string;
  unidad: string;
  nroArete: string;
}

const novedades = [
  "Deceso",
  "Nacimiento",
  "Descarte",
  "Falta",
  "Inseminación",
  "Pregestación",
  "Gestación",
  "Compra",
  "Venta",
];
const sexos = ["Macho", "Hembra"];

const razasBovinos = ["Nelore", "Angus", "Brahman", "Hereford", "Charolais"];
const razasCuyes = ["Peruano", "Americano", "Abisinio", "Peruano"];
const razasEquinos = ["Peruano de paso", "Cuarto de milla", "Percheron"];
const razasPorcinos = ["Yorkshire", "Duroc", "Landrace", "Hampshire"];
const razasAvicolas = ["Pollo de engorde", "Gallina ponedora", "Pato"];
const categorias = ["S/N"];

const FormParteInmediato: React.FC<FormParteInmediatoProps> = ({
  formData,
  handleChange,
  handleSubmit,
  tipoGanado,
}) => {
  const { inventario } = useInventory();
  const [selectedAnimal, setSelectedAnimal] = useState<InventarioItem | null>(
    null,
  );
  const [localErrors, setLocalErrors] = useState<Partial<ParteInmediatoItem>>(
    {},
  );
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<ParteInmediatoItem> = {};
    if (!formData.novedad) newErrors.novedad = "Novedad es requerida";
    if (!formData.fechaSuceso)
      newErrors.fechaSuceso = "Fecha Suceso es requerida";
    if (
      formData.novedad !== "Nacimiento" &&
      formData.novedad !== "Compra" &&
      !formData.codigo
    ) {
      newErrors.codigo = "Código es requerido";
    }
    if (
      formData.novedad !== "Nacimiento" &&
      formData.novedad !== "Compra" &&
      !formData.motivo
    ) {
      newErrors.motivo = "Motivo es requerido";
    }
    if (!formData.raza) newErrors.raza = "Raza es requerida";
    if (!formData.color) newErrors.color = "Color es requerido";
    if (!formData.marcaCarimbo)
      newErrors.marcaCarimbo = "Marca y Carimbo es requerido";
    if (!formData.sexo) newErrors.sexo = "Sexo es requerido";
    if (!formData.categoria) newErrors.categoria = "Categoría es requerida";
    if (!formData.fechaNac)
      newErrors.fechaNac = "Fecha de Nacimiento es requerida";
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

  useEffect(() => {
    if (
      formData.codigo &&
      formData.novedad !== "Nacimiento" &&
      formData.novedad !== "Compra"
    ) {
      const item = inventario.find(
        (inv) => inv.codigo?.toString() === formData.codigo?.toString(),
      );
      if (item) {
        setSelectedAnimal(item);
        if (formData.nroArete !== item.nroArete) {
          handleChange({
            target: { id: "nroArete", value: item.nroArete },
          } as React.ChangeEvent<HTMLInputElement>);
        }
        if (formData.raza !== item.raza) {
          handleChange({
            target: { id: "raza", value: item.raza },
          } as React.ChangeEvent<HTMLInputElement>);
        }
        if (formData.color !== item.color) {
          handleChange({
            target: { id: "color", value: item.color },
          } as React.ChangeEvent<HTMLInputElement>);
        }
        if (formData.marcaCarimbo !== item.marcaCarimbo) {
          handleChange({
            target: { id: "marcaCarimbo", value: item.marcaCarimbo },
          } as React.ChangeEvent<HTMLInputElement>);
        }
        if (formData.sexo !== item.sexo) {
          handleChange({
            target: { id: "sexo", value: item.sexo },
          } as React.ChangeEvent<HTMLInputElement>);
        }
        if (formData.categoria !== item.categoria) {
          handleChange({
            target: { id: "categoria", value: item.categoria },
          } as React.ChangeEvent<HTMLInputElement>);
        }
        if (formData.fechaNac !== item.fechaNac) {
          handleChange({
            target: { id: "fechaNac", value: item.fechaNac },
          } as React.ChangeEvent<HTMLInputElement>);
        }
      } else {
        setSelectedAnimal(null);
      }
    }
  }, [formData.codigo, formData.novedad, handleChange, inventario]);

  const renderInput = (
    id: keyof ParteInmediatoItem,
    label: string,
    placeholder: string,
    type: string = "text",
    disabled: boolean = false,
  ) => (
    <div className="flex items-center">
      {id === "fechaSuceso" && (
        <FaCalendarAlt className="mr-2 text-green-500" />
      )}
      {id === "nroArete" && <FaHashtag className="mr-2 text-gray-500" />}
      {id === "codigo" && <FaBarcode className="mr-2 text-gray-500" />}
      {id === "raza" && <FaPaw className="mr-2 text-pink-500" />}
      {id === "color" && <FaPalette className="mr-2 text-yellow-500" />}
      {id === "marcaCarimbo" && <FaTags className="mr-2 text-red-500" />}
      {id === "sexo" && <FaVenusMars className="mr-2 text-purple-500" />}
      {id === "categoria" && <FaListAlt className="mr-2 text-teal-500" />}
      {id === "fechaNac" && <FaBirthdayCake className="mr-2 text-orange-500" />}
      {id === "motivo" && <FaComment className="mr-2 text-blue-400" />}
      <Input
        id={id}
        label={label}
        placeholder={placeholder}
        type={type}
        value={formData[id] || ""}
        onChange={handleChange}
        error={localErrors[id]}
        disabled={disabled}
      />
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleConfirm}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="flex items-center">
          <FaListAlt className="mr-2 text-blue-500" />
          <Select
            id="novedad"
            label="Novedad"
            options={novedades}
            value={formData.novedad}
            onChange={handleChange}
            error={localErrors.novedad}
          />
        </div>
        {renderInput("fechaSuceso", "Fecha Suceso", "Fecha Suceso", "date")}
        {renderInput("codigo", "Código", "Código")}
        {renderInput("nroArete", "Nº Arete", "Nº Arete", "text")}

        <Select
          id="raza"
          label="Raza"
          options={
            tipoGanado === "Cuyicola"
              ? razasCuyes
              : tipoGanado === "Porcino"
              ? razasPorcinos
              : tipoGanado === "Avicola"
              ? razasAvicolas
              : tipoGanado === "Equino"
              ? razasEquinos
              : razasBovinos
          }
          value={formData.raza}
          onChange={handleChange}
          error={localErrors.raza}
        />
        {renderInput("color", "Color", "Color")}
        {renderInput("marcaCarimbo", "Marca y Carimbo", "Marca y Carimbo")}
        <Select
          id="sexo"
          label="Sexo"
          options={sexos}
          value={formData.sexo}
          onChange={handleChange}
          error={localErrors.sexo}
        />
        <Select
          id="categoria"
          label="Categoría"
          options={categorias}
          value={formData.categoria}
          onChange={handleChange}
          error={localErrors.categoria}
        />
        {renderInput(
          "fechaNac",
          "Fecha Nacimiento",
          "Fecha Nacimiento",
          "date",
        )}

        {formData.novedad !== "Nacimiento" && formData.novedad !== "Compra" && (
          <div className="md:col-span-2 p-4 bg-gray-100 rounded-lg shadow">
            {selectedAnimal && (
              <>
                <h3 className="text-xl font-bold mb-2">
                  Información del Animal
                </h3>
                <p>
                  <strong>Código:</strong> {selectedAnimal.codigo}
                </p>
                <p>
                  <strong>Raza:</strong> {selectedAnimal.raza}
                </p>
                <p>
                  <strong>Color:</strong> {selectedAnimal.color}
                </p>
                <p>
                  <strong>Marca y Carimbo:</strong>{" "}
                  {selectedAnimal.marcaCarimbo}
                </p>
                <p>
                  <strong>Sexo:</strong> {selectedAnimal.sexo}
                </p>
                <p>
                  <strong>Categoría:</strong> {selectedAnimal.categoria}
                </p>
                <p>
                  <strong>Fecha Nacimiento:</strong> {selectedAnimal.fechaNac}
                </p>
                <p>
                  <strong>Unidad:</strong> {selectedAnimal.unidad}
                </p>
              </>
            )}
            {renderInput("motivo", "Motivo", "Motivo")}
          </div>
        )}
        <div className="flex justify-end col-span-1 md:col-span-2 mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-400 transition duration-300"
          >
            Registrar
          </button>
        </div>
      </form>

      {confirmModalOpen && (
        <Modal
          title="Confirmación"
          isOpen={confirmModalOpen}
          onClose={handleCloseModal}
        >
          <p>¿Está seguro de que desea registrar esta información?</p>
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

export default FormParteInmediato;
