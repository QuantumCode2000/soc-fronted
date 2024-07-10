import Select from "../../components/Select/Select";
import { FaRegCalendarAlt } from "react-icons/fa";
const Reportes = () => {
  const date = new Date();
  const day = date.getDate();
  const month =
    date.toLocaleString("es-ES", { month: "long" }).charAt(0).toUpperCase() +
    date.toLocaleString("es-ES", { month: "long" }).slice(1);
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return (
    <div>
      <label
        for="message"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        Fecha
      </label>
      <div className="relative max-w-sm">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <FaRegCalendarAlt className="text-red-500 w-4 h-4" />
        </div>
        <input
          id="datepicker-autohide"
          datepicker
          datepicker-autohide
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
          // placeholder="Select date"
          value={`${hours}:${minutes} - ${day} de ${month}, ${year}`}
        />
      </div>

      <label
        for="message"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        Descripción Novedad
      </label>
      <textarea
        id="message"
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="Detalle la novedad ...."
      ></textarea>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <form className="max-w-sm">
            <Select
              label="Tipo de novedad"
              options={["Nacimiento", "Deceso", "Descarte", "Compra"]}
            />
          </form>
          <form className="max-w-sm">
            <label
              for="number-input"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Cantidad
            </label>
            <input
              type="number"
              id="number-input"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Cantidad"
              required
            />
          </form>
        </div>
        <div>
          <label
            for="number-input"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            Efectivo
          </label>
          <input
            type="number"
            id="number-input"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Cantidad de efectivo"
            required
          />
          <label
            for="number-input"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            Efectivo actual
          </label>
          <input
            type="number"
            id="number-input"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Efectivo actual"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default Reportes;
