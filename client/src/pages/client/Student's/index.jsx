import React from "react";
import StudentsInfo from "./StudentsInfo";
import "../../../App.css";
import { Outlet } from "react-router-dom";

const index = () => {
  return (
    <>
      <div className="flex">
        <StudentsInfo />
        <div className="relative border-l-1 border-amber-700 flex-1 bg-white px-4 -mt-[3px] h-auto max-h-[35rem] overflow-y-auto hide-scrollbar">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default index;
