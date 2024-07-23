// const Rows = ({ data, renderCell }) => {
//   const { body, header } = data;

//   return (
//     <>
//       {body.map((item, rowIndex) => (
//         <tr key={rowIndex} className="text-gray-700">
//           <td className="px-4 py-3 text-sm border max-w-[20%] ">
//             {rowIndex + 1}
//           </td>{" "}
//           {header.map((key, colIndex) => (
//             <td
//               key={colIndex}
//               className="px-4 py-3 text-sm border max-w-[10px] "
//             >
//               {renderCell ? renderCell(item, key) : item[key]}
//             </td>
//           ))}
//         </tr>
//       ))}
//     </>
//   );
// };

// export default Rows;

const Rows = ({ data, renderCell }) => {
  const { body, header } = data;

  return (
    <>
      {body.map((item, rowIndex) => (
        <tr key={rowIndex} className="text-gray-700">
          <td className="px-4 py-3 text-sm border w-[5px] ">{rowIndex + 1}</td>
          {header.map((key, colIndex) => (
            <td key={colIndex} className="px-3 py-3 text-xs border w-[5px] ">
              {renderCell ? renderCell(item, key) : item[key]}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default Rows;
