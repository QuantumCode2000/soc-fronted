// // import Button from "../../components/Button/Button";
// // import Table from "../../components/Table/Table";
// // import { useUsers } from "../../contexts/UsersContext/UsersContext";
// // import { headersUsers } from "../../data/headers";
// // import Modal from "../../components/Modal/Modal";
// // import { useState } from "react";
// // import FormPersonalRegister from "./FormPersonalRegister";
// // import Content from "../../components/Content/Content";
// // const PersonalRegister = () => {
// //   const [isModalOpen, setOpenModal] = useState(false);
// //   const [formData, setFormData] = useState({
// //     ci: "",
// //     extension: "",
// //     grado: "",
// //     nombre: "",
// //     carnetMilitar: "",
// //     correo: "",
// //   });

// //   const [errors, setErrors] = useState({});
// //   const { users, addUser } = useUsers();

// //   const closeModal = () => setOpenModal(false);
// //   const openModal = () => {
// //     setOpenModal(true);
// //     setFormData({
// //       ci: "",
// //       extension: "",
// //       grado: "",
// //       nombre: "",
// //       carnetMilitar: "",
// //       correo: "",
// //     });
// //     setErrors({});
// //   };

// //   const handleChange = (e) => {
// //     const { id, value } = e.target;
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [id]: value,
// //     }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const newErrors = {};
// //     if (!formData.ci) newErrors.ci = "CI es requerido";
// //     if (!formData.nombre) newErrors.nombre = "Nombre es requerido";
// //     if (!formData.correo) newErrors.correo = "Correo Electrónico es requerido";
// //     setErrors(newErrors);

// //     if (Object.keys(newErrors).length === 0) {
// //       addUser({
// //         ci: formData.ci,
// //         extention: formData.extension,
// //         cm: formData.carnetMilitar,
// //         militaryRank: formData.grado,
// //         nombre: formData.nombre,
// //       });
// //       closeModal();
// //     }
// //   };

// //   return (
// //     <>
// //       <Content>
// //         <Table header={headersUsers} body={users} />
// //       </Content>
// //       <div className="flex justify-end mt-4 ">
// //         <Button
// //           textStyle={""}
// //           text={"Registrar Personal"}
// //           onClick={openModal}
// //         />
// //       </div>
// //       <Modal
// //         title={"Registrar Personal"}
// //         isOpen={isModalOpen}
// //         onClose={closeModal}
// //         onConfirm={handleSubmit}
// //         viewButton={true}
// //       >
// //         <FormPersonalRegister
// //           formData={formData}
// //           errors={errors}
// //           handleChange={handleChange}
// //           handleSubmit={handleSubmit}
// //         />
// //       </Modal>
// //     </>
// //   );
// // };

// // export default PersonalRegister;
// import Button from "../../components/Button/Button";
// import Table from "../../components/Table/Table";
// import { useUsers } from "../../contexts/UsersContext/UsersContext";
// import { headersUsers } from "../../data/headers";
// import Modal from "../../components/Modal/Modal";
// import { useState } from "react";
// import FormPersonalRegister from "./FormPersonalRegister";
// import Content from "../../components/Content/Content";

// const renderCell = (item, key) => {
//   switch (key) {
//     case "inSystemPermission":
//       return (
//         <span
//           className={
//             item[key] === "Admin"
//               ? "text-red-500"
//               : item[key] === "User"
//               ? "text-green-500"
//               : "text-gray-500"
//           }
//         >
//           {item[key]}
//         </span>
//       );
//     case "estado":
//       return (
//         <span
//           className={
//             item[key] === "Activo"
//               ? "text-green-500"
//               : item[key] === "Inactivo"
//               ? "text-red-500"
//               : "text-gray-500"
//           }
//         >
//           {item[key]}
//         </span>
//       );
//     case "rol":
//       return (
//         <span
//           className={
//             item[key] === "Administrador"
//               ? "text-blue-500"
//               : item[key] === "Usuario"
//               ? "text-yellow-500"
//               : "text-gray-500"
//           }
//         >
//           {item[key]}
//         </span>
//       );
//     default:
//       return item[key];
//   }
// };

// const PersonalRegister = () => {
//   const [isModalOpen, setOpenModal] = useState(false);
//   const [formData, setFormData] = useState({
//     ci: "",
//     extension: "",
//     grado: "",
//     nombre: "",
//     carnetMilitar: "",
//     correo: "",
//   });

