const Rows = ({ data, renderCell }) => {
  const { body, header } = data;

  return (
    <>
      {body.map((item, rowIndex) => (
        <tr key={rowIndex} className="text-gray-700 even:bg-gray-50">
          <td className="px-2 py-1 text-sm border-b border-gray-300">
            {rowIndex + 1}
          </td>
          {header.map((key, colIndex) => (
            <td
              key={colIndex}
              className="px-2 py-1 text-xs border-b border-gray-300"
            >
              {renderCell ? renderCell(item, key) : item[key]}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default Rows;
