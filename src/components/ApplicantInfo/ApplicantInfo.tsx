import { useState } from "react";

function ApplicantInfo() {
  const [applicant, setApplicant] = useState({
    grado: "Alférez",
    nombre: "Luis",
    apellidoPater: "Banda",
    apellidoMater: "Quispe",
    motivo: "Para Guardia",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplicant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Información del Solicitante</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Grado</label>
        <input
          type="text"
          name="grado"
          value={applicant.grado}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={applicant.nombre}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Apellido Paterno
        </label>
        <input
          type="text"
          name="apellidoPater"
          value={applicant.apellidoPater}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Apellido Materno
        </label>
        <input
          type="text"
          name="apellidoMater"
          value={applicant.apellidoMater}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Motivo</label>
        <input
          type="text"
          name="motivo"
          value={applicant.motivo}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
    </div>
  );
}

export default ApplicantInfo;
