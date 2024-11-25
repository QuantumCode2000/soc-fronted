import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import { useUsers } from "../../contexts/UsersContext/UsersContext";
import { headersUsers } from "../../data/headers";
import Modal from "../../components/Modal/Modal";
import FormPersonalRegister from "./FormPersonalRegister";
import FormPersonalEdit from "./FormPersonalEdit";
import Content from "../../components/Content/Content";
import ViewMore from "../../components/ViewMore/ViewMore";
import type { User } from "../../contexts/UsersContext/interfaces";
import { LuClipboardEdit, LuFileText } from "react-icons/lu";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";

const firstState: User = {
  ci: "",
  extension: "",
  nombre: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  email: "",
  password: "",
  inSystemPermissions: "No",
  rol: "Personal",
  estado: "Activo",
};

const PersonalRegister: React.FC = () => {
  const [isModalOpen, setOpenModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isViewMoreOpen, setViewMoreOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<User>(firstState);
  const [formDataEdit, setFormDataEdit] = useState<User>(firstState);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const { users, addUser, updateUser } = useUsers();
  const [modifiedData, setModifiedData] = useState<Partial<User>>({});

  const closeModal = () => {
    setOpenModal(false);
    setIsEdit(false);
    setFormData(firstState);
  };

  const closeViewMoreModal = () => {
    setViewMoreOpen(false);
    setSelectedUser(null);
  };

  const openModal = () => {
    setOpenModal(true);
    setIsEdit(false);
    setFormData(firstState);
  };

  const handleViewMore = (ci: string) => {
    const user = users.find((user) => user.ci === ci);
    if (user) {
      setSelectedUser(user);
      setViewMoreOpen(true);
    }
  };

  const handleChangeEdit = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormDataEdit((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleEdit = (ci: string) => {
    const user = users.find((user) => user.ci === ci);
    if (user) {
      setFormData(user);
      setFormDataEdit(user);
      setIsEdit(true);
      setOpenModal(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updateUser(modifiedData); // Aquí se incluye la nueva contraseña si se cambió
      } else {
        await addUser({
          ...formData,
          password: formData.ci, // Se puede inicializar la contraseña con el CI
        });
      }
      closeModal();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const renderCell = (item: User, key: keyof User) => {
    switch (key) {
      case "inSystemPermissions":
        return (
          <span
            className={
              item[key] === "Sí"
                ? "bg-green-500 text-white px-2 py-1 rounded"
                : "bg-red-500 text-white px-2 py-1 rounded"
            }
          >
            {item[key]}
          </span>
        );
      case "estado":
        return (
          <span
            className={
              item[key] === "Activo"
                ? "bg-green-500 text-white px-2 py-1 rounded"
                : "bg-red-500 text-white px-2 py-1 rounded"
            }
          >
            {item[key]}
          </span>
        );
      case "rol":
        return (
          <span
            className={
              item[key] === "Administrador"
                ? "bg-blue-500 text-white px-2 py-1 rounded"
                : item[key] === "Encargado"
                ? "bg-green-500 text-white px-2 py-1 rounded"
                : "bg-yellow-500 text-white px-2 py-1 rounded"
            }
          >
            {item[key]}
          </span>
        );
      default:
        return item[key];
    }
  };

  return (
    <>
      <Content>
        <Table
          header={{ ...headersUsers.tabla, acciones: "Acciones" }}
          body={users}
          renderCell={(item: User, key: keyof User | "acciones") => (
            <div>
              {key !== "acciones" && renderCell(item, key as keyof User)}
              {key === "acciones" && (
                <div className="flex gap-2">
                  <ButtonIcon
                    icon={<LuFileText />}
                    onClick={() => handleViewMore(item.ci)}
                    textTooltip={"Ver más"}
                  />
                  <ButtonIcon
                    icon={<LuClipboardEdit />}
                    onClick={() => handleEdit(item.ci)}
                    textTooltip={"Editar"}
                  />
                </div>
              )}
            </div>
          )}
        />
      </Content>
      <div className="flex justify-end mt-4">
        <Button
          text={"Registrar Personal"}
          onClick={openModal}
          textStyle={""}
        />
      </div>
      <Modal
        title={isEdit ? "Editar Personal" : "Registrar Personal"}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {error && <p className="text-red-500">{error}</p>} {/* Mostrar error */}
        {isEdit ? (
          <FormPersonalEdit
            formData={formData}
            formDataEdit={formDataEdit}
            setModifiedData={setModifiedData}
            handleChangeEdit={handleChangeEdit}
            handleSubmit={handleSubmit}
          />
        ) : (
          <FormPersonalRegister
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </Modal>
      {selectedUser && (
        <Modal
          title="Detalles del Usuario"
          isOpen={isViewMoreOpen}
          onClose={closeViewMoreModal}
        >
          <ViewMore titles={headersUsers.verMas} data={selectedUser} />
        </Modal>
      )}
    </>
  );
};

export default PersonalRegister;
