// import React, { useEffect, useMemo, useState } from "react";
// import { useInventory } from "../../contexts/InventoryContext/InventoryContext";
// import { usePartesInmediatos } from "../../contexts/PartesInmediatos/PartesInmediatosContext";
// import ChartComponent from "./ChartComponent";
// import Percent from "./Percent";
// import Speedometer from "./Speedometer";
// import "./Reportes.styles.css";

// const countBirthsByMonth = (partesInmediatos: any[]) => {
//   const birthsByMonth = Array(12).fill(0);
//   partesInmediatos.forEach((item) => {
//     if (item.novedad === "Nacimiento") {
//       const month = new Date(item.fechaSuceso).getMonth(); // Usar fecha del suceso
//       birthsByMonth[month] += 1;
//     }
//   });
//   return birthsByMonth;
// };

// const ReportesKPI: React.FC = () => {
//   const { inventario } = useInventory();
//   const { partesInmediatos } = usePartesInmediatos();
//   const [percent, setPercent] = useState(0);
//   const [nacimientosPrevistos, setNacimientosPrevistos] = useState(0);
//   const [nacimientosRegistrados, setNacimientosRegistrados] = useState(0);

//   const indiceNacimiento = 0.4;
//   const indMortalidad = 0.1;
//   const indiceVentas = 0.2;

//   useEffect(() => {
//     const calcularVacas = () => {
//       const vacas = inventario.filter(
//         (item) =>
//           item.sexo === "Hembra" &&
//           item.enInventario === "Si" &&
//           new Date().getFullYear() - new Date(item.fechaNac).getFullYear() > 3,
//       );

//       setNacimientosPrevistos(vacas.length * indiceNacimiento);
//     };

//     const calcularNacimientos = () => {
//       const nacimientos = partesInmediatos.filter(
//         (item) => item.novedad === "Nacimiento",
//       );
//       setNacimientosRegistrados(nacimientos.length);
//     };

//     const calcularMortalidad = () => {
//       const muertes = partesInmediatos.filter(
//         (item) => item.novedad === "Deceso",
//       );

//       setDecesosRegistrados(muertes.length);
//     };

//     const calcularVentas = () => {
//       const ventas = partesInmediatos.filter(
//         (item) => item.novedad === "Venta",
//       );

//       setVentasRegistradas(ventas.length);
//     };

//     calcularNacimientos();
//     calcularVacas();
//   }, [inventario, partesInmediatos]);

//   const data = useMemo(() => {
//     const birthsByMonth = countBirthsByMonth(partesInmediatos); // Corregido para usar partesInmediatos

//     return {
//       labels: [
//         "Enero",
//         "Febrero",
//         "Marzo",
//         "Abril",
//         "Mayo",
//         "Junio",
//         "Julio",
//         "Agosto",
//         "Septiembre",
//         "Octubre",
//         "Noviembre",
//         "Diciembre",
//       ],
//       datasets: [
//         {
//           label: "Nacimientos por Mes",
//           data: birthsByMonth,
//           fill: false,
//           borderColor: "rgb(75, 192, 192)",
//           tension: 0.1,
//         },
//       ],
//     };
//   }, [partesInmediatos]); // Asegúrate de que partesInmediatos esté en las dependencias

