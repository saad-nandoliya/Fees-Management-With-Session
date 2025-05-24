import React, { useState, useEffect } from "react";
import SidebarStudentInfo from "./SidebarStudentInfo";
import { IoMenu } from "react-icons/io5";

const StudentInfo = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 640;
      setIsMobile(isNowMobile);
      setIsSidebarOpen(!isNowMobile); // false for mobile, true for md+
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = (index) => {
    if (isMobile && !isSidebarOpen) {
      setIsSidebarOpen(true);
      setActiveDropdown(index);
    } else {
      setActiveDropdown((prev) => (prev === index ? null : index));
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen((prev) => !prev);
    }
  };

  const dropdowns = [
    {
      icon: "fa-user-plus",
      title: "Student Information",
      items: [
        { name: "Student Details", path: "" },
        { name: "New Admission", path: "new-admission" },
      ],
    },

    {
      icon: "fa-money-bill",
      title: "Fees Management",
      items: [
        { name: "Collect Fees", path: "" },
        { name: "Fees Report", path: "new-admission" },
      ],
    },
    {
      icon: "fa-book",
      title: "Academics",
      items: [
        { name: "Promote Student", path: "promote-admission" },
        { name: "Class Timetable", path: "new-admission" },
      ],
    },




  ];

  return (
    <div
      className={`
        ${isSidebarOpen ? "w-[200px]" : "w-[40px]"} 
        bg-[#1EA3DC] text-white transition-all duration-300 ease-in-out
        -mt-[3px] h-[41.5rem] sm:h-[41.5rem] max-h-[41.5rem]  overflow-y-auto
        [&::-webkit-scrollbar]:w-1.5 
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:bg-[#8B8B8B]
        relative 
      `}
    >
      {/* Toggle Button only for mobile */}
      {isMobile && (
        <div className="py-2 px-2 ">
          <IoMenu
            size={18}
            className="cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
      )}

      {/* Session Dropdown */}
      <div
        className={`pb-3 py-2 px-2.5 flex ${isSidebarOpen ? "justify-between" : "justify-center"
          } items-center bg-[#1EA3DC] shadow-xl ring-1 ring-white/20`}
      >
        {isSidebarOpen ? (
          <>
            <h4 className="text-sm font-bold whitespace-nowrap">
              Current Session:
            </h4>
            <select
              className=" text-white text-[13px] font-semibold py-1 pr-1 focus:outline-none focus:ring-0 relative top-[1.6px]"
              onChange={() => {
                if (isMobile) {
                  setIsSidebarOpen(false); // sirf mobile par hi band ho
                }
              }}
            >
              <option className="text-black">2023-24</option>
              <option className="text-black">2024-25</option>
              <option className="text-black">2025-26</option>
            </select>
          </>
        ) : (
          <span className="text-sm pr-2">
            <button
              onClick={() => {
                setIsSidebarOpen(true); // sidebar khul jaye
                setActiveDropdown(null); // koi dropdown open na ho
              }}
            >
              <i className="fa-solid fa-calendar-days"></i>
            </button>
          </span>
        )}
      </div>

      {/* Sidebar Dropdowns */}
      <ul>
        {dropdowns.map((dropdown, idx) => (
          <div key={idx}>
            {/* Icon-only view (only for mobile when closed) */}
            {!isSidebarOpen && isMobile && (
              <div className="py-2 px-2.5 block">
                <button onClick={() => handleToggle(idx)}>
                  <i className={`fa-solid ${dropdown.icon} text-sm`}></i>
                </button>
              </div>
            )}

            {/* Full view */}
            {isSidebarOpen && (
              <SidebarStudentInfo
                icon={dropdown.icon}
                title={dropdown.title}
                items={dropdown.items}
                isOpen={activeDropdown === idx}
                onToggle={() => handleToggle(idx)}
                onCloseSidebar={() => setIsSidebarOpen(false)}
                isMobile={isMobile}
              />
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default StudentInfo;
