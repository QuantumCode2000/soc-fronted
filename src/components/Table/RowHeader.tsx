const RowHeader = ({ data }) => {
  return (
    <tr className="text-xs font-semibold tracking-wide text-left text-gray-700 bg-gray-100 uppercase border-b border-gray-300">
      <th className="px-2 py-1 ">Nro</th>
      {data.map((item, index) => (
        <th key={index} className="px-4 py-3">
          {item}
        </th>
      ))}
    </tr>
  );
};

export default RowHeader;
