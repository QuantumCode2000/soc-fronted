import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import { usePedidos } from "../../contexts/PedidoContext/PedidoContext";
import { headersPedidos } from "../../data/headersPedidos";
import Modal from "../../components/Modal/Modal";
import PedidosRegister from "./PedidosRegister";
import FormPedidoEdit from "./FormPedidoEdit";
import Content from "../../components/Content/Content";
import ViewMore from "../../components/ViewMore/ViewMore";
import type { Pedido } from "../../contexts/PedidoContext/interfacePedido";
import { LuFileText } from "react-icons/lu";
import { IoCutSharp } from "react-icons/io5";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import { FaCut } from "react-icons/fa";

const firstState: Pedido = {
  clienteNombre: "",
  descripcion: "",
  fechaCreacion: "",
  cortes: [],
};

const Pedidos: React.FC = () => {
  const [isModalOpen, setOpenModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isViewMoreOpen, setViewMoreOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Pedido>(firstState);
  const [formDataEdit, setFormDataEdit] = useState<Pedido>(firstState);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { pedidos, addPedido, updatePedido } = usePedidos();
  const [modifiedData, setModifiedData] = useState<Partial<Pedido>>({});
  const [isCuttingModalOpen, setCuttingModalOpen] = useState<boolean>(false);
  const [cuttingData, setCuttingData] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  console.log("Pedidos", cuttingData);
  const closeModal = () => {
    setOpenModal(false);
    setIsEdit(false);
    setFormData(firstState);
  };

  const closeViewMoreModal = () => {
    setViewMoreOpen(false);
    setSelectedPedido(null);
  };

  const closeCuttingModal = () => {
    setCuttingModalOpen(false);
    setSelectedPedido(null);
  };

  const openModal = () => {
    setOpenModal(true);
    setIsEdit(false);
    setFormData(firstState);
  };

  const handleViewMore = (inventarioId: string) => {
    const pedido = pedidos.find(
      (pedido: Pedido) => pedido.inventarioId === inventarioId,
    );
    if (pedido) {
      setSelectedPedido(pedido);
      setViewMoreOpen(true);
    }
  };

  const realizarCorte = async (id: string) => {
    setLoading(true);
    const response = await fetch("http://127.0.0.1:8000/optimizar_cortes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_pedido: id }),
    });
    const data = await response.json();
    setLoading(false);
    return data;
  };

  const handleCutting = async (inventarioId: string) => {
    try {
      setCuttingModalOpen(true);
      const result = await realizarCorte(inventarioId);

      setCuttingData(result);
    } catch (error) {
      console.error("Error al realizar corte:", error);
    }
  };

  const handleChangeEdit = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormDataEdit((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleEdit = (inventarioId: string) => {
    const pedido = pedidos.find(
      (pedido: Pedido) => pedido.inventarioId === inventarioId,
    );
    if (pedido) {
      setFormData(pedido);
      setFormDataEdit(pedido);
      setIsEdit(true);
      setOpenModal(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updatePedido(modifiedData);
      } else {
        await addPedido(formData);
      }
      closeModal();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const renderCell = (item: Pedido, key: keyof Pedido) => {
    if (key === "cortes" && Array.isArray(item[key])) {
      return (
        <div style={{ padding: "10px" }}>
          <h4 style={{ marginBottom: "5px" }}>Cortes:</h4>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {item[key].map((corte, index) => (
              <li
                key={index}
                style={{
                  padding: "8px",
                  marginBottom: "5px",
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              >
                <strong>Longitud:</strong> {corte.longitud} <br />
                <strong>Ancho:</strong> {corte.ancho} <br />
                <strong>Cantidad:</strong> {corte.cantidad}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return <span>{item[key]}</span>;
  };

  return (
    <>
      <Content>
        <Table
          header={{ ...headersPedidos.tabla, acciones: "Acciones" }}
          body={pedidos}
          renderCell={(item: Pedido, key: keyof Pedido | "acciones") => (
            <div>
              {key !== "acciones" && renderCell(item, key as keyof Pedido)}
              {key === "acciones" && (
                <div className="flex gap-2">
                  <ButtonIcon
                    icon={<LuFileText />}
                    onClick={() => handleViewMore(item.id)}
                    textTooltip={"Ver más"}
                  />
                  <ButtonIcon
                    icon={<IoCutSharp />}
                    onClick={() => handleCutting(item.id)}
                    textTooltip={"Realizar Corte"}
                  />
                </div>
              )}
            </div>
          )}
        />
      </Content>
      <div className="flex justify-end mt-4">
        <Button text={"Registrar Pedido"} onClick={openModal} textStyle={""} />
      </div>
      <Modal
        title={isEdit ? "Editar Pedido" : "Registrar Pedido"}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {error && <p className="text-red-500">{error}</p>}
        {isEdit ? (
          <FormPedidoEdit
            formData={formData}
            formDataEdit={formDataEdit}
            setModifiedData={setModifiedData}
            handleChangeEdit={handleChangeEdit}
            handleSubmit={handleSubmit}
          />
        ) : (
          <PedidosRegister
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </Modal>
      {selectedPedido && (
        <Modal
          title="Detalles del Pedido"
          isOpen={isViewMoreOpen}
          onClose={closeViewMoreModal}
        >
          <ViewMore titles={headersPedidos.verMas} data={selectedPedido} />
        </Modal>
      )}

      <Modal
        title="Optimización de cortes"
        isOpen={isCuttingModalOpen}
        onClose={closeCuttingModal}
      >
        {loading ? (
          // <div style={{ padding: "16px" }}>
          //   <div
          //     className="flex justify-center items-center"
          //     style={{
          //       animation: "spin 2s linear infinite",
          //     }}
          //   >
          //     <FaCut style={{ fontSize: "64px", color: "#333" }} />
          //   </div>
          // </div>
          <div style={{ padding: "16px", textAlign: "center" }}>
            <div
              className="cutting-animation flex justify-center items-center"
              style={{
                animation: "spin 2s linear infinite",
              }}
            >
              <FaCut style={{ fontSize: "64px" }} />
            </div>
            <p className="cutting-text"></p>

            <style>
              {`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      @keyframes changeText {
        0% { content: "Analizando..."; }
        33% { content: "Cargando..."; }
        66% { content: "Cortando..."; }
        100% { content: "Creando Imagenes..."; }
      }

      .cutting-text::after {
        content: "Cargando...";
        animation: changeText 3s infinite;
        font-size: 18px;
        font-weight: bold;
        color: #555;
      }
    `}
            </style>
          </div>
        ) : (
          cuttingData && (
            <div style={{ padding: "16px" }}>
              <h2>{cuttingData.message}</h2>
              <h3>
                Cantidad de láminas: {cuttingData.resultado.cantidad_de_laminas}
              </h3>

              <hr style={{ margin: "16px 0" }} />

              <h4>Láminas usadas:</h4>
              {cuttingData.resultado.laminas_usadas.map((lamina, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    padding: "10px",
                    marginBottom: "12px",
                  }}
                >
                  <p>
                    <strong>ID de lámina:</strong>{" "}
                    {lamina.id_lamina !== null ? lamina.id_lamina : "N/A"}
                  </p>
                  <p>
                    <strong>Dimensiones:</strong> {lamina.dimensiones_lamina[0]}{" "}
                    x {lamina.dimensiones_lamina[1]}
                  </p>
                  <p>
                    <strong>Cortes realizados:</strong>{" "}
                    {lamina.cortes_realizados.map((corte, i) => (
                      <span key={i}>
                        [{corte[0]} x {corte[1]}]{" "}
                      </span>
                    ))}
                  </p>
                </div>
              ))}

              {cuttingData.imagenes && cuttingData.imagenes.length > 0 && (
                <>
                  <hr style={{ margin: "16px 0" }} />
                  <h4>Imágenes generadas:</h4>
                  <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    {cuttingData.imagenes.map((img, idx) => {
                      // Construir la URL completa según tu configuración.
                      // Ejemplo: Si montaste la carpeta "cortes" en "/cortes",:
                      const imageUrl = `http://127.0.0.1:8000/${img}`;

                      return (
                        <li
                          key={idx}
                          style={{
                            marginBottom: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                          }}
                        >
                          {/* Vista previa de la imagen dentro del modal */}
                          <img
                            src={imageUrl}
                            alt={`lamina_${idx + 1}`}
                            style={{
                              maxWidth: "100%",
                              display: "block",
                              marginBottom: "8px",
                            }}
                          />

                          {/* Botón/enlace de descarga */}
                          <a
                            href={imageUrl}
                            download
                            style={{
                              display: "inline-block",
                              padding: "6px 12px",
                              backgroundColor: "#4caf50",
                              color: "#fff",
                              textDecoration: "none",
                              borderRadius: "4px",
                            }}
                          >
                            Descargar
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          )
        )}
      </Modal>
    </>
  );
};

export default Pedidos;
