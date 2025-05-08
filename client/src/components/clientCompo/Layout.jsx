import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="px-4 pb-3 mt-[84px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
