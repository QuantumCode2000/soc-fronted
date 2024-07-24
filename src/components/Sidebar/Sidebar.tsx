import logo_principal from "../../assets/images/logo_principal.png";
import OptionSidebar from "./OptionSidebar";
import { options } from "./options";

const Sidebar = ({ selectedTitle }) => {
  return (
    <aside className="sidebar w-64 md:shadow-right transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-gray-900 text-white">
      <div className="sidebar-header flex items-center justify-center py-6 border-b border-gray-800">
        <div className="inline-flex">
          <a href="#" className="inline-flex flex-row items-center">
            <img src={logo_principal} alt="Logo" className="w-32 h-32" />
            {/* <span className="leading-10 text-white text-xl font-semibold ml-2 uppercase">
              SCA
            </span> */}
          </a>
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
