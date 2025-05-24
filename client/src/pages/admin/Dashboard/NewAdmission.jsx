import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSessionClass } from "../../../context/YearsAndClasses/YearsAndClasses";

const URL = import.meta.env.VITE_URL;

const NewAdmission = () => {
  const { sessionYear, classes, sectionList } = useSessionClass();
  const navigate = useNavigate();



  const [studentData, setStudentData] = useState({
    student_name: "",
    father_name: "",
    city: "",
    state: "",
    class_name: "",
    section: "",
    date_of_birth: "",
    mobile_number: "",
    session_year: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const {
      student_name,
      father_name,
      city,
      state,
      class_name,
      section,
      date_of_birth,
      mobile_number,
      session_year,
    } = studentData;

    if (!student_name.trim()) {
      newErrors.student_name = "student name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(student_name)) {
      newErrors.student_name = "Only letters and spaces allowed.";
    } else if (!father_name.trim()) {
      newErrors.father_name = "father name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(father_name)) {
      newErrors.father_name = "Only letters and spaces allowed.";
    } else if (!city.trim()) {
      newErrors.city = "city name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(city)) {
      newErrors.city = "Only letters and spaces allowed.";
    } else if (!state.trim()) {
      newErrors.state = "state name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(state)) {
      newErrors.state = "Only letters and spaces allowed.";
    } else if (!class_name.trim()) {
      newErrors.class_name = "Class is required.";
    } else if (!section.trim()) {
      newErrors.section = "Section is required.";
    } else if (!date_of_birth) {
      newErrors.date_of_birth = "Date of birth is required.";
    } else if (!/^\d{10}$/.test(mobile_number)) {
      newErrors.mobile_number = "Mobile number must be exactly 10 digits.";
    } else if (!session_year) {
      newErrors.session_year = "Session year is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await axios.post(`${URL}/student-admission`, studentData);
      if (res.status === 200) {
        toast.success(res?.data?.message);
        setStudentData({
          student_name: "",
          father_name: "",
          city: "",
          state: "",
          class_name: "",
          section: "",
          date_of_birth: "",
          mobile_number: "",
          session_year: "",
        });
        setErrors({});
        navigate("/admin/dashboard/");
      }
    } catch (error) {
      console.error("Error submitting admission:", error);
      toast.error(
        error.response?.data?.message || "Server error. Please try again later."
      );
    }
  };
  return (
    <div className="flex items-center justify-center bg-white py-2">
      <div className="w-full flex justify-center px-2">
        <div className="w-full bg-white p-4 rounded-2xl border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Student Admission Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-2 gap-4">


              {/* Student Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Student Name</label>
                <input
                  type="text"
                  name="student_name"
                  value={studentData.student_name}
                  onChange={handleChange}
                  placeholder="Enter student's name"
                  className="w-full border rounded-lg px-4 py-2"
                />
                {errors.student_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.student_name}</p>
                )}
              </div>
              {/* Father Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Father Name</label>
                <input
                  type="text"
                  name="father_name"
                  value={studentData.father_name}
                  onChange={handleChange}
                  placeholder="Enter father's name"
                  className="w-full border rounded-lg px-4 py-2"
                />
                {errors.father_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.father_name}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">

              {/* City */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={studentData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full border rounded-lg px-4 py-2"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
              {/* State */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={studentData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  className="w-full border rounded-lg px-4 py-2"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>
            </div>




            <div className="grid grid-cols-2 gap-4">

              {/* Class */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Class</label>
                <select
                  name="class_name"
                  value={studentData.class_name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="">Select Class</option>
                  {classes?.map((STD) => (
                    <option key={STD.id} value={STD.class_name}>
                      {STD.class_name}
                    </option>
                  ))}
                </select>
                {errors.class_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.class_name}</p>
                )}
              </div>
              {/* DOB */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Section</label>
                <select
                  name="section"
                  value={studentData.section}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="">Select Section</option>
                  {sectionList?.map((section) => (
                  <option key={section.id} value={section.section_name}>
                    {section.section_name}
                  </option>
                ))}
                </select>
                {errors.section && (
                  <p className="text-red-500 text-sm mt-1">{errors.section}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">

              {/* Mobile */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Mobile No.</label>
                <input
                  type="tel"
                  name="mobile_number"
                  value={studentData.mobile_number}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  maxLength="10"
                  className="w-full border rounded-lg px-4 py-2"
                />
                {errors.mobile_number && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile_number}</p>
                )}
              </div>

              {/* DOB */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={studentData.date_of_birth}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                />
                {errors.date_of_birth && (
                  <p className="text-red-500 text-sm mt-1">{errors.date_of_birth}</p>
                )}
              </div>

            </div>
            {/* Session Year (Last Column Alone) */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Session Year</label>
              <select
                name="session_year"
                value={studentData.session_year}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="">Select year</option>
                {sessionYear?.map((session) => (
                  <option key={session.id} value={session.year}>
                    {session.year}
                  </option>
                ))}
              </select>
              {errors.session_year && (
                <p className="text-red-500 text-sm mt-1">{errors.session_year}</p>
              )}
            </div>


            {/* Submit */}
            <div className="pt-4 flex gap-x-10">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
              >
                Submit Admission
              </button>

              <button
                onClick={() => {
                  setStudentData({
                    student_name: "",
                    father_name: "",
                    city: "",
                    state: "",
                    class_name: "",
                    section: "",
                    date_of_birth: "",
                    mobile_number: "",
                    session_year: "",

                  });
                  navigate("/admin/dashboard/")
                }}
                type="button"
                className="w-full bg-red-200 text-red-500 hover:bg-red-300 hover:text-red-700 transition cursor-pointer duration-500 ease-in-out font-semibold py-1 rounded-lg px-2"
              >
                Cancel Admission
              </button>
            </div>
          </form>

        </div>
      </div >
    </div >
  )
}

export default NewAdmission