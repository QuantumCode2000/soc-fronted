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

const motivos = ["Motivo 1", "Motivo 2", "Motivo 3", "Motivo 4"];

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

  const validateForm = (): Partial<ParteInmediatoItem> => {
    const newErrors: Partial<ParteInmediatoItem> = {};

    // Validación de duplicados para Compra y Nacimiento
    if (
      (formData.novedad === "Compra" || formData.novedad === "Nacimiento") &&
      inventario.some((item) => item.codigo === formData.codigo)
    ) {
      newErrors.codigo = "El código ya existe en el inventario";
    }

    if (
      (formData.novedad === "Compra" || formData.novedad === "Nacimiento") &&
      inventario.some((item) => item.nroArete === formData.nroArete)
    ) {
      newErrors.nroArete = "El número de arete ya existe en el inventario";
    }

    // Validación de Fecha Suceso vs Fecha Nacimiento para Deceso
    if (
      formData.novedad === "Deceso" &&
      new Date(formData.fechaSuceso) < new Date(formData.fechaNac)
    ) {
      newErrors.fechaSuceso =
        "La fecha de suceso no puede ser antes de la fecha de nacimiento";
    }

    if (!formData.novedad) newErrors.novedad = "Novedad es requerida";
    if (!formData.fechaSuceso)
      newErrors.fechaSuceso = "Fecha Suceso es requerida";
    if (
      !formData.codigo &&
      formData.novedad !== "Nacimiento" &&
      formData.novedad !== "Compra"
    ) {
      newErrors.codigo = "Código es requerido";
    }
    if (
      !formData.motivo &&
      formData.novedad !== "Nacimiento" &&
      formData.novedad !== "Compra"
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
        const formUpdates = [
          "nroArete",
          "raza",
          "color",
          "marcaCarimbo",
          "sexo",
          "categoria",
          "fechaNac",
        ] as const;
        formUpdates.forEach((field) => {
          if (formData[field] !== item[field]) {
            handleChange({
              target: { id: field, value: item[field] },
            } as React.ChangeEvent<HTMLInputElement>);
          }
        });
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
  ) => {
    const iconMap: { [key in keyof ParteInmediatoItem]?: React.ReactNode } = {
      fechaSuceso: <FaCalendarAlt className="mr-2 text-green-500" />,
      nroArete: <FaHashtag className="mr-2 text-gray-500" />,
      codigo: <FaBarcode className="mr-2 text-gray-500" />,
      raza: <FaPaw className="mr-2 text-pink-500" />,
      color: <FaPalette className="mr-2 text-yellow-500" />,
      marcaCarimbo: <FaTags className="mr-2 text-red-500" />,
      sexo: <FaVenusMars className="mr-2 text-purple-500" />,
      categoria: <FaListAlt className="mr-2 text-teal-500" />,
      fechaNac: <FaBirthdayCake className="mr-2 text-orange-500" />,
      motivo: <FaComment className="mr-2 text-blue-400" />,
    };

    return (
      <div className="flex items-center">
        {iconMap[id]}
        <Input
          id={id}
          label={label}
          placeholder={placeholder}
          type={type}
          value={String(formData[id] || "")} // Convertir siempre el value a string
          onChange={handleChange}
          error={localErrors[id] ? String(localErrors[id]) : undefined} // Asegurar que el error sea string o undefined
          disabled={disabled}
        />
      </div>
    );
  };

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
            <Select
              id="motivo"
              label="Motivo"
              options={motivos}
              value={formData.motivo}
              onChange={handleChange}
              error={localErrors.motivo}
            />
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
          onClose={() => setConfirmModalOpen(false)}
        >
          <p>¿Está seguro de que desea registrar esta información?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              onClick={() => setConfirmModalOpen(false)}
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
