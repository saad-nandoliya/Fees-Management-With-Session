// import React, { useState, useEffect } from "react";
// import axios from "axios";
// const URL = import.meta.env.VITE_URL;

// const placeholderOptions = [
//   "Search (Student Name)",
//   "Search (Father Name)",
//   "Search (City)",
//   "Search (State)",
//   "Search (Class)",
//   "Search (Year)",
// ];

// const StudentDetails = () => {
//   const [getStudentDetail, setGetStudentDetail] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [placeholderIndex, setPlaceholderIndex] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // Pagination States
//   const [currentPage, setCurrentPage] = useState(1);
//   const studentsPerPage = 11;

//   const Studentdetail = async () => {
//     try {
//       const res = await axios.get(`${URL}/get-students`);
//       setGetStudentDetail(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     Studentdetail();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderOptions.length);
//     }, 2500);
//     return () => clearInterval(interval);
//   }, []);


//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm]);

//   const filteredStudents = getStudentDetail.filter((student) => {
//     const searchValue = (searchTerm || "").toLowerCase();
//     return (
//       student.student_name?.toLowerCase().includes(searchValue) ||
//       student.father_name?.toLowerCase().includes(searchValue) ||
//       student.city?.toLowerCase().includes(searchValue) ||
//       student.state?.toLowerCase().includes(searchValue) ||
//       student.class?.toLowerCase().includes(searchValue) ||
//       String(student.session_year)?.includes(searchValue)
//     );
//   });

//   // Pagination Logic
//   const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
//   const indexOfLastStudent = currentPage * studentsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//   const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   const renderPageNumbers = () => {
//     const maxPageDisplay = 3;
//     let pages = [];

//     if (totalPages <= maxPageDisplay + 2) {
//       pages = pageNumbers;
//     } else {
//       if (currentPage <= 3) {
//         pages = [1, 2, 3, 4, "...", totalPages];
//       } else if (currentPage >= totalPages - 2) {
//         pages = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
//       } else {
//         pages = [1, "...", currentPage, currentPage + 1, currentPage + 2, "...", totalPages];
//       }
//     }

//     return pages.map((number, i) => {
//       if (number === "...") {
//         return (
//           <span key={i} className="px-1 py-0.5 text-gray-600">
//             ...
//           </span>
//         );
//       }
//       return (
//         <button
//           key={i}
//           className={`px-1.5  rounded-full mx-0.5 ${currentPage === number ? "bg-[#1EA3DC] text-white" : "bg-white text-[#1EA3DC]"
//             }`}
//           onClick={() => setCurrentPage(number)}
//         >
//           {number}
//         </button>
//       );
//     });
//   };

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [currentPage]);


