const RowHeader = ({ data }) => {
  return (
    <>
      <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
        {data.map((item, index) => (
          <th key={index} className="px-4 py-3">
            {item}
          </th>
        ))}
      </tr>
    </>
  );
};

export default RowHeader;
