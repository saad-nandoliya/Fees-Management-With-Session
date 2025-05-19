import React, { useState } from "react";
import MCL from "../../assets/images/mahi-school-logo.png";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact Us", path: "/contact" },
    { name: "Management", path: "/management" },
    { name: "Student's", path: "/students" },
  ];

  return (
    <header className="w-full ">
      {/* TOP HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-2">
        <div className="flex items-center">
          <NavLink to="/">
            <img src={MCL} alt="MCL" className="w-20 md:w-28" />
          </NavLink>
          <div className="pl-4">
            <h1 className="text-xl md:text-2xl font-bold font-Raleway text-purple-950">
              Mahi High School Mahi
            </h1>
            <h3 className="text-sm text-gray-500">
              Managed by Momin Trust Aducation
            </h3>
          </div>
        </div>

        <div className="mt-4 mb-1 md:mt-0 md:mb-0">
          <NavLink to="/admission">
            <span className="bg-amber-300 px-5 py-2 rounded-2xl hover:bg-amber-400 transition ml-14 sm:ml-0">
              ADMISSION OPEN
              <i className="fa-solid pl-2 fa-chevron-right"></i>
            </span>
          </NavLink>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="bg-[#1EA3DC] text-white">
        <div className="flex justify-between items-center px-4 py-3 md:hidden">
          <span className="font-bold text-xl">Side Menu</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="transition-transform duration-300"
          >
            <div
              className={`transform transition-transform duration-400 ${
                isOpen ? "-rotate-90" : "rotate-0"
              }`}
            >
              <IoIosArrowBack />
            </div>
          </button>
        </div>

        {/* SIDE NAV for mobile */}
        <div
          className={`flex flex-col md:hidden px-4 gap-4 font-medium transition-all duration-600 ease-in-out overflow-hidden ${
            isOpen
              ? "max-h-[400px] opacity-100 scale-100"
              : "max-h-0 opacity-0 scale-95"
          }`}
        >
          {navLinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="hover:text-amber-300"
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* HORIZONTAL NAV for md and above */}
        <div className="hidden md:flex justify-center gap-10 py-4 font-bold">
          {navLinks.map((link, idx) => (
            <NavLink key={idx} to={link.path}>
              <span className="relative group hover:text-amber-300 transition-all duration-300">
                {link.name}
                <span className="absolute left-1/2 -bottom-2 h-[1.5px] bg-amber-300 w-0 group-hover:w-full transition-all duration-300 transform -translate-x-1/2"></span>
              </span>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
