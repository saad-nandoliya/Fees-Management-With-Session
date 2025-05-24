import React from "react";
import StudentsInfo from "./StudentsInfo";
import "../../../App.css";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";

const index = () => {


  return (
    <>
      <Header />
      <div className="flex min-h-[40rem] h-[40rem] max-h-[40rem]">
        <StudentsInfo />
        <div className="relative  flex-1 bg-white px-2 pb-1 -mt-[3px] h-[41.5rem] max-h-[41.5rem] overflow-y-auto hide-scrollbar">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default index;
