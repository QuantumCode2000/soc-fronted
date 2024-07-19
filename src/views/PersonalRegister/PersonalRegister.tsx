import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import { useUsers } from "../../contexts/UsersContext/UsersContext";
import { headersUsers } from "../../data/headers";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import FormPersonalRegister from "./FormPersonalRegister";
const PersonalRegister = () => {
  const [isModalOpen, setOpenModal] = useState(false);
  const closeModal = () => setOpenModal(false);
  const openModal = () => setOpenModal(true);
  const { users } = useUsers();
  return (
    <>
      <div className="flex flex-col md:flex-row h-[90%]">
        <Table header={headersUsers} body={users} />
      </div>
      <div className="flex justify-end mt-4 ">
        <Button
          textStyle={""}
          text={"Registrar Personal"}
          onClick={openModal}
        />
      </div>
      <Modal
        title={"Registrar Personal"}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <FormPersonalRegister />
      </Modal>
    </>
  );
};

export default PersonalRegister;
