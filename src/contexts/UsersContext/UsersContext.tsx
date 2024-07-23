import React, { createContext, useContext, useState, ReactNode } from "react";
import { users as importedUsers } from "../../data/data";
interface User {
  ci: string;
  extention: string;
  cm: string;
  militaryRank: string;
  nombre: string;
}

interface UsersContextProps {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (ci: string) => void;
  updateUser: (user: User) => void;
}

const UsersContext = createContext<UsersContextProps | undefined>(undefined);

const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(importedUsers);

  const addUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const removeUser = (ci: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.ci !== ci));
  };

  const updateUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.ci === updatedUser.ci ? updatedUser : user,
      ),
    );
  };

  return (
    <UsersContext.Provider value={{ users, addUser, removeUser, updateUser }}>
      {children}
    </UsersContext.Provider>
  );
};

const useUsers = (): UsersContextProps => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};

export { UsersProvider, useUsers };
