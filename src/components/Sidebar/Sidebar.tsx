import logo_principal from "../../assets/images/logo_principal.png";
import OptionSidebar from "./OptionSidebar";
import { options } from "./options";

const Sidebar = ({ selectedTitle }) => {
  return (
    <aside className="sidebar w-64 md:shadow-right transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-[#363a40]">
      <div className="sidebar-header flex items-center justify-center py-4">
        <div className="inline-flex">
          <a href="#" className="inline-flex flex-row items-center">
            <img src={logo_principal} alt="" className="w-10 h-10" />
            <span className="leading-10 text-gray-100 text-2xl font-bold ml-1 uppercase">
              SCA
            </span>
          </a>
        </div>
      </div>
      <div className="sidebar-content px-4 py-6">
        <ul className="flex flex-col w-full">
          {options.map((option, index) => (
            <OptionSidebar
              key={index}
              text={option.text}
              icon={option.icon}
              to={option.to}
              isSelected={selectedTitle === option.text}
              options={option.options} // Add this line to pass sub-options
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
