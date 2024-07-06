import React from "react";

const Reportes = () => {
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
          <svg
            className="w-4 h-4 text-gray-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          id="datepicker-autohide"
          datepicker
          datepicker-autohide
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
          // placeholder="Select date"
          value={new Date()}
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
          <label htmlFor="small" className="block mb-2 text-sm font-medium text-gray-900 ">Tipo de ganado o vegetal</label>
            <select id="small" className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
              <option selected>Selecciona tipo</option>
              <option value="Vacuno">Vacuno</option>
              <option value="Pisicola">Pisicola</option>
              <option value="Flores">Flores</option>
              <option value="Lombricultura">Lombricultura</option>
            </select>
            <label htmlFor="default" className="block mb-2 text-sm font-medium text-gray-900">Observacion</label>
              <select id="default" className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option selected>Seleccione tipo de observación</option>
                <option value="Nacimiento">Nacimiento</option>
                <option value="Deceso">Deceso</option>
                <option value="Descarte">Descarte</option>
                <option value="Compra">Compra</option>
            </select>
            </form>
            <form className="max-w-sm">
              <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 ">Cantidad</label>
              <input type="number" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Cantidad" required />
            </form>              
        </div>
        <div>
        <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 ">Efectivo</label>
        <input type="number" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Cantidad de efectivo" required />
        <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 ">Efectivo actual</label>
        <input type="number" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Efectivo actual" required />
        </div>
      </div>
    </div>  
  );
};

export default Reportes;
