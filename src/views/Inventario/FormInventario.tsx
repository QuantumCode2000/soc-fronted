import React from "react";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";

const categorias = ["S/N", "Categoria 1", "Categoria 2"]; // Ejemplo de categorías
const sexos = ["MACHO", "HEMBRA"];

const FormInventario = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  isEdit,
}) => {
  return (
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="col-span-1">
          <Input
            id="nombreUnidad"
            label="Nombre de la Unidad"
            placeholder="Nombre de la Unidad"
            value={formData.nombreUnidad}
            onChange={handleChange}
            error={errors.nombreUnidad}
          />
        </div>
        <div className="col-span-1">
          <Input
            id="codigo"
            label="Código"
            placeholder="Código"
            value={formData.codigo}
            onChange={handleChange}
            error={errors.codigo}
            disabled={isEdit}
          />
        </div>
        <div className="col-span-1">
          <Input
            id="raza"
            label="Raza"
            placeholder="Raza"
            value={formData.raza}
            onChange={handleChange}
            error={errors.raza}
          />
        </div>
        <div className="col-span-1">
          <Input
            id="color"
            label="Color"
            placeholder="Color"
            value={formData.color}
            onChange={handleChange}
            error={errors.color}
          />
        </div>
        <div className="col-span-1">
          <Input
            id="marcaCarimbo"
            label="Marca y Carimbo"
            placeholder="Marca y Carimbo"
            value={formData.marcaCarimbo}
            onChange={handleChange}
            error={errors.marcaCarimbo}
          />
        </div>
        <div className="col-span-1">
          <Select
            id="sexo"
            label="Sexo"
            options={sexos}
            value={formData.sexo}
            onChange={handleChange}
            error={errors.sexo}
          />
        </div>
        <div className="col-span-1">
          <Select
            id="categoria"
            label="Categoría"
            options={categorias}
            value={formData.categoria}
            onChange={handleChange}
            error={errors.categoria}
          />
        </div>
        <div className="col-span-1">
          <Input
            id="fechaNac"
            label="Fecha de Nacimiento"
            placeholder="Fecha de Nacimiento"
            value={formData.fechaNac}
            onChange={handleChange}
            error={errors.fechaNac}
          />
        </div>
        <div className="col-span-1">
          <Input
            id="edadActual"
            label="Edad Actual (años)"
            placeholder="Edad Actual"
            value={formData.edadActual}
            onChange={handleChange}
            error={errors.edadActual}
          />
        </div>
        <div className="flex justify-end col-span-2 mt-4">
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

export default FormInventario;
