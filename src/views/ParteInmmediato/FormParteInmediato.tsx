import React from "react";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";

const novedades = [
  "DECESO",
  "NACIMIENTO",
  "DESCARTE",
  "FALTA",
  "INSEMINACION",
  "PREGESTACION",
  "GESTACION",
  "COMPRA",
];
const sexos = ["MACHO", "HEMBRA"];

const FormParteInmediato = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  isEdit,
}) => {
  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <Select
          id="novedad"
          label="Novedad"
          options={novedades}
          value={formData.novedad}
          onChange={handleChange}
          error={errors.novedad}
        />
        <Input
          id="fechaSuceso"
          label="Fecha Suceso"
          placeholder="Fecha Suceso"
          value={formData.fechaSuceso}
          onChange={handleChange}
          error={errors.fechaSuceso}
        />
        <Input
          id="nroArete"
          label="Nº Arete"
          placeholder="Nº Arete"
          value={formData.nroArete}
          onChange={handleChange}
          error={errors.nroArete}
        />
        <Input
          id="raza"
          label="Raza"
          placeholder="Raza"
          value={formData.raza}
          onChange={handleChange}
          error={errors.raza}
        />
        <Input
          id="color"
          label="Color"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
          error={errors.color}
        />
        <Input
          id="marcaCarimbo"
          label="Marca y Carimbo"
          placeholder="Marca y Carimbo"
          value={formData.marcaCarimbo}
          onChange={handleChange}
          error={errors.marcaCarimbo}
        />
        <Select
          id="sexo"
          label="Sexo"
          options={sexos}
          value={formData.sexo}
          onChange={handleChange}
          error={errors.sexo}
        />
        <Input
          id="categoria"
          label="Categoría"
          placeholder="Categoría"
          value={formData.categoria}
          onChange={handleChange}
          error={errors.categoria}
        />
        <Input
          id="fechaNac"
          label="Fecha Nacimiento"
          placeholder="Fecha Nacimiento"
          value={formData.fechaNac}
          onChange={handleChange}
          error={errors.fechaNac}
        />
        <Input
          id="edadActual"
          label="Edad Actual (años)"
          placeholder="Edad Actual"
          value={formData.edadActual}
          onChange={handleChange}
          error={errors.edadActual}
        />
        <Input
          id="motivo"
          label="Motivo"
          placeholder="Motivo"
          value={formData.motivo}
          onChange={handleChange}
          error={errors.motivo}
        />
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isEdit ? "Actualizar" : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormParteInmediato;
