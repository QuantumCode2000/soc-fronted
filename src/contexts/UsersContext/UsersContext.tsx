import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { users as importedUsers } from "../../data/users";
import type { User, UsersContextProps } from "./interfaces";

// Creación del contexto de usuarios
const UsersContext = createContext<UsersContextProps | undefined>(undefined);

// Proveedor del contexto de usuarios
const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado para los usuarios, inicializado con datos del localStorage o datos importados
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : importedUsers;
  });

  // Efecto para actualizar el localStorage cuando los usuarios cambian
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Función para agregar un nuevo usuario
  const addUser = (user: User) => {
    setUsers((prevUsers) => {
      if (prevUsers.some((u) => u.ci === user.ci)) {
        throw new Error("User with the same CI already exists");
      }
      return [...prevUsers, { ...user, password: user.ci }];
    });
  };

  // Función para eliminar un usuario por CI
  const removeUser = (ci: string) => {
    setUsers((prevUsers) => {
      const userExists = prevUsers.some((user) => user.ci === ci);
      if (!userExists) {
        throw new Error("User not found");
      }
      return prevUsers.filter((user) => user.ci !== ci);
    });
  };

  // Función para actualizar un usuario existente
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

  // Proveedor del contexto con el estado y funciones
  return (
    <UsersContext.Provider value={{ users, addUser, removeUser, updateUser }}>
      {children}
    </UsersContext.Provider>
  );
};

// Hook para usar el contexto de usuarios
const useUsers = (): UsersContextProps => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};

export { UsersProvider, useUsers };
export type { User };
