// Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
  };



    return (
        <header className="bg-[#1ea3dc] mb-1 text-white px-4 py-3 flex justify-between items-center shadow-md ">
            <h1 className="text-xl font-semibold">School Dashboard</h1>
            <button
                onClick={handleLogout}
                className=" font-medium px-4 py-2 rounded bg-red-200 text-red-500 hover:bg-red-300 hover:text-red-700 transition cursor-pointer duration-500 ease-in-out"
            >
                Logout
            </button>
        </header>
    );
};

export default Header;