//   const [errors, setErrors] = useState({});
//   const { users, addUser } = useUsers();

//   const closeModal = () => setOpenModal(false);
//   const openModal = () => {
//     setOpenModal(true);
//     setFormData({
//       ci: "",
//       extension: "",
//       grado: "",
//       nombre: "",
//       carnetMilitar: "",
//       correo: "",
//     });
//     setErrors({});
//   };

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = {};
//     if (!formData.ci) newErrors.ci = "CI es requerido";
//     if (!formData.nombre) newErrors.nombre = "Nombre es requerido";
//     if (!formData.correo) newErrors.correo = "Correo Electrónico es requerido";
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       addUser({
//         ci: formData.ci,
//         extention: formData.extension,
//         cm: formData.carnetMilitar,
//         militaryRank: formData.grado,
//         nombre: formData.nombre,
//       });
//       closeModal();
//     }
//   };

//   return (
//     <>
//       <Content>
//         <Table header={headersUsers} body={users} renderCell={renderCell} />
//       </Content>
//       <div className="flex justify-end mt-4 ">
//         <Button
//           textStyle={""}
//           text={"Registrar Personal"}
//           onClick={openModal}
//         />
//       </div>
//       <Modal
//         title={"Registrar Personal"}
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onConfirm={handleSubmit}
//         viewButton={true}
//       >
//         <FormPersonalRegister
//           formData={formData}
//           errors={errors}
//           handleChange={handleChange}
//           handleSubmit={handleSubmit}
//         />
//       </Modal>
//     </>
//   );
// };

// export default PersonalRegister;

import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import { useUsers } from "../../contexts/UsersContext/UsersContext";
import { headersUsers } from "../../data/headers";
import Modal from "../../components/Modal/Modal";
import FormPersonalRegister from "./FormPersonalRegister";
import Content from "../../components/Content/Content";
const renderCell = (item, key, handleEdit) => {
  switch (key) {
    case "inSystemPermission":
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
    case "acciones":
      return (
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleEdit(item.ci)}
        >
          Editar
        </button>
      );
    default:
      return item[key];
  }
};

const PersonalRegister = () => {
  const [isModalOpen, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    ci: "",
    extension: "",
    grado: "",
    nombre: "",
    carnetMilitar: "",
    correo: "",
    inSystemPermission: "No",
    rol: "Personal",
    estado: "Activo",
  });
  const [errors, setErrors] = useState({});
  const { users, addUser, updateUser } = useUsers();

  const closeModal = () => {
    setOpenModal(false);
    setIsEdit(false);
    setFormData({
      ci: "",
      extension: "",
      grado: "",
      nombre: "",
      carnetMilitar: "",
      correo: "",
      inSystemPermission: "No",
      rol: "Personal",
      estado: "Activo",
    });
    setErrors({});
  };

  const openModal = () => {
    setOpenModal(true);
    setFormData({
      ci: "",
      extension: "",
      grado: "",
      nombre: "",
      carnetMilitar: "",
      correo: "",
      inSystemPermission: "No",
      rol: "Personal",
      estado: "Activo",
    });
    setErrors({});
  };

  const handleEdit = (ci) => {
    const user = users.find((user) => user.ci === ci);
    if (user) {
      setFormData(user);
      setIsEdit(true);
      setOpenModal(true);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.ci) newErrors.ci = "CI es requerido";
    if (!formData.nombre) newErrors.nombre = "Nombre es requerido";
    if (!formData.correo) newErrors.correo = "Correo Electrónico es requerido";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (isEdit) {
        updateUser(formData);
      } else {
        addUser({
          ...formData,
          inSystemPermission: "No",
          rol: "Personal",
          estado: "Activo",
        });
      }
      closeModal();
    }
  };

  return (
    <>
      <Content>
        <Table
          header={{ ...headersUsers, acciones: "Acciones" }}
          body={users}
          renderCell={(item, key) => renderCell(item, key, handleEdit)}
        />
      </Content>
      <div className="flex justify-end mt-4">
        <Button
          textStyle={""}
          text={"Registrar Personal"}
          onClick={openModal}
        />
      </div>
      <Modal
        title={isEdit ? "Editar Personal" : "Registrar Personal"}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleSubmit}
        viewButton={true}
      >
        <FormPersonalRegister
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isEdit={isEdit}
        />
      </Modal>
    </>
  );
};

export default PersonalRegister;