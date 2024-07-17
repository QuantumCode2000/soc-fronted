import React from "react";

const Rows = ({ data }) => {
  const { body, header } = data;

  return (
    <>
      {body.map((item, index) => (
        <tr key={index} className="text-gray-700">
          {/* <td className="px-4 py-3 text-ms font-semibold border">{item.age}</td> */}
          {header.map((key, index) => (
            <td key={index} className="px-4 py-3 text-sm border">
              {item[key]}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default Rows;
