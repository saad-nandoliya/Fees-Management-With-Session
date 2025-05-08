import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../../components/clientCompo/Layout";
import Home from "../../pages/client/Home";
import About from "../../pages/client/About";
import NotFound from "../../pages/Error/NotFound";

const ClientRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default ClientRoute;
