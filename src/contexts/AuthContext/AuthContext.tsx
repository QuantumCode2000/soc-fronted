import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useUsers } from "../UsersContext/UsersContext";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: { email: string; role: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { users } = useUsers();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem("isAuthenticated"));
  });
  const [user, setUser] = useState<{ email: string; role: string } | null>(
    () => {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    },
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (email: string, password: string) => {
    const foundUser = users.find(
      (user) => user.email === email && user.password === password,
    );
    if (foundUser) {
      const role = foundUser.rol || "user";
      setIsAuthenticated(true);
      setUser({ email, role });
      return true;
    } else {
      alert("Credenciales incorrectas");
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthContext };
