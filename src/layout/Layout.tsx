import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { options, optionsAdmin } from "../components/Sidebar/options";
import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext/AuthContext";

const Layout = ({ unidad }) => {
  const location = useLocation();
  const { user } = useAuthContext();
  const [selectedTitle, setSelectedTitle] = useState("");

  useEffect(() => {
    const findSelectedTitle = (options, path) => {
      for (const option of options) {
        if (option.options) {
          const subOption = option.options.find((sub) => sub.to === path);
          if (subOption) {
            return subOption.text;
          }
        }
      }
      return null;
    };

    setSelectedTitle(
      findSelectedTitle(
        user?.role === "Administrador" ? optionsAdmin : options,
        location.pathname,
      ),
    );
  }, [location]);

  return (
    <div className="flex flex-grow min-h-screen bg-gray-100 text-gray-800">
      <Sidebar
        selectedTitle={selectedTitle}
        options={user?.role === "Administrador" ? optionsAdmin : options}
        unidad={  unidad}
      />
      <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        {user && <Navbar rol={user.role} nombre={user.email} />}
        <div className="main-content flex flex-col flex-grow p-6">
          <h1 className="font-bold  text-gray-700 mb-6 text-xs">
            /{selectedTitle}
          </h1>
          <div className="flex flex-col flex-grow border border-gray-300 bg-white rounded-lg p-6 shadow-lg">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