//   const options: ChartOptions = {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div className="bg-green-50">
//       <div className="grid grid-cols-12 grid-rows-3 gap-4 h-[400px] items-center justify-center p-5 bg-white rounded-lg shadow-lg">
//         <div className="col-span-3 row-span-3">
//           <Percent
//             cantidadActual={nacimientosRegistrados}
//             cantidadMaxima={
//               parseInt(nacimientosPrevistos.toFixed(0), 10) // Corregido para usar nacimientosPrevistos
//             }
//             setPercent={setPercent}
//           />
//         </div>
//         <div className="col-span-6 row-span-3 col-start-4">
//           <div className="bg-white">
//             <ChartComponent type="line" data={data} options={options} />
//           </div>
//         </div>
//         <div className="col-span-3 row-span-3 col-start-10">
//           <Speedometer
//             speed={nacimientosRegistrados}
//             infoText="Nacimientos"
//             maxSpeed={nacimientosPrevistos}
//           />
//         </div>
//       </div>
//       <div className="grid grid-cols-12 grid-rows-3 gap-4 h-[400px] items-center justify-center p-5 bg-white rounded-lg shadow-lg">
//         <div className="col-span-3 row-span-3">
//           <Percent
//             cantidadActual={nacimientosRegistrados}
//             cantidadMaxima={
//               parseInt(nacimientosPrevistos.toFixed(0), 10) // Corregido para usar nacimientosPrevistos
//             }
//             setPercent={setPercent}
//           />
//         </div>
//         <div className="col-span-6 row-span-3 col-start-4">
//           <div className="bg-white">
//             <ChartComponent type="line" data={data} options={options} />
//           </div>
//         </div>
//         <div className="col-span-3 row-span-3 col-start-10">
//           <Speedometer
//             speed={nacimientosRegistrados}
//             infoText="Nacimientos"
//             maxSpeed={nacimientosPrevistos}
//           />
//         </div>
//       </div>
//       <div className="grid grid-cols-12 grid-rows-3 gap-4 h-[400px] items-center justify-center p-5 bg-white rounded-lg shadow-lg">
//         <div className="col-span-3 row-span-3">
//           <Percent
//             cantidadActual={nacimientosRegistrados}
//             cantidadMaxima={
//               parseInt(nacimientosPrevistos.toFixed(0), 10) // Corregido para usar nacimientosPrevistos
//             }
//             setPercent={setPercent}
//           />
//         </div>
//         <div className="col-span-6 row-span-3 col-start-4">
//           <div className="bg-white">
//             <ChartComponent type="line" data={data} options={options} />
//           </div>
//         </div>
//         <div className="col-span-3 row-span-3 col-start-10">
//           <Speedometer
//             speed={nacimientosRegistrados}
//             infoText="Nacimientos"
//             maxSpeed={nacimientosPrevistos}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportesKPI;
import React, { useEffect, useMemo, useState } from "react";
import { useInventory } from "../../contexts/InventoryContext/InventoryContext";
import { usePartesInmediatos } from "../../contexts/PartesInmediatos/PartesInmediatosContext";
import ChartComponent from "./ChartComponent";
import Percent from "./Percent";
import Speedometer from "./Speedometer";
import "./Reportes.styles.css";

const countEventsByMonth = (partesInmediatos: any[], eventType: string) => {
  const eventsByMonth = Array(12).fill(0);
  partesInmediatos.forEach((item) => {
    if (item.novedad === eventType) {
      const month = new Date(item.fechaSuceso).getMonth();
      eventsByMonth[month] += 1;
    }
  });
  return eventsByMonth;
};

