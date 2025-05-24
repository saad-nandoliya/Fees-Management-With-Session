import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../../components/clientCompo/Layout";
import Home from "../../pages/client/Home";
import Admission from "../../pages/client/Admission";
import NotFound from "../../pages/Error/NotFound";
import StudentList from "../../pages/client/StudentList";


const ClientRoute = () => {
  return (
    <>

      <Routes>
        <Route path="/admission" element={<Admission />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/studentlist" element={<StudentList />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default ClientRoute;
