import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";

const departamentos = [
  "La Paz",
  "Cochabamba",
  "Santa Cruz",
  "Oruro",
  "Potosí",
  "Chuquisaca",
  "Tarija",
  "Beni",
  "Pando",
];

const grados = [
  "Alférez",
  "Teniente",
  "Capitán",
  "Mayor",
  "Teniente Coronel",
  "Coronel",
  "General de Brigada",
  "General de División",
  "General de Ejército",
  "Contralmirante",
  "Vicealmirante",
  "Almirante",
];

const estados = ["Activo", "Inactivo"];
const roles = ["Administrador", "Encargado", "Personal"];

const FormPersonalEdit = ({ formData, errors, handleChange, handleSubmit }) => {
  return (
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Input
          id="ci"
          label="CI"
          placeholder="Cédula de Identidad"
          value={formData.ci}
          onChange={handleChange}
          error={errors.ci}
          disabled
        />
        <Select
          id="extension"
          label="Extensión"
          options={departamentos}
          value={formData.extension}
          onChange={handleChange}
          error={errors.extension}
        />
        <Select
          id="grado"
          label="Grado"
          options={grados}
          value={formData.grado}
          onChange={handleChange}
          error={errors.grado}
        />
        <Input
          id="nombre"
          label="Nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          error={errors.nombre}
        />
        <Input
          id="carnetMilitar"
          label="Carnet Militar"
          placeholder="Carnet Militar"
          value={formData.carnetMilitar}
          onChange={handleChange}
          error={errors.carnetMilitar}
        />
        <Input
          id="correo"
          label="Correo Electrónico"
          placeholder="Correo Electrónico"
          value={formData.correo}
          onChange={handleChange}
          error={errors.correo}
        />
        <Select
          id="inSystemPermission"
          label="Permiso en Sistema"
          options={["Sí", "No"]}
          value={formData.inSystemPermission}
          onChange={handleChange}
          error={errors.inSystemPermission}
        />
        <Select
          id="rol"
          label="Rol"
          options={roles}
          value={formData.rol}
          onChange={handleChange}
          error={errors.rol}
        />
        <Select
          id="estado"
          label="Estado"
          options={estados}
          value={formData.estado}
          onChange={handleChange}
          error={errors.estado}
        />
        <div className="flex justify-end mt-4 col-span-1 md:col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPersonalEdit;
