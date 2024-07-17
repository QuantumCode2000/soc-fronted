const Select = ({ label, options }) => {
  return (
    <>
      <label
        htmlFor="small"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <select
        id="small"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
