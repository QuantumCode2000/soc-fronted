import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Corregido para usar la importación sin llaves

interface AuthContextProps {
  isAuthenticated: boolean;
  user: { email: string; rol: string; nombre: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem("token"));
  });
  const [user, setUser] = useState<{
    email: string;
    rol: string;
    nombre: string;
  } | null>(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: { email: string; rol: string; nombre: string } =
        jwtDecode(token);
      return { email: decoded.email, rol: decoded.rol, nombre: decoded.nombre };
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          email,
          password,
        },
      );

      if (response.status === 200) {
        const { token } = response.data;
        const decoded: { email: string; rol: string; nombre: string } =
          jwtDecode(token);
        setIsAuthenticated(true);
        setUser({
          email: decoded.email,
          rol: decoded.rol,
          nombre: decoded.nombre,
        });
        localStorage.setItem("token", token);
        return true;
      }
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
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
