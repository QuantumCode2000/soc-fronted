import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePedidos } from "../../contexts/PedidoContext/PedidoContext";
import { Pedido, Corte } from "../../contexts/PedidoContext/interfacePedido";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const PedidosRegister: React.FC = () => {
  const navigate = useNavigate();
  const { addPedido } = usePedidos();

  const [formData, setFormData] = useState<Pedido>({
    clienteNombre: "",
    descripcion: "",
    cortes: [{ longitud: "", ancho: "", cantidad: 1 }],
  });

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [localErrors, setLocalErrors] = useState<Partial<Pedido>>({});

  // --- Log inicial para ver formData por defecto ---
  console.log("[PedidosRegister] Initial formData:", formData);

  const validateForm = () => {
    const newErrors: Partial<Pedido> = {};
    if (!formData.clienteNombre)
      newErrors.clienteNombre = "Nombre del cliente es requerido";
    if (!formData.descripcion)
      newErrors.descripcion = "Descripción es requerida";

    // Validar cortes
    const cortesErrors = formData.cortes.map((corte) => {
      const errors: Partial<Corte> = {};
      if (!corte.longitud || Number(corte.longitud) <= 0)
        errors.longitud = "Longitud debe ser un número positivo";
      if (!corte.ancho || Number(corte.ancho) <= 0)
        errors.ancho = "Ancho debe ser un número positivo";
      if (!corte.cantidad || Number(corte.cantidad) <= 0)
        errors.cantidad = "Cantidad debe ser mayor a 0";
      return errors;
    });

    if (cortesErrors.some((c) => Object.keys(c).length > 0)) {
      // Sólo para debug
      console.log("Debug cortesErrors:", cortesErrors);
      newErrors.cortes = cortesErrors as unknown as string;
    }

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCorte = () => {
    console.log("[PedidosRegister] handleAddCorte");
    setFormData({
      ...formData,
      cortes: [...formData.cortes, { longitud: "", ancho: "", cantidad: 1 }],
    });
  };

  const handleRemoveCorte = (index: number) => {
    console.log("[PedidosRegister] handleRemoveCorte index:", index);
    const newCortes = formData.cortes.filter((_, i) => i !== index);
    setFormData({ ...formData, cortes: newCortes });
  };

  const handleCorteChange = (index: number, field: string, value: string) => {
    console.log("[PedidosRegister] handleCorteChange:", {
      index,
      field,
      value,
    });
    const newCortes = [...formData.cortes];
    newCortes[index] = { ...newCortes[index], [field]: value };
    setFormData({ ...formData, cortes: newCortes });
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[PedidosRegister] handleConfirm llamado.");
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setConfirmModalOpen(true);
    } else {
      console.log("Debug: Errores en form:", errors);
      setLocalErrors(errors);
    }
  };

  const handleSubmit = async () => {
    console.log("[PedidosRegister] handleSubmit llamado.");
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const pedidoData = {
        ...formData,
        cortes: formData.cortes.map((corte) => ({
          longitud: Number(corte.longitud),
          ancho: Number(corte.ancho),
          cantidad: Number(corte.cantidad),
        })),
      };

      console.log(
        "[PedidosRegister] Enviando pedidoData a addPedido:",
        pedidoData,
      );

      try {
        await addPedido(pedidoData);
        console.log(
          "[PedidosRegister] Pedido registrado con éxito:",
          pedidoData,
        );

        setFormData({
          clienteNombre: "",
          descripcion: "",
          cortes: [{ longitud: "", ancho: "", cantidad: 1 }],
        });
        setConfirmModalOpen(false);
        navigate("/pedidos");
      } catch (error) {
        console.log("[PedidosRegister] Error al registrar el pedido:", error);
      }
    } else {
      console.log("Debug: Errores finales en form:", errors);
      setLocalErrors(errors);
    }
  };

  return (
    <div className="pedido-register-container p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">
        Registro Pedido de Corte de Lámina de Vidrio
      </h2>
      <form onSubmit={handleConfirm} className="space-y-4">
        <Input
          id="clienteNombre"
          label="Nombre del Cliente"
          name="clienteNombre"
          value={formData.clienteNombre}
          onChange={handleChange}
          required
        />
        {localErrors.clienteNombre && (
          <div className="text-red-500">{localErrors.clienteNombre}</div>
        )}

        <Input
          id="descripcion"
          label="Descripción"
          name="descripcion"
          type="textarea"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
        {localErrors.descripcion && (
          <div className="text-red-500">{localErrors.descripcion}</div>
        )}

        <div>
          <h3 className="text-xl font-semibold mb-2">Cortes</h3>
          {formData.cortes.map((corte, index) => (
            <div
              key={index}
              className="corte-item p-4 mb-4 border rounded-md flex items-center gap-4"
            >
              <Input
                id={`longitud-${index}`}
                label="Longitud"
                name="longitud"
                type="number"
                value={corte.longitud}
                onChange={(e) =>
                  handleCorteChange(index, "longitud", e.target.value)
                }
                required
                min="1"
              />
              <Input
                id={`ancho-${index}`}
                label="Ancho"
                name="ancho"
                type="number"
                value={corte.ancho.toString()}
                onChange={(e) =>
                  handleCorteChange(index, "ancho", e.target.value)
                }
                required
                min="1"
              />
              <Input
                id={`cantidad-${index}`}
                label="Cantidad"
                name="cantidad"
                type="number"
                value={corte.cantidad.toString()}
                onChange={(e) =>
                  handleCorteChange(index, "cantidad", e.target.value)
                }
                required
                min="1"
              />
              <Button
                onClick={() => handleRemoveCorte(index)}
                text="Eliminar"
                textStyle="bg-red-600 hover:bg-red-700"
              />
            </div>
          ))}
          <Button
            onClick={handleAddCorte}
            text="Agregar Corte"
            textStyle="bg-blue-600 hover:bg-blue-700"
          />
        </div>

        <Button
          onClick={handleConfirm}
          text="Registrar Pedido"
          textStyle="bg-green-600 hover:bg-green-700"
        />
      </form>

      {isConfirmModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirmar Pedido</h3>
            <p>¿Estás seguro de que deseas registrar este pedido?</p>
            <Button
              onClick={handleSubmit}
              text="Confirmar"
              textStyle="bg-green-600 hover:bg-green-700"
            />
            <Button
              onClick={() => setConfirmModalOpen(false)}
              text="Cancelar"
              textStyle="bg-gray-600 hover:bg-gray-700"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PedidosRegister;
