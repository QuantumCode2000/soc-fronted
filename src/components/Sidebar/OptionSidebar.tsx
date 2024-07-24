import { Link } from "react-router-dom";
import { useState } from "react";

const OptionSidebar = ({
  text,
  icon,
  to,
  isSelected,
  options,
  selectedTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {icon ? (
        <li className="my-px py-2">
          <Link
            to={to}
            className={
              isSelected
                ? "flex flex-row items-center h-10 px-4 py-2 rounded-lg bg-blue-700 text-white"
                : "flex flex-row items-center h-10 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800"
            }
          >
            <span className="flex items-center justify-center text-lg text-white">
              <figure className="flex items-center justify-center text-lg">
                {icon}
              </figure>
            </span>
            <span className="ml-3">{text}</span>
          </Link>
        </li>
      ) : (
        <>
          <li className="my-px py-2">
            <span
              className="flex font-medium text-sm text-gray-300 px-4 my-2 uppercase cursor-pointer hover:text-white"
              onClick={toggleOptions}
            >
              {text}
            </span>
          </li>
          {isOpen && options && (
            <ul className="pl-4">
              {options.map((option, index) => (
                <OptionSidebar
                  key={index}
                  text={option.text}
                  icon={option.icon}
                  to={option.to}
                  isSelected={selectedTitle === option.text}
                  selectedTitle={selectedTitle}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default OptionSidebar;
