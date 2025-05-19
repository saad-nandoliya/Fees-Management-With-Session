import React, { useState, useEffect } from "react";
import axios from "axios";
const URL = import.meta.env.VITE_URL;

const StudentDetails = () => {
  const [getStudentDetail, setGetStudentDetail] = useState([]);

  const Studentdetail = async () => {
    try {
      const res = await axios.get(`${URL}/get-students`)
      setGetStudentDetail(res.data);
    } catch (error) {
      console.error(err);
    }
  }
  useEffect(() => {
    Studentdetail();
  }, [])

  return (
    <>
      <div className="container mx-auto   min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          {/* Header and Search */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h5 className="text-2xl sm:text-3xl font-bold text-[#1EA3DC] border-b-2 border-cyan-200 pb-2">
              Student List
            </h5>
            <div className="flex items-center relative max-w-[190px]">
              <input
                type="search"
                name="search"
                placeholder="Search..."
                className="w-full h-10 pl-10 pr-4 rounded-lg border-2 border-transparent bg-gray-100 text-gray-900 placeholder-gray-400 outline-none transition duration-300 ease-in-out focus:border-pink-400/40 hover:border-pink-400/40 focus:bg-white hover:bg-white focus:ring-4 focus:ring-pink-400/10"
              />
              <svg
                className="absolute left-4 w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-[#1EA3DC] text-white ">
                  <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap rounded-tl-lg">Student-Id</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">Student Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">Father Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">City</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">State</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">Class</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">Date of Birth</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap">Mobile No.</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold w-24 whitespace-nowrap rounded-tr-lg">Year</th>
                </tr>
              </thead>
              <tbody>
                {getStudentDetail.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-cyan-50 transition duration-150"
                  >
                    <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                    <td className="px-4 py-3 text-gray-700">{item.student_name}</td>
                    <td className="px-4 py-3 text-gray-700">{item.father_name}</td>
                    <td className="px-4 py-3 text-gray-700">{item.city}</td>
                    <td className="px-4 py-3 text-gray-700">{item.state}</td>
                    <td className="px-4 py-3 text-gray-700">{item.class}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(item.date_of_birth).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{item.mobile_number}</td>
                    <td className="px-4 py-3 text-gray-700">{item.session_year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDetails;
