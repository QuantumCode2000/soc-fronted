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
        className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
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
