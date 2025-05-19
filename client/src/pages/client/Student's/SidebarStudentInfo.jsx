import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";

const SidebarStudentInfo = ({ icon, title, items, isOpen, onToggle, onCloseSidebar, isMobile }) => {
  const location = useLocation();

  return (
    <>
      <li
        onClick={onToggle}
        tabIndex={0}
        className={`flex justify-between items-center cursor-pointer px-2.5 py-3 hover:text-amber-300 hover:bg-[#147AA5] outline-none transition-colors ${
          isOpen ? "bg-[#147AA5] text-amber-300" : ""
        }`}
      >
        <span className="flex text-sm items-center gap-2 font-semibold">
          <i className={`fa ${icon} text-sm`}></i>
          {title}
        </span>
        <span
          className={`transform transition-transform duration-500 ${
            isOpen ? "-rotate-90" : "rotate-0"
          }`}
        >
          <IoIosArrowBack />
        </span>
      </li>

      <ul
        className={`pl-5 pr-2 transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen
            ? "max-h-[300px] opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className="py-[5px] rounded-md cursor-pointer hover:text-amber-300 flex items-center gap-2"
          >
            <NavLink
              to={`/students/${item.path}`}
              onClick={() => {
                if (isMobile) onCloseSidebar(); // sirf mobile par band kare
              }}
              className={`flex items-center gap-2 text-sm font-semibold hover:text-amber-300 ${
                location.pathname === `/students/${item.path}`
                  ? "text-amber-300"
                  : ""
              }`}
            >
              <i className="fa fa-caret-right"></i>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarStudentInfo;
