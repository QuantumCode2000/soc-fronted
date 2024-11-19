import logo_principal from "../../assets/images/logo_principal2.png";
import OptionSidebar from "./OptionSidebar";

const Sidebar = ({ selectedTitle, options, unidad }) => {
  return (
    <aside className="sidebar w-64 md:shadow-right transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-gray-900 text-white">
      <div className="sidebar-header flex items-center justify-center flex-col py-6 border-b border-gray-800">
        <div className="inline-flex mb-4">
          <a href="#" className="inline-flex flex-row items-center">
            <img src={logo_principal} alt="Logo" className="w-32 h-32" />
          </a>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">{unidad}</p>
        </div>
      </div>
      <div className="sidebar-content px-6 py-4">
        <ul className="flex flex-col w-full">
          {options.map((option, index) => (
            <OptionSidebar
              key={index}
              text={option.text}
              icon={option.icon}
              to={option.to}
              isSelected={selectedTitle === option.text}
              options={option.options}
              selectedTitle={selectedTitle}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
