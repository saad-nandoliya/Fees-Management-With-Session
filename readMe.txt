import React, { useState, useEffect } from "react";
import axios from "axios";
const URL = import.meta.env.VITE_URL;

const placeholderOptions = [
  "Search (Student Name)",
  "Search (Father Name)",
  "Search (City)",
  "Search (State)",
  "Search (Class)",
  "Search (Section)",
  "Search (Year)",
];

const ITEMS_PER_PAGE = 7;

const StudentDetails = () => {
  const [getStudentDetail, setGetStudentDetail] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch student data
  const Studentdetail = async () => {
    try {
      const res = await axios.get(`${URL}/get-students`);
      setGetStudentDetail(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    Studentdetail();
  }, []);

  // Rotating placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(
        (prevIndex) => (prevIndex + 1) % placeholderOptions.length
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Filter students
  const filteredStudents = getStudentDetail.filter((student) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      student.student_name.toLowerCase().includes(searchValue) ||
      student.father_name.toLowerCase().includes(searchValue) ||
      student.city.toLowerCase().includes(searchValue) ||
      student.state.toLowerCase().includes(searchValue) ||
      student.class.toLowerCase().includes(searchValue) ||
      student.section.toLowerCase().includes(searchValue) ||
      String(student.session_year).includes(searchValue)
    );
  });

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPage = (pageIndex) => {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      setCurrentPage(pageIndex);
    }
  };

  return (
    <div className="container mx-auto min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        {/* Header and Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h5 className="text-2xl sm:text-3xl font-bold text-[#1EA3DC] border-b-2 border-cyan-200 pb-2">
            Student List
          </h5>
          <div className="flex items-center relative max-w-[215px]">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(0); // reset to first page on search
              }}
              placeholder={placeholderOptions[placeholderIndex]}
              className="w-full h-10 pl-2 pr-2 rounded-lg bg-gray-100 text-gray-900 placeholder-gray-400 outline-none transition duration-300 ease-in-out border border-[#1EA3DC] focus:bg-white hover:bg-white"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-[#1EA3DC] text-white">
                <th className="px-4 py-3 text-left text-sm font-semibold w-24 rounded-tl-lg">
                  #
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24">
                  Student Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24">
                  Father Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24">
                  City
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24">
                  State
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24">
                  Class
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24">
                  Section
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24">
                  DOB
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24">
                  Mobile
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24 rounded-tr-lg">
                  Year
                </th>
              </tr>
            </thead>
            <tbody>
              {loading &&
                Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                  <tr
                    key={idx}
                    className="animate-pulse border-b border-gray-200"
                  >
                    {Array.from({ length: 10 }).map((__, colIdx) => (
                      <td key={colIdx} className="px-4 py-3">
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                      </td>
                    ))}
                  </tr>
                ))}

              {!loading && currentStudents.length > 0 && (
                currentStudents.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-cyan-50 transition duration-150"
                  >
                    <td className="px-4 py-3 text-gray-700">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.student_name}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.father_name}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{item.city}</td>
                    <td className="px-4 py-3 text-gray-700">{item.state}</td>
                    <td className="px-4 py-3 text-gray-700">{item.class}</td>
                    <td className="px-4 py-3 text-gray-700">{item.section}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(item.date_of_birth).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.mobile_number}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.session_year}
                    </td>
                  </tr>
                ))
              )}

              {!loading && currentStudents.length === 0 && (
                <tr>
                  <td
                    colSpan="10"
                    className="text-center text-gray-500 py-4 font-bold"
                  >
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 0}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`px-3 py-1 rounded ${
                  currentPage === i
                    ? "bg-[#1EA3DC] text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