const ReportesKPI: React.FC = () => {
  const { inventario } = useInventory();
  const { partesInmediatos } = usePartesInmediatos();
  const [percent, setPercent] = useState(0);
  const [nacimientosPrevistos, setNacimientosPrevistos] = useState(0);
  const [nacimientosRegistrados, setNacimientosRegistrados] = useState(0);
  const [decesosRegistrados, setDecesosRegistrados] = useState(0);
  const [ventasRegistradas, setVentasRegistradas] = useState(0);

  const indiceNacimiento = 0.4;

  useEffect(() => {
    const calcularVacas = () => {
      const vacas = inventario.filter(
        (item) =>
          item.sexo === "Hembra" &&
          item.enInventario === "Si" &&
          new Date().getFullYear() - new Date(item.fechaNac).getFullYear() > 3,
      );

      setNacimientosPrevistos(vacas.length * indiceNacimiento);
    };

    const calcularNacimientos = () => {
      const nacimientos = partesInmediatos.filter(
        (item) => item.novedad === "Nacimiento",
      );
      setNacimientosRegistrados(nacimientos.length);
    };

    const calcularDecesos = () => {
      const muertes = partesInmediatos.filter(
        (item) => item.novedad === "Deceso",
      );
      setDecesosRegistrados(muertes.length);
    };

    const calcularVentas = () => {
      const ventas = partesInmediatos.filter(
        (item) => item.novedad === "Venta",
      );
      setVentasRegistradas(ventas.length);
    };

    calcularNacimientos();
    calcularVacas();
    calcularDecesos();
    calcularVentas();
  }, [inventario, partesInmediatos]);

  const dataNacimientos = useMemo(() => {
    const birthsByMonth = countEventsByMonth(partesInmediatos, "Nacimiento");
    return {
      labels: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      datasets: [
        {
          label: "Nacimientos por Mes",
          data: birthsByMonth,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  }, [partesInmediatos]);

  const dataDecesos = useMemo(() => {
    const deathsByMonth = countEventsByMonth(partesInmediatos, "Deceso");
    return {
      labels: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      datasets: [
        {
          label: "Decesos por Mes",
          data: deathsByMonth,
          fill: false,
          borderColor: "rgb(192, 75, 75)",
          tension: 0.1,
        },
      ],
    };
  }, [partesInmediatos]);

  const dataVentas = useMemo(() => {
    const salesByMonth = countEventsByMonth(partesInmediatos, "Venta");
    return {
      labels: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      datasets: [
        {
          label: "Ventas por Mes",
          data: salesByMonth,
          fill: false,
          borderColor: "rgb(75, 75, 192)",
          tension: 0.1,
        },
      ],
    };
  }, [partesInmediatos]);

  const options: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-green-50">
      <div className="grid grid-cols-12 grid-rows-3 gap-4 h-[400px] items-center justify-center p-5 bg-white rounded-lg shadow-lg">
        <div className="col-span-3 row-span-3">
          <Percent
            cantidadActual={nacimientosRegistrados}
            cantidadMaxima={parseInt(nacimientosPrevistos.toFixed(0), 10)}
            setPercent={setPercent}
          />
        </div>
        <div className="col-span-6 row-span-3 col-start-4">
          <div className="bg-white">
            <ChartComponent
              type="line"
              data={dataNacimientos}
              options={options}
            />
          </div>
        </div>
        <div className="col-span-3 row-span-3 col-start-10">
          <Speedometer
            speed={nacimientosRegistrados}
            infoText="Nacimientos"
            maxSpeed={nacimientosPrevistos}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 grid-rows-3 gap-4 h-[400px] items-center justify-center p-5 bg-white rounded-lg shadow-lg">
        <div className="col-span-3 row-span-3">
          <Percent
            cantidadActual={decesosRegistrados}
            cantidadMaxima={100} // Puedes ajustar este valor según lo que consideres el máximo decesos
            setPercent={setPercent}
          />
        </div>
        <div className="col-span-6 row-span-3 col-start-4">
          <div className="bg-white">
            <ChartComponent type="line" data={dataDecesos} options={options} />
          </div>
        </div>
        <div className="col-span-3 row-span-3 col-start-10">
          <Speedometer
            speed={decesosRegistrados}
            infoText="Decesos"
            maxSpeed={100} // Ajustar según lo que consideres el máximo decesos
          />
        </div>
      </div>
      <div className="grid grid-cols-12 grid-rows-3 gap-4 h-[400px] items-center justify-center p-5 bg-white rounded-lg shadow-lg">
        <div className="col-span-3 row-span-3">
          <Percent
            cantidadActual={ventasRegistradas}
            cantidadMaxima={100} // Puedes ajustar este valor según lo que consideres el máximo de ventas
            setPercent={setPercent}
          />
        </div>
        <div className="col-span-6 row-span-3 col-start-4">
          <div className="bg-white">
            <ChartComponent type="line" data={dataVentas} options={options} />
          </div>
        </div>
        <div className="col-span-3 row-span-3 col-start-10">
          <Speedometer
            speed={ventasRegistradas}
            infoText="Ventas"
            maxSpeed={100} // Ajustar según lo que consideres el máximo de ventas
          />
        </div>
      </div>
    </div>
  );
};

export default ReportesKPI;
