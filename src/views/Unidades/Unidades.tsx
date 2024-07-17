// import React from "react";
// import Table from "../../components/Table/Table";
// import Button from "../../components/Button/Button";

// const Unidades = () => {
//   const header = ["Name", "Age", "Status", "Date"];
//   const body = [
//     {
//       name: "Sufyan",
//       age: 22,
//       status: "Acceptable",
//       date: "6/4/2000",
//     },
//     {
//       name: "Ali",
//       age: 25,
//       status: "Good",
//       date: "6/4/2000",
//     },
//     {
//       name: "Usman",
//       age: 30,
//       status: "Bad",
//       date: "6/4/2000",
//     },
//     {
//       name: "Ahmed",
//       age: 35,
//       status: "Good",
//       date: "6/4/2000",
//     },
//     {
//       name: "Kashif",
//       age: 40,
//       status: "Acceptable",
//       date: "6/4/2000",
//     },
//     {
//       name: "Majid",
//       age: 45,
//       status: "Good",
//       date: "6/4/2000",
//     },
//     {
//       name: "Noman",
//       age: 50,
//       status: "Bad",
//       date: "6/4/2000",
//     },
//     {
//       name: "Fahad",
//       age: 55,
//       status: "Good",
//       date: "6/4/2000",
//     },
//     {
//       name: "Sufyan",
//       age: 22,
//       status: "Acceptable",
//       date: "6/4/2000",
//     },
//     {
//       name: "Ali",
//       age: 25,
//       status: "Good",
//       date: "6/4/2000",
//     },
//     {
//       name: "Usman",
//       age: 30,
//       status: "Bad",
//       date: "6/4/2000",
//     },
//     {
//       name: "Ahmed",
//       age: 35,
//       status: "Good",
//       date: "6/4/2000",
//     },
//     {
//       name: "Kashif",
//       age: 40,
//       status: "Acceptable",
//       date: "6/4/2000",
//     },
//     {
//       name: "Majid",
//       age: 45,
//       status: "Good",
//       date: "6/4/2000",
//     },
//     {
//       name: "Noman",
//       age: 50,
//       status: "Bad",
//       date: "6/4/2000",
//     },
//     {
//       name: "Fahad",
//       age: 55,
//       status: "Good",
//       date: "6/4/2000",
//     },
//   ];
//   return (
//     <>
//       <Table header={header} body={body} />
//       <Button text={"Open Modal"}/>
//     </>
//   );
// };

// export default Unidades;
import React, { useState } from "react";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import SearchInput from "../../components/SearchInput/SearchInput";

const Unidades = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const header = ["Name", "Age", "Status", "Date"];
  const body = [
    {
      name: "Sufyan",
      age: 22,
      status: "Acceptable",
      date: "6/4/2000",
    },
    {
      name: "Ali",
      age: 25,
      status: "Good",
      date: "6/4/2000",
    },
    {
      name: "Usman",
      age: 30,
      status: "Bad",
      date: "6/4/2000",
    },
    {
      name: "Ahmed",
      age: 35,
      status: "Good",
      date: "6/4/2000",
    },
    {
      name: "Kashif",
      age: 40,
      status: "Acceptable",
      date: "6/4/2000",
    },
    {
      name: "Majid",
      age: 45,
      status: "Good",
      date: "6/4/2000",
    },
    {
      name: "Noman",
      age: 50,
      status: "Bad",
      date: "6/4/2000",
    },
    {
      name: "Fahad",
      age: 55,
      status: "Good",
      date: "6/4/2000",
    },
    {
      name: "Sufyan",
      age: 22,
      status: "Acceptable",
      date: "6/4/2000",
    },
    {
      name: "Ali",
      age: 25,
      status: "Good",
      date: "6/4/2000",
    },
    {
      name: "Usman",
      age: 30,
      status: "Bad",
      date: "6/4/2000",
    },
    {
      name: "Ahmed",
      age: 35,
      status: "Good",
      date: "6/4/2000",
    },
    {
      name: "Kashif",
      age: 40,
      status: "Acceptable",
      date: "6/4/2000",
    },
    {
      name: "Majid",
      age: 45,
      status: "Good",
      date: "6/4/2000",
    },
    {
      name: "Noman",
      age: 50,
      status: "Bad",
      date: "6/4/2000",
    },
    {
      name: "Fahad",
      age: 55,
      status: "Good",
      date: "6/4/2000",
    },
  ];

  return (
    <>
      <SearchInput placeholder={"Inserte Carnet"} />
      <Table header={header} body={body} />
      <Button text="Open Modal" onClick={openModal} />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Unidades;
