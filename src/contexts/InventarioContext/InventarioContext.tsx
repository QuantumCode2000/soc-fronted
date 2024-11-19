import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode
} from "react";
import axios from "axios";


const initialFormState: Inventario = {
  id: 0,
  iDLamina: "",
  tipoLamina: "",
  dimensionesLamina: "",
  cantidadDisponible: "",
  espesor: "",
  color: "",
  fechaIngreso: "",
  estado: "",
  createdAt: "",
  updatedAt: "",
  deletedAt: null,
};

interface InventarioContextProps {
  inventarios: Inventario[];
  formData: Inventario;
  addInventatio: (item: Inventario)=> Promise<void>;
  updateInventario: (item: Partial<Inventario>) => Promise<void>;
  fetchInventario: () => Promise<void>;
  setFormData: React.Dispatch<React.SetStateAction<Inventario>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleRegisterSubmit: () => Promise<void>;
  handleEditSubmit: (id: number) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
}


const InventarioContext = createContext<InventarioContextProps | undefined>(undefined);

export const InventarioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inventarios, setInventarios] = useState<Inventario[]>([]);
  const [formData, setFormData] = useState<Inventario>(initialFormState);

// Función para obtener todos los elementos del inventario del backend
  const fetchInventarios = async () => {
    try {
      const response = await axios.get ("http://localhost:3000/api/v1/inventarios");
      //const data = await response.json();
      setInventarios(response.data);
    } catch (error) {
      console.error("Error fetching inventarios:", error);
    }
  };

  // Cargar usuarios al montar el componente
  useEffect(() => {
  fetchInventarios();
  }, []);

// Función para gestionar los cambios en los campos del formulario y actualizar
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
//Función para procesar el envío del formulario cuando se registra un nuevo elemento.
  const handleRegisterSubmit = async () => {
    console.log ("mendasadasdas", formData)
    try {
      const response = await axios.post ("http://localhost:3000/api/v1/inventarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchInventarios(); //  actualizar la lista de inventario
        setFormData(initialFormState); // Reset de formulario luego de actualizar
      } else {
        console.error("Failed to create inventory item.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEditSubmit = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/inventarios/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchInventarios(); // actualizar la lista de inventario
        setFormData(initialFormState); // Reset de formulario luego de actualizar
      } else {
        console.error("Failed to update inventory item.");
      }
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/inventarios/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchInventarios(); // actualiza la lista de inventario
      } else {
        console.error("Failed to delete inventory item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    fetchInventarios();
  }, []);

  return (
    <InventarioContext.Provider
      value={{
        inventarios,
        formData,
        setFormData,
        fetchInventarios,
        handleChange,
        handleRegisterSubmit,
        handleEditSubmit,
        handleDelete,
      }}
    >
      {children}
    </InventarioContext.Provider>
  );
};

export const useInventarios = () => {
  const context = useContext(InventarioContext);
  if (!context) {
    throw new Error("useInventarios must be used within an InventarioProvider");
  }
  return context;
};
