import { useEffect, useState } from "react";

function ApplicantInfo({
  applicantCI,
  setApplicantCI,
  fetchApplicantInformation,
  applicantInformation,
  setApplicantInformation,
  loading,
}) {
  const [withActa, setWithActa] = useState(false);

  useEffect(() => {
    if (applicantCI.length === 8) {
      fetchApplicantInformation();
    } else {
      setApplicantInformation(null);
    }
  }, [applicantCI, fetchApplicantInformation, setApplicantInformation]);

  return (
    <div className="flex flex-col flex-grow w-full p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Información del Solicitante</h2>
        <input
          type="text"
          value={applicantCI}
          onChange={(e) => setApplicantCI(e.target.value)}
          placeholder="Carnet Identidad Solicitante"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
        />
        <div className="grid grid-cols-2 gap-4 h-auto min-h-[150px]">
          {loading ? (
            <p className="mt-4 text-blue-500 col-span-2">Cargando...</p>
          ) : applicantInformation ? (
            <ApplicantCard
              label="Nombre"
              value={`${applicantInformation.militaryRank} ${applicantInformation.nombre}`}
            />
          ) : (
            <p className="mt-4 text-red-500 col-span-2">
              Ingrese un CI de 7 dígitos para buscar la información del
              solicitante.
            </p>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Información del Motivo</h2>
        <div className="flex mb-4">
          <button
            type="button"
            className="mr-4 py-2.5 px-5 text-sm font-medium text-white bg-blue-600 rounded-lg border border-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
            onClick={() => setWithActa(true)}
          >
            Con Acta
          </button>
          <button
            type="button"
            className="py-2.5 px-5 text-sm font-medium text-white bg-gray-600 rounded-lg border border-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 transition duration-300 ease-in-out"
            onClick={() => setWithActa(false)}
          >
            Sin Acta
          </button>
        </div>
        {withActa && (
          <select className="w-full px-3 py-2 mb-4 border border-gray-300 rounded">
            <option value="">Tipo de Solicitud</option>
            <option value="solicitud1">Solicitud 1</option>
            <option value="solicitud2">Solicitud 2</option>
            <option value="solicitud3">Solicitud 3</option>
          </select>
        )}
        <textarea
          placeholder="Describir el motivo"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
          rows="4"
        ></textarea>
      </div>
    </div>
  );
}

const ApplicantCard = ({ label, value }) => {
  return (
    <div className="mt-2 px-6 bg-white rounded-lg shadow w-full">
      <div className="inline-flex items-center justify-between w-full">
        <div className="inline-flex items-center">
          <h3 className="font-bold text-base text-gray-800">{label}</h3>
        </div>
      </div>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
};

export default ApplicantInfo;
