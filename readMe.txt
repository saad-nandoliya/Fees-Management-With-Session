// import React, { useState } from "react";
// import SidebarDropdownItem from "../Student's/SidebarStudentInfo";
// import { IoMenu } from "react-icons/io5";

// const StudentInfo = () => {
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const handleToggle = (index) => {
//     setActiveDropdown((prev) => (prev === index ? null : index));
//   };

//   const dropdowns = [
//     {
//       icon: "fa-user-plus",
//       title: "Student Information",
//       items: ["Student Details", "New Admission"],
//     },
//     {
//       icon: "fa-money-bill",
//       title: "Fees Management",
//       items: ["Collect Fees", "Fees Report"],
//     },
//     {
//       icon: "fa-book",
//       title: "Academics",
//       items: ["Subjects", "Class Timetable"],
//     },
//   ];

//   return (
//     <>
//       <div
//         className="w-[200px] -mt-[3px] bg-[#1EA3DC] text-white h-full max-h-[35rem] overflow-y-auto
//       [&::-webkit-scrollbar]:w-1.5
//       [&::-webkit-scrollbar-track]:bg-gray-100
//       [&::-webkit-scrollbar-thumb]:bg-[#8B8B8B] "
//       >
//         <div className="px-2.5 py-2">
//           <p>
//             <IoMenu />
//           </p>
//         </div>
//         <div
//           className="pb-3 py-2 px-2.5 flex justify-between items-center bg-[#1EA3DC] shadow-xl ring-1 ring-white/20  
//       "
//         >
//           <h4 className="text-sm font-bold">Current Session:</h4>
//           <select className="text-white text-[13px] font-semibold py-1 pr-1 relative top-0.5 focus:outline-none focus:ring-0">
//             <option className="text-black" value="2023-2024">
//               2023-24
//             </option>
//             <option className="text-black" value="2024-2025">
//               2024-25
//             </option>
//             <option className="text-black" value="2025-2026">
//               2025-26
//             </option>
//           </select>
//         </div>

//         {/* Sidebar Dropdowns */}
//         <ul>
//           {dropdowns.map((dropdown, idx) => (
//             <SidebarDropdownItem
//               key={idx}
//               icon={dropdown.icon}
//               title={dropdown.title}
//               items={dropdown.items}
//               isOpen={activeDropdown === idx}
//               onToggle={() => handleToggle(idx)}
//             />
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default StudentInfo;






