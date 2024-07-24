import React from "react";

const CustomFilter = ({
  columns,
  selectedColumn,
  filterText,
  onColumnChange,
  onFilterChange,
  onSearch,
}) => {
  return (
    <div className="mb-4 flex flex-col space-y-4">
      <div className="flex flex-wrap items-center space-x-2">
        <label className="text-gray-800 mr-2">Realizar busqueda:</label>
        {columns.map((column) => (
          <button
            key={column.key}
            onClick={() => onColumnChange(column.key)}
            className={`px-3 py-1 rounded-lg border ${
              selectedColumn === column.key
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {column.label}
          </button>
        ))}
        <button
          onClick={onSearch}
          className="ml-auto px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>
      {selectedColumn && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="Valor"
            value={filterText}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default CustomFilter;
