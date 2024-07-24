const RowHeader = ({ data }) => {
  return (
    <tr className="text-sm font-semibold text-left bg-black text-white">
      <th className="px-4 py-2">Nro</th>
      {data.map((item, index) => (
        <th key={index} className="px-4 py-2">
          {item}
        </th>
      ))}
    </tr>
  );
};

export default RowHeader;
