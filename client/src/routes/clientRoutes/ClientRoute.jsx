import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../../components/clientCompo/Layout";
import Home from "../../pages/client/Home";
import Admission from "../../pages/client/Admission";
import NotFound from "../../pages/Error/NotFound";
import Students from "../../pages/client/Student's";
import StudentDetails from "../../pages/client/Student's/StudentDetails";
import NewAdmission from "../../pages/client/Student's/NewAdmission";

const ClientRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/admission" element={<Admission />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />}>
            <Route path="student-details" element={<StudentDetails />} />
            <Route path="new-admission" element={<NewAdmission />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default ClientRoute;
