const ModalData = ({ data, titles }) => {
  return (
    <div className="mt-4 p-4 space-y-4">
      {data &&
        Object.keys(titles).map((key, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            <p className="font-bold text-gray-700">{titles[key]}</p>
            <p className="text-sm text-gray-600 sm:ml-4 mt-1 sm:mt-0 break-words w-full sm:w-auto">
              {typeof data[key] === "object"
                ? JSON.stringify(data[key])
                : data[key]}
            </p>
          </div>
        ))}
    </div>
  );
};

export default ModalData;
