import React, { useState } from 'react';
import axios from 'axios';
import { useSessionClass } from '../../../context/YearsAndClasses/YearsAndClasses';

const PromoteStudent = () => {
    const { sessionYear, classes, sectionList } = useSessionClass();
    const [filter, setFilter] = useState({
        class_id: '',
        section_id: '',
    });
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [promotion, setPromotion] = useState({
        new_session_year: '',
        new_class_id: '',
        new_section_id: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    const handlePromotionChange = (e) => {
        const { name, value } = e.target;
        setPromotion((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        if (!filter.class_id || !filter.section_id) {
            setError('Class aur section select karo');
            return;
        }
        setError('');
        axios
            .get('http://localhost:5000/students', {
                params:filter,
            })
            .then((response) => {
                setStudents(response.data);
                setSelectedStudents([]);
                setError('');
            })
            .catch((err) => {
                setError('Students fetch karne mein error: ' + (err.response?.data?.message || err.message));
                setStudents([]);
            });
    };

    const handleCheckboxChange = (studentId) => {
        setSelectedStudents((prev) =>
            prev.includes(studentId)
                ? prev.filter((id) => id !== studentId)
                : [...prev, studentId]
        );
    };

    const handleSelectAll = () => {
        if (selectedStudents.length === students.length) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents(students.map((student) => student.id));
        }
    };

    const handlePromote = () => {
        if (selectedStudents.length === 0) {
            setError('Kam se kam ek student select karo');
            return;
        }
        if (!promotion.new_session_year || !promotion.new_class_id || !promotion.new_section_id) {
            setError('Naya session, class, aur section select karo');
            return;
        }

        axios
            .post('http://localhost:5000/promote', {
                student_ids: selectedStudents,
                new_session_year: promotion.new_session_year,
                new_class_id: promotion.new_class_id,
                new_section_id: promotion.new_section_id,
            })
            .then((response) => {
                setSuccess(response.data.message);
                setError('');
                setSelectedStudents([]);
                handleSearch();
            })
            .catch((err) => {
                setError('Promote karne mein error: ' + (err.response?.data?.message || err.message));
                setSuccess('');
            });
    };

    return (
        <>
            <div className="py-3 px-6 bg-white rounded-md shadow-md h-auto">
                <div className="border-b-1 border-gray-200">
                    <h2 className="text-xl font-semibold mb-2">Select Criteria</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="mt-2">
                        <label className="block mb-1 font-medium">
                            Session <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="session_year"
                            value={filter.session_year}
                            onChange={handleFilterChange}
                            className="w-full border border-gray-400 px-3 py-1 focus:outline-none"
                        >
                            <option value="">Select</option>
                            {sessionYear.map((session) => (
                                <option key={session.id} value={session.year}>
                                    {session.year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-2">
                        <label className="block mb-1 font-medium">
                            Class <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="class_id"
                            value={filter.class_id}
                            onChange={handleFilterChange}
                            className="w-full border border-gray-400 px-3 py-1 focus:outline-none"
                        >
                            <option value="">Select</option>
                            {classes.map((cls) => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.class_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-2">
                        <label className="block mb-1 font-medium">
                            Section <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="section_id"
                            value={filter.section_id}
                            onChange={handleFilterChange}
                            className="w-full border border-gray-400 px-3 py-1 focus:outline-none"
                        >
                            <option value="">Select</option>
                            {sectionList.map((sec) => (
                                <option key={sec.id} value={sec.id}>
                                    {sec.section_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <h2 className="sm:text-xl text:md font-semibold mb-2">Promote Students In Next Session</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block mb-1 font-medium">
                            Promote In Session <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="new_session_year"
                            value={promotion.new_session_year}
                            onChange={handlePromotionChange}
                            className="w-full border border-gray-400 px-3 py-1 focus:outline-none"
                        >
                            <option value="">Select</option>
                            {sessionYear.map((session) => (
                                <option key={session.id} value={session.year}>
                                    {session.year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">
                            Class <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="new_class_id"
                            value={promotion.new_class_id}
                            onChange={handlePromotionChange}
                            className="w-full border border-gray-400 px-3 py-1 focus:outline-none"
                        >
                            <option value="">Select</option>
                            {classes.map((cls) => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.class_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">
                            Section <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="new_section_id"
                            value={promotion.new_section_id}
                            onChange={handlePromotionChange}
                            className="w-full border border-gray-400 px-3 py-1 focus:outline-none"
                        >
                            <option value="">Select</option>
                            {sectionList.map((sec) => (
                                <option key={sec.id} value={sec.id}>
                                    {sec.section_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex justify-end border-t-1 border-gray-200 mt-3">
                    <button
                        onClick={handleSearch}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded mt-2"
                    >
                        Search
                    </button>
                </div>
                {error && <div className="mt-4 text-red-500">{error}</div>}
                {success && <div className="mt-4 text-green-500">{success}</div>}
                {students.length > 0 && (
                    <div className="mt-6 bg-white rounded-md overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <input
                                            type="checkbox"
                                            checked={selectedStudents.length === students.length && students.length > 0}
                                            onChange={handleSelectAll}
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Student Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Father Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Class
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Section
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Session
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {students.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={selectedStudents.includes(student.id)}
                                                onChange={() => handleCheckboxChange(student.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{student.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{student.student_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{student.father_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{student.class_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{student.section_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{student.session_year}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end py-2 border-t-1 border-gray-200 ">
                           
                                <button
                                onClick={handlePromote}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded mt-1"
                            >
                                Promote
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default PromoteStudent;