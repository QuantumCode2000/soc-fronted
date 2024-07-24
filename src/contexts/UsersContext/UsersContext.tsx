import React, { createContext, useContext, useState, ReactNode } from "react";
import { users as importedUsers } from "../../data/data";

// Definir la interfaz del usuario
interface User {
  ci: string;
  extention: string;
  cm: string;
  militaryRank: string;
  nombre: string;
}

// Definir la interfaz para las props del contexto de usuarios
interface UsersContextProps {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (ci: string) => void;
  updateUser: (user: User) => void;
}

// Crear el contexto de usuarios
const UsersContext = createContext<UsersContextProps | undefined>(undefined);

// Crear el proveedor del contexto de usuarios
const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(importedUsers);

  // Función para agregar un usuario
  const addUser = (user: User) => {
    setUsers((prevUsers) => {
      // Verificar si el usuario ya existe
      if (prevUsers.some((u) => u.ci === user.ci)) {
        throw new Error("User with the same CI already exists");
      }
      return [...prevUsers, user];
    });
  };

  // Función para remover un usuario
  const removeUser = (ci: string) => {
    setUsers((prevUsers) => {
      const userExists = prevUsers.some((user) => user.ci === ci);
      if (!userExists) {
        throw new Error("User not found");
      }
      return prevUsers.filter((user) => user.ci !== ci);
    });
  };

  // Función para actualizar un usuario
  const updateUser = (updatedUser: User) => {
    setUsers((prevUsers) => {
      const userExists = prevUsers.some((user) => user.ci === updatedUser.ci);
      if (!userExists) {
        throw new Error("User not found");
      }
      return prevUsers.map((user) =>
        user.ci === updatedUser.ci ? updatedUser : user,
      );
    });
  };

  return (
    <UsersContext.Provider value={{ users, addUser, removeUser, updateUser }}>
      {children}
    </UsersContext.Provider>
  );
};

// Hook personalizado para usar el contexto de usuarios
const useUsers = (): UsersContextProps => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};

export { UsersProvider, useUsers };
