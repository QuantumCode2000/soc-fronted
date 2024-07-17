const Login = () => {
  return (
    <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="relative py-3 sm:w-96 mx-auto text-center">
        <span className="text-2xl font-light">SISTEMA</span>
        <div className="mt-4 bg-white shadow-md rounded-lg text-left">
          <div className="h-2 bg-[#363a40] rounded-t-md"></div>
          <div className="px-8 py-6">
            <label className="block font-semibold">Correo</label>
            <input
              type="text"
              placeholder="Correo"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-[#363a40] focus:ring-1 rounded-md"
            />
            <label className="block mt-3 font-semibold">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña
              "
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-[#363a40] focus:ring-1 rounded-md"
            />
            <div className="flex justify-between items-baseline">
              <button
                type="submit"
                className="mt-4 bg-[#363a40] text-white py-2 px-6 rounded-md hover:py-3 hover:px-7 transition-all duration-300 ease-in-out
                "
              >
                Ingresar
              </button>
              <a href="#" className="text-sm hover:underline">
                Olvidaste la contraseña?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
