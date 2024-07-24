// const CustomFilter = ({
//   columns,
//   selectedColumn,
//   filterText,
//   onColumnChange,
//   onFilterChange,
// }) => {
//   return (
//     <div className="mb-4 flex items-center space-x-2">
//       <label>Filtrar por</label>
//       <select
//         value={selectedColumn}
//         onChange={(e) => onColumnChange(e.target.value)}
//         className="px-2 py-1 border border-gray-300 rounded-lg"
//       >
//         {columns.map((column) => (
//           <option key={column.key} value={column.key}>
//             {column.label}
//           </option>
//         ))}
//       </select>
//       <input
//         type="text"
//         placeholder="Valor"
//         value={filterText}
//         onChange={(e) => onFilterChange(e.target.value)}
//         className="px-4 py-2 border border-gray-300 rounded-lg"
//       />
//     </div>
//   );
// };

// export default CustomFilter;
const CustomFilter = ({
  columns,
  selectedColumn,
  filterText,
  onColumnChange,
  onFilterChange,
}) => {
  return (
    <div className="mb-4 flex items-center space-x-4">
      <label className="text-gray-700">Filtrar por:</label>
      <select
        value={selectedColumn}
        onChange={(e) => onColumnChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {columns.map((column) => (
          <option key={column.key} value={column.key}>
            {column.label}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Valor"
        value={filterText}
        onChange={(e) => onFilterChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default CustomFilter;