//   return (
//     <div className="container mx-auto">
//       <div className="bg-white rounded-lg shadow-2xl py-[19px] px-6">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//           <h5 className="text-2xl sm:text-3xl font-bold text-[#1EA3DC] border-b-2 border-cyan-200 pb-2">
//             Student List
//           </h5>
//           <div className="flex items-center relative max-w-[215px]">
//             <input
//               type="search"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder={placeholderOptions[placeholderIndex]}
//               className="w-full h-10 pl-2 pr-2 rounded-lg bg-gray-100 text-gray-900 placeholder-gray-400 outline-none transition duration-300 ease-in-out border-1 border-[#1EA3DC] focus:bg-white hover:bg-white"
//             />
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full table-auto border-collapse">
//             <thead>
//               <tr className="bg-[#1EA3DC] text-white">
//                 <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap rounded-tl-lg">Id</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">Student Name</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">Father Name</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">City</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">State</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">Class</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">Section</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">Date of Birth</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">Mobile No.</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap  rounded-tr-lg">Year</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 Array.from({ length: 11 }).map((_, idx) => (
//                   <tr key={idx} className="animate-pulse border-b border-gray-200">
//                     {Array.from({ length: 10 }).map((__, colIdx) => (
//                       <td key={colIdx} className="px-4 py-3">
//                         <div className="h-4 bg-gray-300 rounded w-full"></div>
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               ) : currentStudents.length > 0 ? (
//                 currentStudents.map((item, index) => (
//                   <tr key={item.id} className="border-b border-gray-200 hover:bg-cyan-50">
//                     <td className="px-4 py-2 text-gray-700">{indexOfFirstStudent + index + 1}</td>
//                     <td className="px-4 py-2 text-gray-700">{item.student_name}</td>
//                     <td className="px-4 py-2 text-gray-700">{item.father_name}</td>
//                     <td className="px-4 py-2 text-gray-700">{item.city}</td>
//                     <td className="px-4 py-2 text-gray-700">{item.state}</td>
//                     <td className="px-4 py-2 text-gray-700">{item.class_id}</td>
//                     <td className="px-4 py-2 text-gray-700">{item.section_id}</td>
//                     <td className="px-4 py-2 text-gray-700">{new Date(item.date_of_birth).toLocaleDateString()}</td>
//                     <td className="px-4 py-2 text-gray-700">{item.mobile_number}</td>
//                     <td className="px-4 py-2 text-gray-700">{item.session_year}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="10" className="text-center text-gray-500 py-4">
//                     No students found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {!loading && totalPages > 1 && (
//           <div className="flex justify-center mt-3 ">
//             <button
//               onClick={() => setCurrentPage(1)}
//               disabled={currentPage === 1}
//               className="px-1"
//             >
//               <i className="fa-solid fa-angles-left"></i>
//             </button>
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-1"
//             >
//               <i className="fa-solid fa-angle-left"></i>
//             </button>
//             {renderPageNumbers()}
//             <button
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-1"
//             >
//               <i className="fa-solid fa-angle-right"></i>
//             </button>
//             <button
//               onClick={() => setCurrentPage(totalPages)}
//               disabled={currentPage === totalPages}
//               className="px-1"
//             >
//               <i className="fa-solid fa-angles-right"></i>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentDetails;









import React, { useState, useEffect } from "react";
import axios from "axios";
const URL = import.meta.env.VITE_URL;

const placeholderOptions = [
  "Search (Student Name)",
  "Search (Father Name)",
  "Search (City)",
  "Search (State)",
  "Search (Class)",
  "Search (Year)",
];

const StudentDetails = () => {
  const [getStudentDetail, setGetStudentDetail] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  // Filter states
  const [filter, setFilter] = useState({
    session_year: "",
    class_id: "",
    section_id: "",
  });
  // Dropdown options (from context)
  const [sessionYear, setSessionYear] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sectionList, setSectionList] = useState([]);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 11;

  // Fetch dropdown options
  const fetchFilterOptions = async () => {
    try {
      const res = await axios.get(`${URL}/api/student-details/options`);
      setSessionYear(res.data.sessionYear);
      setClasses(res.data.classes);
      setSectionList(res.data.sectionList);
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  // Fetch students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${URL}/api/student-details/students`, {
        params: filter,
      });
      setGetStudentDetail(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [filter]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderOptions.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const filteredStudents = getStudentDetail.filter((student) => {
    const searchValue = (searchTerm || "").toLowerCase();
    return (
      student.student_name?.toLowerCase().includes(searchValue) ||
      student.father_name?.toLowerCase().includes(searchValue) ||
      student.city?.toLowerCase().includes(searchValue) ||
      student.state?.toLowerCase().includes(searchValue) ||
      student.class_name?.toLowerCase().includes(searchValue) ||
      String(student.session_year)?.includes(searchValue)
    );
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    const maxPageDisplay = 3;
    let pages = [];

    if (totalPages <= maxPageDisplay + 2) {
      pages = pageNumbers;
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, "...", currentPage, currentPage + 1, currentPage + 2, "...", totalPages];
      }
    }

    return pages.map((number, i) => {
      if (number === "...") {
        return (
          <span key={i} className="px-1 py-0.5 text-gray-600">
            ...
          </span>
        );
      }
      return (
        <button
          key={i}
          className={`px-1.5 rounded-full mx-0.5 ${
            currentPage === number ? "bg-[#1EA3DC] text-white" : "bg-white text-[#1EA3DC]"
          }`}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </button>
      );
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow-2xl py-[19px] px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h5 className="text-2xl sm:text-3xl font-bold text-[#1EA3DC] border-b-2 border-cyan-200 pb-2">
            Student List
          </h5>
          <div className="flex items-center relative max-w-[215px]">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={placeholderOptions[placeholderIndex]}
              className="w-full h-10 pl-2 pr-2 rounded-lg bg-gray-100 text-gray-900 placeholder-gray-400 outline-none transition duration-300 ease-in-out border-1 border-[#1EA3DC] focus:bg-white hover:bg-white"
            />
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block mb-1 font-medium">
              Session
            </label>
            <select
              name="session_year"
              value={filter.session_year}
              onChange={handleFilterChange}
              className="w-full border border-gray-400 px-3 py-1 focus:outline-none"
            >
              <option value="">All Sessions</option>
              {sessionYear.map((session) => (
                <option key={session.id} value={session.year}>
                  {session.year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Class
            </label>
            <select
              name="class_id"
              value={filter.class_id}
              onChange={handleFilterChange}
              className="w-full border border-gray-400 px-3 py-1 focus:outline-none"
            >
              <option value="">All Classes</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.class_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Section
            </label>
            <select
              name="section_id"
              value={filter.section_id}
              onChange={handleFilterChange}
              className="w-full border border-gray-400 px-3 py-1 focus:outline-none"
            >
              <option value="">All Sections</option>
              {sectionList.map((sec) => (
                <option key={sec.id} value={sec.id}>
                  {sec.section_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-[#1EA3DC] text-white">
                <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap rounded-tl-lg">Id</th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">Student Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">Father Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">City</th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">State</th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">Class</th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">Section</th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">Date of Birth</th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">Mobile No.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap rounded-tr-lg">Year</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 11 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse border-b border-gray-200">
                    {Array.from({ length: 10 }).map((__, colIdx) => (
                      <td key={colIdx} className="px-4 py-3">
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : currentStudents.length > 0 ? (
                currentStudents.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-cyan-50">
                    <td className="px-4 py-2 text-gray-700">{indexOfFirstStudent + index + 1}</td>
                    <td className="px-4 py-2 text-gray-700">{item.student_name}</td>
                    <td className="px-4 py-2 text-gray-700">{item.father_name}</td>
                    <td className="px-4 py-2 text-gray-700">{item.city}</td>
                    <td className="px-4 py-2 text-gray-700">{item.state}</td>
                    <td className="px-4 py-2 text-gray-700">{item.class_name}</td>
                    <td className="px-4 py-2 text-gray-700">{item.section_name}</td>
                    <td className="px-4 py-2 text-gray-700">{new Date(item.date_of_birth).toLocaleDateString()}</td>
                    <td className="px-4 py-2 text-gray-700">{item.mobile_number}</td>
                    <td className="px-4 py-2 text-gray-700">{item.session_year}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center text-gray-500 py-4">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center mt-3">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-1"
            >
              <i className="fa-solid fa-angles-left"></i>
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-1"
            >
              <i className="fa-solid fa-angle-left"></i>
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-1"
            >
              <i className="fa-solid fa-angle-right"></i>
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-1"
            >
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;