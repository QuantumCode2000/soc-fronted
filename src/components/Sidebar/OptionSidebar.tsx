import { Link } from "react-router-dom";
const OptionSidebar = ({ text, icon, to, isSelected }) => {
  return (
    <li className="my-px">
      <Link
        to={to}
        className={
          isSelected === true
            ? "flex flex-row items-center h-10 px-3 rounded-lg bg-gray-100 text-gray-700"
            : "flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:bg-opacity-10"
        }
      >
        <span className="flex items-center justify-center text-lg text-gray-400">
          <figure className="flex items-center justify-center text-lg text-gray-400">
            {icon}
          </figure>
        </span>
        <span className="ml-3">{text}</span>
        {/* <span className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
          1k
        </span> */}
      </Link>
    </li>
  );
};

export default OptionSidebar;
