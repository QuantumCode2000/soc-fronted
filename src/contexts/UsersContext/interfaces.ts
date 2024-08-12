interface User {
  id?: string;
  ci: string;
  extension: string;
  grado: string;
  especialidad: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  email: string;
  inSystemPermissions: string;
  rol: string;
  estado: string;
  password: string;
  unidad: string;
}

interface UsersContextProps {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (ci: string) => void;
  updateUser: (user: User) => void;
}

export type { User, UsersContextProps };