// import Input from "../../components/Input/Input";
// import Select from "../../components/Select/Select";

// const departamentos = [
//   "La Paz",
//   "Cochabamba",
//   "Santa Cruz",
//   "Oruro",
//   "Potosí",
//   "Chuquisaca",
//   "Tarija",
//   "Beni",
//   "Pando",
// ];

// const grados = [
//   "Alférez",
//   "Teniente",
//   "Capitán",
//   "Mayor",
//   "Teniente Coronel",
//   "Coronel",
//   "General de Brigada",
//   "General de División",
//   "General de Ejército",
//   "Contralmirante",
//   "Vicealmirante",
//   "Almirante",
// ];

// const FormPersonalRegister = ({
//   formData,
//   errors,
//   handleChange,
//   handleSubmit,
// }) => {
//   return (
//     <div className="container mx-auto p-6">
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
//         <div>
//           <Input
//             id="ci"
//             label="CI"
//             placeholder="Cédula de Identidad"
//             value={formData.ci}
//             onChange={handleChange}
//             error={errors.ci}
//           />
//         </div>
//         <div>
//           <Select
//             id="extension"
//             label="Extensión"
//             options={departamentos}
//             value={formData.extension}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <Select
//             id="grado"
//             label="Grado"
//             options={grados}
//             value={formData.grado}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <Input
//             id="nombre"
//             label="Nombre"
//             placeholder="Nombre"
//             value={formData.nombre}
//             onChange={handleChange}
//             error={errors.nombre}
//           />
//         </div>
//         <div>
//           <Input
//             id="carnetMilitar"
//             label="Carnet Militar"
//             placeholder="Carnet Militar"
//             value={formData.carnetMilitar}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <Input
//             id="correo"
//             label="Correo Electrónico"
//             placeholder="Correo Electrónico"
//             value={formData.correo}
//             onChange={handleChange}
//             error={errors.correo}
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FormPersonalRegister;

import React from "react";
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

const FormPersonalRegister = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  isEdit,
}) => {
  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <Input
            id="ci"
            label="CI"
            placeholder="Cédula de Identidad"
            value={formData.ci}
            onChange={handleChange}
            error={errors.ci}
            disabled={isEdit}
          />
        </div>
        <div>
          <Select
            id="extension"
            label="Extensión"
            options={departamentos}
            value={formData.extension}
            onChange={handleChange}
          />
        </div>
        <div>
          <Select
            id="grado"
            label="Grado"
            options={grados}
            value={formData.grado}
            onChange={handleChange}
          />
        </div>
        <div>
          <Input
            id="nombre"
            label="Nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            error={errors.nombre}
          />
        </div>
        <div>
          <Input
            id="cm"
            label="Carnet Militar"
            placeholder="Carnet Militar"
            value={formData.cm}
            onChange={handleChange}
          />
        </div>
        <div>
          <Input
            id="correo"
            label="Correo Electrónico"
            placeholder="Correo Electrónico"
            value={formData.correo}
            onChange={handleChange}
            error={errors.correo}
          />
        </div>
        {isEdit && (
          <>
            <div>
              <Select
                id="inSystemPermission"
                label="Permiso en Sistema"
                options={["Sí", "No"]}
                value={formData.inSystemPermission}
                onChange={handleChange}
                disabled
              />
            </div>
            <div>
              <Select
                id="rol"
                label="Rol"
                options={roles}
                value={formData.rol}
                onChange={handleChange}
                disabled
              />
            </div>
            <div>
              <Select
                id="estado"
                label="Estado"
                options={estados}
                value={formData.estado}
                onChange={handleChange}
                disabled
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default FormPersonalRegister;
