import React from "react";

interface FormInventarioEditProps {
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
  handleSubmit: () => void;
}

const FormInventarioEdit: React.FC<FormInventarioEditProps> = ({
  formData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-4"
    >
      {/* Mismos campos que en FormInventarioRegister */}
      <div>
        <label>ID Lamina</label>
        <input
          id="iDLamina"
          type="text"
          value={formData.iDLamina}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Tipo de Lámina</label>
        <input
          id="tipoLamina"
          type="text"
          value={formData.tipoLamina}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Dimensiones de la Lámina</label>
        <input
          id="dimensionesLamina"
          type="text"
          value={formData.dimensionesLamina}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Cantidad Disponible</label>
        <input
          id="cantidadDisponible"
          type="text"
          value={formData.cantidadDisponible}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Espesor</label>
        <input
          id="espesor"
          type="text"
          value={formData.espesor}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Color</label>
        <input
          id="color"
          type="text"
          value={formData.color}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Fecha de Ingreso</label>
        <input
          id="fechaIngreso"
          type="date"
          value={formData.fechaIngreso}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Estado</label>
        <select
          id="estado"
          value={formData.estado}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="Disponible">Disponible</option>
          <option value="No Disponible">No Disponible</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Guardar Cambios
      </button>
    </form>
  );
};

export default FormInventarioEdit;
