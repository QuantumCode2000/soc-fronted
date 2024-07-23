import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import { useUsers } from "../../contexts/UsersContext/UsersContext";

const clasificaciones = ["Orgánica", "Dotación Individual"];
const armamentos = ["Fusil Galil", "Pistola"];
const estados = ["B/E", "R/E", "M/E"];

const FormWeaponRegister = ({ formData, errors, handleChange }) => {
  const { users } = useUsers();

  return (
    <div className="container mx-auto p-6">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            id="codigo"
            label="Código"
            placeholder="Código del Arma"
            value={formData.codigo}
            onChange={handleChange}
            error={errors.codigo}
          />
        </div>
        <div>
          <Input
            id="nroarma"
            label="Número de Arma"
            placeholder="Número de Arma"
            value={formData.nroarma}
            onChange={handleChange}
            error={errors.nroarma}
          />
        </div>
        <div>
          <Select
            id="clasificacion"
            label="Clasificación"
            options={clasificaciones}
            value={formData.clasificacion}
            onChange={handleChange}
          />
        </div>
        <div>
          {formData.clasificacion === "Orgánica" ? (
            <Input
              id="propietario"
              label="Propietario"
              placeholder="Propietario"
              value="Departamento VI"
              onChange={handleChange}
              disabled
            />
          ) : (
            <Select
              id="propietario"
              label="Propietario"
              options={users.map((user) => `${user.militaryRank} ${user.nombre}`)}
              value={formData.propietario}
              onChange={handleChange}
            />
          )}
        </div>
        <div>
          <Select
            id="armamento"
            label="Armamento"
            options={armamentos}
            value={formData.armamento}
            onChange={handleChange}
          />
        </div>
        <div>
          <Input
            id="modelo"
            label="Modelo"
            placeholder="Modelo"
            value={formData.modelo}
            onChange={handleChange}
            error={errors.modelo}
          />
        </div>
        <div>
          <Input
            id="calibre"
            label="Calibre"
            placeholder="Calibre"
            value={formData.calibre}
            onChange={handleChange}
            error={errors.calibre}
          />
        </div>
        <div>
          <Input
            id="industria"
            label="Industria"
            placeholder="Industria"
            value={formData.industria}
            onChange={handleChange}
            error={errors.industria}
          />
        </div>
        <div>
          <Select
            id="estado"
            label="Estado"
            options={estados}
            value={formData.estado}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <Input
            id="observations"
            label="Observaciones"
            placeholder="Observaciones"
            value={formData.observations}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default FormWeaponRegister;
