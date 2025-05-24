import React from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import {
  MdPhoneForwarded,
  MdOutgoingMail,
  MdAddLocationAlt,
} from "react-icons/md";

const Footer = () => {
  const navLinks = [
    { arrow: <IoIosArrowForward />, name: "Home", path: "/" },
    { arrow: <IoIosArrowForward />, name: "About", path: "/about" },
    { arrow: <IoIosArrowForward />, name: "Gallery", path: "/gallery" },
    { arrow: <IoIosArrowForward />, name: "Contact Us", path: "/contact" },
    { arrow: <IoIosArrowForward />, name: "Management", path: "/management" },
    { arrow: <IoIosArrowForward />, name: "Student's", path: "/studentlist" },
  ];

  return (
    <footer className="bg-[#10668b] text-white py-10">
      <div className="max-w-6xl mx-auto px-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
        <div>
          <h3 className="text-lg font-bold mb-2 border-b-2 border-amber-300 w-max">
            About Us
          </h3>
          <p className="text-sm font-medium leading-7 sm:mt-6 mt-4">
            Mahi High School Mahi, founded in 1964, is a leading institution in
            Banaskantha dedicated to academic excellence and social upliftment.
            The college offers diverse programs, fostering intellectual growth
            and ethical values.
          </p>
        </div>
        <div className="md:ml-6">
          <h3 className="text-lg font-bold mb-2 border-b-2 border-amber-300 w-max">
            Our Links
          </h3>
          <div className="space-y-2 text-sm sm:mt-6 mt-4">
            {navLinks.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.path}
                className="w-max block font-medium group hover:text-amber-300 transition-all duration-300"
              >
                <span className="flex items-center gap-1 relative right-1">
                  <span>{link.arrow}</span>

                  {/* ONLY underline the name */}
                  <span className="relative left-1.5">
                    {link.name}
                    <span className="absolute left-1/2 -bottom-1 h-[1.5px] bg-amber-300 w-0 group-hover:w-full transition-all duration-300 transform -translate-x-1/2"></span>
                  </span>
                </span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="sm:mt-5 md:mt-0">
          <h3 className="text-lg font-bold mb-2 border-b-2 border-amber-300 w-max">
            Contact Us
          </h3>
          <ul className="text-sm space-y-3 sm:mt-6 mt-4">
            <li className="flex items-center gap-2 font-medium">
              <span className="bg-[#4BAE4F] p-1 rounded-full  text-sm relative top-0.5">
                <MdPhoneForwarded />
              </span>{" "}
              +91 1234567890
            </li>
            <li className="flex items-center gap-2 font-medium">
              <span className="bg-amber-300 p-1 rounded-full  text-sm relative top-0.5">
                <MdOutgoingMail />
              </span>
              principal@gmail.com
            </li>
            <li className="flex items-start gap-2 font-medium leading-7">
              <span className="bg-[#54B1B3] p-1 rounded-full text-sm relative top-0.5">
                <MdAddLocationAlt />
              </span>
              <span>
                Mahi High School Mahi, Chhapi Highway, Mahi-385210
                <br />
                Ta:-Vadgam, Dist:-Banaskantha (Gujarat)
              </span>
            </li>
          </ul>
        </div>

        <div className="sm:mt-5 md:mt-0">
          <h3 className="text-lg font-bold mb-2 border-b-2 border-amber-300 w-max">
            Follow Us
          </h3>
          <div className="flex gap-4  text-white text-2xl sm:mt-6 mt-4">
            <NavLink to="#">
              <i className="fab fa-facebook-f"></i>
            </NavLink>
            <NavLink to="#">
              <i className="fab fa-twitter"></i>
            </NavLink>
            <NavLink to="#">
              <i className="fab fa-instagram"></i>
            </NavLink>
            <NavLink to="#">
              <i className="fab fa-youtube"></i>
            </NavLink>
            <NavLink to="#">
              <i className="fab fa-whatsapp"></i>
            </NavLink>
            <NavLink to="#">
              <i className="fab fa-linkedin-in"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
