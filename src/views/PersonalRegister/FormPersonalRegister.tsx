import Input from "../../components/Input/Input";
const FormPersonalRegister = () => {
  return (
    <div>
      <Input label="CI" placeholder="Cédula de Identidad" />
      <Input label="Nombre" placeholder="Nombre" />
      <Input label="Grado" placeholder="Grado" />
      <Input label="Carnet Militar" placeholder="Carnet Militar" />
      <Input label="Extensión" placeholder="Extensión" />
      <Input label="Unidad" placeholder="Unidad" />
      <Input label="Cargo" placeholder="Cargo" />
      <Input label="Teléfono" placeholder="Teléfono" />
      <Input label="Correo Electrónico" placeholder="Correo Electrónico" />
    </div>
  );
};

export default FormPersonalRegister;
