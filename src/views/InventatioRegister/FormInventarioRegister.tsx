import React from "react";

interface FormInventarioRegisterProps {
  formData: {
    iDLamina: string;
    tipoLamina: string;
    dimensionesLamina: string;
    cantidadDisponible: string;
    espesor: string;
    color: string;
    fechaIngreso: string;
    estado: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const FormInventarioRegister: React.FC<FormInventarioRegisterProps> = ({
  formData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        name="iDLamina"
        value={formData.iDLamina}
        onChange={handleChange}
        placeholder="ID Lámina"
      />
      <input
        type="text"
        name="tipoLamina"
        value={formData.tipoLamina}
        onChange={handleChange}
        placeholder="Tipo Lámina"
      />
      <input
        type="text"
        name="dimensionesLamina"
        value={formData.dimensionesLamina}
        onChange={handleChange}
        placeholder="Dimensiones"
      />
      <input
        type="text"
        name="cantidadDisponible"
        value={formData.cantidadDisponible}
        onChange={handleChange}
        placeholder="Cantidad Disponible"
      />
      <input
        type="text"
        name="espesor"
        value={formData.espesor}
        onChange={handleChange}
        placeholder="Espesor"
      />
      <input
        type="text"
        name="color"
        value={formData.color}
        onChange={handleChange}
        placeholder="Color"
      />
      <input
        type="date"
        name="fechaIngreso"
        value={formData.fechaIngreso}
        onChange={handleChange}
        placeholder="Fecha de Ingreso"
      />
      <select name="estado" value={formData.estado} onChange={handleChange}>
        <option value="">Selecciona un estado</option>
        <option value="Disponible">Disponible</option>
        <option value="No Disponible">No Disponible</option>
      </select>
      <button type="submit">Registrar Inventario</button>
    </form>
  );
};

export default FormInventarioRegister;
